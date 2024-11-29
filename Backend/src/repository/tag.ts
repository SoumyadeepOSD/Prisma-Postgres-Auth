import {Tag} from "../config/prisma";

export const createNewTagToDB = async({
    data,
    many=false
}:{
    data: any,
    many?: boolean
})=>{
    return many ?  await Tag.createMany({data}) : await Tag.create({data});
}

export const updateTagToDB = async ({
    data,
    where,
    many = false
  }: {
    data: any
    where: any
    many?: boolean
  }) => many ? await Tag.updateMany({ data, where }) : await Tag.update({ data, where })

export const getTagFromDB = async({
    where,
    select
}:{
    where: any
    select: any
})=> await Tag.findFirst({where, select});

