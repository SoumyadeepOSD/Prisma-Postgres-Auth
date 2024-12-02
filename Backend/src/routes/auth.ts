import createRoute from '../wrappers/route'

import type IRoute from '../interfaces/api/route'

import {
  userLogin,
  userRegister
} from '../controllers/auth'

import {
  loginValidation,
  registerValidation,
} from '../validations/auth'
import { httpMethod } from '../config/constants'

const tags = ['api', 'Authentication']

const routes: IRoute[] = [
  {
    path: '/user-login',
    method: httpMethod.POST,
    description: 'User login',
    handler: userLogin,
    validation: loginValidation
  },
  {
    path: '/user-register',
    method: httpMethod.POST,
    description: 'User Registration',
    handler: userRegister,
    validation: registerValidation
  },
]

export default createRoute({
  tags,
  routes,
  basePath: '/auth'
})
