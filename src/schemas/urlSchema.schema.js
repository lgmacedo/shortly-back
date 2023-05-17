import Joi from "joi";

const urlSchema = Joi.object({
  url: Joi.string().uri().required().messages({
    "any.required": 'O campo "url" é obrigatório.',
    "string.empty": 'O campo "url" não pode estar vazio.',
    "string.uri": 'O campo "url" deve ser uma URL válida.',
  }),
});

export default urlSchema;
