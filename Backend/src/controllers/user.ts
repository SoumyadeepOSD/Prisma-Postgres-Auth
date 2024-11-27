import { getUserFromDB } from '../repository/user'
import type IUser from '../interfaces/models/IUser'


export const getUser = async (req: any) => {
    const userDetailsPromise = getUserFromDB({
      where: {
        id: req.user?.id
      },
      select: {
        id: true,
        email: true,
        is_verified: true
      }
    }) as IUser
    const [userDetails] = await Promise.all([userDetailsPromise])
    return { user: userDetails }
  }
  