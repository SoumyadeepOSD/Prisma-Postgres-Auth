import Joi from 'joi'

export const getUserValidation = {
  payload: Joi.object({
    id: Joi.number().required(),
  })
}
