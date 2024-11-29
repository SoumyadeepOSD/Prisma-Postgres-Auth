import { PrismaClient } from "@prisma/client";

const { 
    user: User,
    tag: Tag,
} = new PrismaClient();

export {
    User,
    Tag
};