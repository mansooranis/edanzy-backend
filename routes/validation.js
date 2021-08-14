//Validation
const Joi = require('joi');

const registerValidation = data =>{
    const schema = Joi.object({
        firstName: Joi.string().min(6).required(),
        lastName: Joi.string().min(6).max(40),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    
    // Validating a User
    return schema.validate(data)
};

const loginValidation = data =>{
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    });
    
    // Validating Login
    return schema.validate(data)
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

