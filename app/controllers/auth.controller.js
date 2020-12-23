const bcrypt = require('bcryptjs')
const colors = require('colors')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const env = require('../config/env');
const { authSchema, loginSchema } = require('../middleware/validation.schema')

const db = require('../config/db.config.js');
const User = db.user;

exports.signup = async (req, res, next) => {
	try {
		const result = await authSchema.validateAsync(req.body)
		const doesExist = await User.findOne({ where: { email: email } })

		if (doesExist) {
			return res.status(422).json({ error: `user already exists with that email ${result.email}` })
		}
		const hashedPassword = await bcrypt.hash(result.password, 8)

		const { email, name, pic } = result;
		const user = new User({
			email,
			password: hashedPassword,
			name,
			pic
		})
		const savedUser = await user.save()
		res.json({ user: savedUser })
	}
	catch (err) {
		if (err.isJoi === true) err.status = 422
		next(err)
	}
};

exports.signin = async (req, res, next) => {
	try {
		const result = await loginSchema.validateAsync(req.body)
		const doesExist = await User.findOne({ where: { email: result.email } })
		if (!doesExist) {
			return res.status(422).json({ error: `${result.email} Not Register !` })
		}
		const match = await bcrypt.compare(result.password, doesExist.password)
		if (match) {
			const token = jwt.sign({ id: doesExist.dataValues.id }, env.JWT_TOKEN)
			// const { _id, name, email, followers, following, pic, friends_list, received_request, sent_request } = savedUser
			// res.json({ token, user: { _id, name, email, followers, following, pic, friends_list, received_request, sent_request } })
			res.json({
				success: true,
				token: token
			})
		}
		else {
			return res.status(422).json({ error: `Invalid password !` })
		}
	} catch (err) {
		if (err.isJoi === true) err.status = 422
		next(err)
	}
};


exports.reset_password = (req, res) => {
	crypto.randomBytes(32, (err, buffer) => {
		if (err) {
			console.log(err)
		}
		const token = buffer.toString("hex")
		User.findAll({ where: { email: req.body.email } })
			.then(user => {
				if (!user) {
					return res.status(422).json({ error: "User dont exists with that email" })
				}
				user.resetToken = token
				user.expireToken = Date.now() + 600000
				user.save().then((result) => {
					// send Mail
					transport.sendMail({
						to: user.email,
						from: "no-reply@friends_app.com",
						subject: "signup success",
						html: `<h1>Wel come Friends App !</h1>`
					})
					res.json({ message: "check your email" })
				})
			})
	})
}

exports.new_password = (req, res) => {
	const newPassword = req.body.password
	const sentToken = req.body.token
	User.findAll({
		where: {
			resetToken: sentToken,
			expireToken: { $gt: Date.now() }
		}
	})
		.then(user => {
			if (!user) {
				return res.status(422).json({ error: "Try again session expired" })
			}
			bcrypt.hash(newPassword, 8).then(hashedPassword => {
				user.password = hashedPassword
				user.resetToken = undefined
				user.expireToken = undefined
				user.save()
					.then(() => {
						res.json({ message: "password update success" })
					})
			})
		})
		.catch(err => {
			console.log(err)
		})
}