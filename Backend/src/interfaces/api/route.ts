import { type Request } from "@hapi/hapi";

export default interface IRoute {
    method: string
    path: string
    auth?: boolean | string
    handler: (req: Request) => Promise<any>
    validation?: any
    description: string
    check_permission?: boolean
}