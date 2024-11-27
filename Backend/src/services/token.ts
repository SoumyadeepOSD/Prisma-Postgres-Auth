import { sign } from "jsonwebtoken";

import environment from "../config/environment";

export const generateToken = (payload: {id: number, email: string}) => sign(payload, environment.SECRET_KEY, {
    expiresIn: 3600 * 60 * 60
})