const joi = require('joi');

const registerSchema = (data)=>{
    const schema = joi.object({
        name : joi.string().required(),
        email : joi.string().email().required(),
        password : joi.string().required().min(5)
    })
    return schema.validate(data)
}

const loginSchema = (data)=>{
    const schema = joi.object({
        email : joi.string().email().required(),
        password : joi.string().required()
    })
    return schema.validate(data)
}

module.exports = {registerSchema,loginSchema}