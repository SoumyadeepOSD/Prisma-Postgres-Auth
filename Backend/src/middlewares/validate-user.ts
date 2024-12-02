import { getUserFromDB } from '../repository/user'

import type IUser from '../interfaces/models/IUser';

/**
 * Validate if the token is valid or not by using
 * the decoded token and check if the user exists.
 */
export default async (decoded: { id: number, role_id: number }, req: any) => {
  const userExists = await getUserFromDB({
    where: { id: decoded.id },
    select: { id: true }
  }) as IUser

  req.user = { id: userExists.id }

  return { isValid: true }
}
