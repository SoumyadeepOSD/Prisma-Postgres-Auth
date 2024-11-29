import { type Request } from '@hapi/hapi'
import logger from '../config/logger';
import BadRequestError from '../exceptions/bad-request';
import ITag from '../interfaces/models/ITag';
import {
    getTagFromDB,
    createNewTagToDB,
} from '../repository/tag';


export const sendData = async(req: Request)=>{
    const tagRegisterPayload = req.payload as {
        tag: string
        values: string[]
    }
    const tagExists = await getTagFromDB({
        where:{ 
            tag: tagRegisterPayload.tag,
        },
        select:{
            id: true,
            tag: true,
            values: true
        }
    });

    if(tagExists){
        throw new BadRequestError('Tag already exists.')
    }
    const tagCreated = await createNewTagToDB({
        data:{
            tag: tagRegisterPayload.tag,
            values: tagRegisterPayload.values
        }
    }) as ITag;

    logger.info(tagCreated);
    return { message:'Tag created successfully' }
}   