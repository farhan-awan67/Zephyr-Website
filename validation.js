const Joi = require("joi");

// const postSchema = Joi.object({
//   post: Joi.object({
//     title: Joi.string().required(),
//     content: Joi.string().required(),
//   }).required(),
// });

const postSchema = Joi.object({
  post: Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    content: Joi.string().required(),
  }).required(),
});

module.exports = {
  postSchema,
};
