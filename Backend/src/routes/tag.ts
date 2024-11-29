import createRoute from '../wrappers/route'
import type IRoute from '../interfaces/api/route'
import { httpMethod } from '../config/constants'
import { tagRegisterValidation } from '../validations/tag'
import { sendData } from '../controllers/tags'

const tags = ['api', 'Authentication', 'data']

const routes: IRoute[] = [
  {
    path: '/tag-submit',
    method: httpMethod.POST,
    description: 'Tag Register',
    handler: sendData,
    validation: tagRegisterValidation
  }
]

export default createRoute({
  tags,
  routes,
  basePath: '/tag'
})
