import createRoute from '../wrappers/route'
import type IRoute from '../interfaces/api/route'
import { httpMethod } from '../config/constants'
import { tagRegisterValidation, tagViewValidation } from '../validations/tag'
import { getData, sendData } from '../controllers/tags'

const tags = ['api', 'Tag']

const routes: IRoute[] = [
  {
    path: '/tag-submit',
    method: httpMethod.POST,
    description: 'Tag Register',
    handler: sendData,
    validation: tagRegisterValidation
  },
  {
    path: '/tag-view',
    method: httpMethod.POST,
    description: 'Tag View',
    handler: getData,
    validation: tagViewValidation
  },
]

export default createRoute({
  tags,
  routes,
  basePath: '/tag'
})
