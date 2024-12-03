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
  }: {
    data: any
    where: any
  }) =>  await Tag.update({ where, data })

export const getTagFromDB = async({
    where,
    select,
    multi = false
}:{
    where: any
    select: any
    multi?: boolean
})=> multi ? await Tag.findMany({where, select}) : await Tag.findFirst({where, select});



export const deleteTagFromDB = async({
    where,
    multi = false
}:{
    where: any
    multi?: boolean
})=> multi ? await Tag.deleteMany({where}) : await Tag.delete({where});