import Joi from 'joi'

export const loginValidation = {
  payload: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
}

export const registerValidation = {
  payload: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
}
