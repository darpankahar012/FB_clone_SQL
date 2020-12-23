const jwt = require('jsonwebtoken')
const colors = require('colors')
const env = require('../config/env');
const db = require('../config/db.config.js');
const User = db.user;

module.exports = async (req, res, next) => {
    const { authorization } = req.headers

    if (!authorization) {
        return res.status(401).json({ error: "you must be logged in" })
    }
    const token = authorization.replace("Bearer ", "")
    console.log(token)
    try {
        const decoded = jwt.verify(token, env.JWT_TOKEN);
        req.user = await User.findByPk(decoded.id);
        next();
    } catch (err) {
        console.log(err)
    }
}