import Joi from 'joi'

export const tagRegisterValidation = {
  payload: Joi.object({
    tag: Joi.string().required(),
    values: Joi.array().items(Joi.string()).required(),
    user_id: Joi.number().required()
  })
}

export const tagViewValidation = {
  payload: Joi.object({
    user_id: Joi.number().required()
  })
}