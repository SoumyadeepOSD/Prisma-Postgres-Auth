import { type Request } from '@hapi/hapi'

import type Response from '../interfaces/api/response'

import logger from '../config/logger'

export default (handler: any) => {
  return async (req: Request, res: Response) => {
    try {
      // Get the request method and generate statuscode from it.
      const { method }:any = req.route
      const result = await handler(req, res)

      /**
        GET:
        200 OK: The request was successful, and the response contains the requested data.

        POST:
        201 Created: The request was successful, and a new resource has been created as a result.

        PUT:
        200 OK: The request was successful, and the resource has been updated.

        PATCH:
        200 OK: The request was successful, and the resource has been partially updated.

        DELETE:
        200 OK: The request was successful, and the resource has been deleted.
      */

      return res.success({
        result,
        statusCode: method === 'POST' ? 201 : 200
      })
    } catch (error: any) {
      if (!error.statusCode || error.statusCode === 500) {
        logger.error(error.stack)
      }

      return res.error({ message: error.message, statusCode: error.statusCode })
    }
  }
}
