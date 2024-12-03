import createRoute from '../wrappers/route'
import type IRoute from '../interfaces/api/route'
import { httpMethod } from '../config/constants'
import { tagDeleteValidation, tagEditValidation, tagRegisterValidation, tagViewValidation } from '../validations/tag'
import { deleteData, editData, getData, sendData } from '../controllers/tags'

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
  {
    path: '/tag-edit/{id}',
    method: httpMethod.PATCH,
    description: 'Tag Edit',
    handler: editData,
    validation: tagEditValidation
  },
  {
    path: "/tag-delete/{id}",
    method: httpMethod.DELETE,
    description: 'Tag Delete',
    handler: deleteData,
    validation: tagDeleteValidation
  },
]

export default createRoute({
  tags,
  routes,
  basePath: '/tag'
})
