import { PrismaClient } from "@prisma/client";

const { 
    user: User,
} = new PrismaClient();

export {
    User,
};