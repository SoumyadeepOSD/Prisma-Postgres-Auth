import createRoute from '../wrappers/route'

import type IRoute from '../interfaces/api/route'

import {
  getUser,
} from '../controllers/user'

const tags = ['api', 'User']

const routes: IRoute[] = [
  {
    path: '/get-user',
    method: 'GET',
    description: 'Get user details',
    handler: getUser,
    auth: 'jwt'
  },
]

export default createRoute({
  tags,
  routes,
  basePath: '/user'
})
