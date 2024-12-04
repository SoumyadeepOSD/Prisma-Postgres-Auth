import { type Request } from '@hapi/hapi'
import logger from '../config/logger';
import BadRequestError from '../exceptions/bad-request';
import ITag from '../interfaces/models/ITag';
import {
  getTagFromDB,
  createNewTagToDB,
  updateTagToDB,
  deleteTagFromDB,
} from '../repository/tag';


// &Create the particular tag(attribute) into the table
// ==========================================================
export const sendData = async (req: Request) => {
  const tagRegisterPayload = req.payload as {
    tag: string;
    values: string[];
    user_id: number;
    field_type: string;
  };

  // Case-insensitive check
  const tagExists = await getTagFromDB({
    where: {
      tag: tagRegisterPayload.tag, // Convert tag to lowercase for comparison
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
      field_type: tagRegisterPayload.field_type,
      user_id: tagRegisterPayload.user_id,
    },
    many: true,
  }) as ITag;

  logger.info(tagCreated);
  return { message: 'Tag created successfully' };
};



// &Fetch the particular tag(attribute) from the table
// ==========================================================
export const getData = async (req: any) => {
  const tagViewPayload = req.payload as {
    user_id: number;
    tag: string;
  };
  const tagDetailsPromise = getTagFromDB({
    where: {
      user_id: tagViewPayload.user_id,
      // tag: tagViewPayload.tag
    },
    select: {
      id:true,
      user_id: true,
      tag: true,
      values: true,
      field_type: true,
    },
    multi: true
  }) as ITag
  const [tagDetails] = await Promise.all([tagDetailsPromise])
  return { tag: tagDetails }
}



// &Modify the particular tag(attribute) from the table
// ==========================================================
export const editData = async (req: Request) => {
  const tagEditPayload = req.payload as {
    tag: string;
    values: string[];
  };
  const tagEditParams = req.params as {
    id: number;
  };
  // Append new values to the existing array
  const updatedTag = await updateTagToDB({
    where: {
      id: tagEditParams.id,
    },
    data: {
      tag: tagEditPayload.tag,
      values: tagEditPayload.values,
    }
  });
  return { message: 'Tag updated successfully', tag: updatedTag };
};



// &Delete the particular tag(attribute) from the table
// ==========================================================
export const deleteData = async (req: Request) => {
  const tagViewPayload = req.params as {
    id: number;
  };
  const tagDetailsPromise = deleteTagFromDB({
    where: {
      id: tagViewPayload.id,
    },
  }) as ITag
  const [tagDetails] = await Promise.all([tagDetailsPromise])
  return { tag: tagDetails }
}
