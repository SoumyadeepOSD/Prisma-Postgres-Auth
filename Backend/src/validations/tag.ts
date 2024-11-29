import Joi from 'joi'

export const tagRegisterValidation = {
  payload: Joi.object({
    tag: Joi.string().required(),
    values: Joi.string().required()
  })
}
