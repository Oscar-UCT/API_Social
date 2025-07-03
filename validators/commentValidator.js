const Joi = require("joi");

exports.commentSchema = Joi.object({
    content: Joi.string().required()
});
