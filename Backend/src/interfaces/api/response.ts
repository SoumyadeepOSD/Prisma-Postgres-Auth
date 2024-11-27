import { type ResponseToolkit } from "@hapi/hapi";

export default interface Response extends ResponseToolkit{
    success:(data: any) => any
    error: (data: any)=> any
}