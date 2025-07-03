const Joi = require("joi");

exports.postSchema = Joi.object({
    content: Joi.string().required()
})