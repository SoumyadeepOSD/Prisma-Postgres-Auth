import { type Request, type ResponseToolkit, Server } from '@hapi/hapi'
import type IUser from '../interfaces/models/IUser'
import validate from '../middlewares/validate-user'
import environment from '../config/environment'
import hapiAuthJwt2 from 'hapi-auth-jwt2'
import HapiSwagger from 'hapi-swagger'
import logger from '../config/logger'
import basicAuth from 'basic-auth'
import Vision from '@hapi/vision'
import Inert from '@hapi/inert'
import routes from '../routes';

declare module '@hapi/hapi' {
  export interface Request {
    user?: IUser
  }
}

export default async () => {
  const server = new Server({
    port: +environment.PORT || 8080,
    host: environment.HOST || '127.0.0.1',
    routes: {
      cors: true
    }
  })

  await server.register(hapiAuthJwt2)

  server.auth.strategy('jwt', 'jwt', {
    key: environment.SECRET_KEY,
    validate
  })
  server.auth.default({
    strategy: 'jwt'
  })

  const swaggerOptions = {
    info: {
      title: 'Codelogicx HAPI Backend Template',
    },
    grouping: 'tags',
    basePath: '/api/',
    documentationPath: '/api/documentation',
    jsonPath: '/api/swagger.json',
    swaggerUIPath: '/api/swagger/ui',
    schemes: environment.ENVIRONMENT === 'LOCAL' ? ['http'] : ['https'],
    securityDefinitions: {
      jwt: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header'
      }
    },
    security: [{ jwt: [] }]
  }

  await server.register([
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: swaggerOptions
    }
  ])

  await server.register(routes, {
    routes: {
      prefix: '/api'
    }
  })

  // Password protecting swagger to stop unauthorized access of API's.
  server.ext('onRequest', (req: Request, h: ResponseToolkit) => {
    const route = req.url.pathname
    if (route === '/api/documentation' || route === '/api/swagger.json') {
      const user: {
        name: string
        pass: string
      } = basicAuth(req as any) as {
        name: string
        pass: string
      }
      if (user === undefined || user.name !== process.env.SWAGGER_UNAME || user.pass !== process.env.SWAGGER_PASSWORD) {
        return h.response('Unauthorized')
          .code(401)
          .header('WWW-Authenticate', 'Basic realm="Node"')
          .takeover()
      }
    }
    return h.continue
  })

  // Decorators can be used to add custom responses to ResponseToolkit object.
  server.decorate('toolkit', 'success', function (data) {
    const { result, statusCode } = data
    return this.response(result).code(statusCode)
  })

  server.decorate('toolkit', 'error', function (data) {
    return this.response({ message: data.message }).code(data.statusCode ? data.statusCode : 500)
  })

  // Logger.
  server.events.on('response', (response) => {
    const statusCode = (response as any).response.statusCode as string
    logger.info(`${response.url.href} || ${response.method.toUpperCase()} || ${statusCode}`)
  })

  return server
}
