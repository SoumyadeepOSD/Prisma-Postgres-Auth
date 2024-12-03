import Joi from 'joi'

export const tagRegisterValidation = {
  payload: Joi.object({
    tag: Joi.string().required(),
    values: Joi.array().items(Joi.string()).required(),
    user_id: Joi.number().required(),
    field_type: Joi.string().required()
  })
}

export const tagViewValidation = {
  payload: Joi.object({
    user_id: Joi.number().required()
  })
}

export const tagEditValidation = {
  payload: Joi.object({
    tag: Joi.string().required(),
    values: Joi.array().items(Joi.string()).required(),
  }),
  params: Joi.object({
    id: Joi.number().required(), // Ensure id is validated only in params
  }),
};

export const tagDeleteValidation = {
  params: Joi.object({
    id: Joi.number().required(),
  })
}