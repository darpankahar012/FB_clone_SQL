const Joi = require('joi')

const passwordPattern = (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]+$/)

const authSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(15).required(),
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    // password: Joi.string().pattern(new RegExp(passwordPattern)).min(8).max(30).required().messages({
    //     "string.pattern.base": `"password" must be Min 1 uppercase letter , Min 1 special character , Min 1 number`,
    //     'string.min': `"password" should have a minimum length of {#limit}`,
    //     "string.empty": `"password" cannot be an empty field`,
    //     "any.required": `"password" is a required.`,
    // }),
})

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    // password: Joi.string().pattern(new RegExp(passwordPattern)).min(8).max(30).required().messages({
    //     "string.pattern.base": `"password" must be Min 1 uppercase letter , Min 1 special character , Min 1 number`,
    //     'string.min': `"password" should have a minimum length of {#limit}`,
    //     "string.empty": `"password" cannot be an empty field`,
    //     "any.required": `"password" is a required.`,
    // }),
})

module.exports = {
    authSchema, loginSchema
}