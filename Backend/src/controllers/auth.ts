import { type Request } from '@hapi/hapi'
import logger from '../config/logger'
import { generateToken } from '../services/token'
import { hashPassword, verifyPassword } from '../helpers/password'
import {
    getUserFromDB,
    createNewUserToDB,
    updateUserToDB,
} from '../repository/user'


import NotFoundError from '../exceptions/not-found'
import BadRequestError from '../exceptions/bad-request'
import UnAuthenticatedError from '../exceptions/unauthenticated'
import type IUser from '../interfaces/models/IUser';

export const userLogin = async (req: Request) => {
    const userLoginPayload = req.payload as {
        email: string;
        password: string;
    };

    // Fetch user from DB
    const userExists = await getUserFromDB({
        where: {
            email: userLoginPayload.email,
        },
        select: {
            id: true,
            password: true,
            email: true,
            is_verified: true,
        },
    }) as IUser;

    if (!userExists) {
        throw new NotFoundError('User does not exist.');
    }

    // Verify password
    const passwordMatch = verifyPassword(userLoginPayload.password, userExists.password as string);
    if (!passwordMatch) {
        throw new UnAuthenticatedError('Invalid credentials.');
    }

    // If the user is not verified, update verification status
    if (!userExists.is_verified) {
        await updateUserToDB({
            data: {
                is_verified: true,
            },
            where: {
                id: userExists.id,
            },
        });

        // Refetch user data to confirm update
        const updatedUser = await getUserFromDB({
            where: {
                id: userExists.id,
            },
            select: {
                is_verified: true,
            },
        });

        if (!updatedUser?.is_verified) {
            throw new UnAuthenticatedError('User not verified.');
        }
    }

    // Generate token only after successful verification
    const token = generateToken({
        id: userExists.id as number,
        email: userExists.email as string
    });

    console.log(userExists);

    return { token };
};




export const userRegister = async (req: Request) => {
    const userRegisterPayload = req.payload as {
        email: string
        password: string
    }

    const userExists = await getUserFromDB({
        where: {
            email: userRegisterPayload.email
        },
        select: {
            id: true
        }
    })

    if (userExists) {
        throw new BadRequestError('User already exists.')
    }

    const hashedPassword = hashPassword(userRegisterPayload.password)


    const userCreated = await createNewUserToDB({
        data: {
            email: userRegisterPayload.email,
            password: hashedPassword
        }
    }) as IUser


    logger.info(userCreated)
    return { message: 'User registered successfully' }
}

