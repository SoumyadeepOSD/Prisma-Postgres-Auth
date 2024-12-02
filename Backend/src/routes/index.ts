import { type Server, type ServerRoute } from '@hapi/hapi'

import wrapAsync from '../wrappers/async'

import type ITaggedRoute from '../interfaces/api/tagged-route'

import auth from './auth'
import user from './user'
import tag from "./tag"
const routes: ITaggedRoute[] = [
  ...auth,
  ...user,
  ...tag,
]

export default {
  name: 'server',
  register: async (server: Server) => {
    const routeMap = routes.map((route: ITaggedRoute) => {
      const options: any = {
        tags: route.tags,
        description: route.description,
        handler: wrapAsync(route.handler),
        validate: route.validation || null,
        auth: route.auth === 'jwt' ? route.auth : false
      }

      const newRoute = {
        path: route.path,
        method: route.method,
        options
      }

      return newRoute
    }) as ServerRoute[]

    server.route(routeMap)
  }
}
