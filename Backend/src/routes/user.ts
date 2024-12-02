import createRoute from '../wrappers/route'

import type IRoute from '../interfaces/api/route'

import {
  getUser,
} from '../controllers/user'
import { httpMethod } from '../config/constants'
import { getUserValidation } from '../validations/user'

const tags = ['api', 'User']

const routes: IRoute[] = [
  {
    path: '/get-user',
    method: httpMethod.POST,
    description: 'Get user details',
    handler: getUser,
    auth: 'jwt',
    validation: getUserValidation
  },
]

export default createRoute({
  tags,
  routes,
  basePath: '/user'
})
