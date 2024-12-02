import { type Request } from '@hapi/hapi'
import logger from '../config/logger';
import BadRequestError from '../exceptions/bad-request';
import ITag from '../interfaces/models/ITag';
import {
    getTagFromDB,
    createNewTagToDB,
} from '../repository/tag';


export const sendData = async (req: Request) => {
    const tagRegisterPayload = req.payload as {
        tag: string;
        values: string[];
        user_id: number;
    };

    // Case-insensitive check
    const tagExists = await getTagFromDB({
        where: {
            tag: tagRegisterPayload.tag.toLowerCase(), // Convert tag to lowercase for comparison
        },
        select: {
            tag: true,
            values: true,
        },
    });

    if (tagExists) {
        throw new BadRequestError('Tag already exists.');
    }

    const tagCreated = await createNewTagToDB({
        data: {
            tag: tagRegisterPayload.tag,
            values: tagRegisterPayload.values,
            user_id: tagRegisterPayload.user_id,
        },
    }) as ITag;

    logger.info(tagCreated);
    return { message: 'Tag created successfully' };
};


export const getData = async (req: any) => {
    const tagViewPayload = req.payload as {
        user_id: number;
    };
    const tagDetailsPromise = getTagFromDB({
      where: {
        user_id: tagViewPayload.user_id,
      },
      select: {
        user_id: true,
        tag: true,
        values: true
      },
      multi:true
    }) as ITag
    const [tagDetails] = await Promise.all([tagDetailsPromise])
    return { tag: tagDetails }
  }
