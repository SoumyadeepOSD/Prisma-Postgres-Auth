export default class PermissionDeniedError extends Error {
    statusCode: number
    constructor(message: string) {
        super(message)
        this.statusCode = 403
    }
}
