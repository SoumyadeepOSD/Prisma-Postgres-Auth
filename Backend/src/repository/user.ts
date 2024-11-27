import {User} from "../config/prisma";


export const createNewUserToDB = async({
    data,
    many=false
}:{
    data: any,
    many?: boolean
})=>{
    return many ?  await User.createMany({data}) : await User.create({data});
}

export const updateUserToDB = async ({
    data,
    where,
    many = false
  }: {
    data: any
    where: any
    many?: boolean
  }) => many ? await User.updateMany({ data, where }) : await User.update({ data, where })

export const getUserFromDB = async({
    where,
    select
}:{
    where: any
    select: any
})=> await User.findFirst({where, select});

