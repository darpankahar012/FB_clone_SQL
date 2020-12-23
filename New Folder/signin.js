// exports.signup = (req, res) => {
// 	const { name, email, password, pic } = req.body
// 	if (!email || !password || !name) {
// 		return res.status(422).json({ error: "please add all the fields" })
// 	}
// 	User.findOne({ where: { email: email } })
// 		.then((savedUser) => {
// 			if (savedUser) {
// 				return res.status(422).json({ error: "user already exists with that email" })
// 			}
// 			bcrypt.hash(password, 8)
// 				.then(hashedPassword => {
// 					const user = new User({
// 						email,
// 						password: hashedPassword,
// 						name,
// 						pic
// 					})
// 					user.save()
// 						.then(user => {
// 							res.json({ message: "saved successfully" })
// 						})
// 						.catch(err => {
// 							console.log(err)
// 						})
// 				})
// 		})
// 		.catch(err => {
// 			console.log(err)
// 		})
// };


// exports.signin = (req, res) => {
// 	const { email, password } = req.body
// 	if (!email || !password) {
// 		return res.status(422).json({ error: "please add email or password" })
// 	}
// 	User.findOne({ where: { email: email } })
// 		.then(savedUser => {
// 			if (!savedUser) {
// 				return res.status(422).json({ error: "Invalid Email or password" })
// 			}
// 			bcrypt.compare(password, savedUser.password)
// 				.then(doMatch => {
// 					if (doMatch) {
// 						const token = jwt.sign({ id: savedUser.dataValues.id }, env.JWT_TOKEN)
// 						const { id, name, email, pic } = savedUser
// 						res.json({ token, user: { id, name, email, pic } })
// 						// res.json({ token, savedUser })
// 					}
// 					else {
// 						return res.status(422).json({ error: "Invalid Email or password" })
// 					}
// 				})
// 				.catch(err => {
// 					console.log(err)
// 				})
// 		})
// };
