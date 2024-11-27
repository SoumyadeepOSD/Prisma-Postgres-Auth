import type IRoute from '../interfaces/api/route'
import type ITaggedRoute from '../interfaces/api/tagged-route'

export default ({ routes, basePath, tags }: {
  routes: IRoute[]
  basePath: string
  tags: string[]
}): ITaggedRoute[] => routes.map((route: IRoute) => ({
  ...route,
  tags,
  path: `${basePath}${route.path}`
}))
