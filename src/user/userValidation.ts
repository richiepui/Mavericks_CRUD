const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().min(2).trim().required(),
    password: Joi.string().min(8).trim().required()
});

export default userSchema;