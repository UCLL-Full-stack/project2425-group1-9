import { Tag } from '../model/Tag';
import database from './database';

const createTag = async ({ id, name }: Tag): Promise<Tag> => {
  try {
    const createdTag = await database.tag.create({
      data: {
        name,
      },
    });
    return Tag.from(createdTag);
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const getTagById = async (id: number): Promise<Tag | null> => {
  try {
    const tagPrisma = await database.tag.findUnique({
      where: { id: id },
    });
    return tagPrisma ? Tag.from(tagPrisma) : null;
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const getAllTags = async (): Promise<Tag[]> => {
  try {
    const tagsPrisma = await database.tag.findMany();
    return tagsPrisma.map((tagPrisma) => Tag.from(tagPrisma));
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const deleteTag = async (id: number): Promise<boolean> => {
  try {
    await database.tag.delete({
      where: { id: id },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getTagByName = async (name: string): Promise<Tag | null> => {
  try {
    const tagPrisma = await database.tag.findFirst({
      where: { name },
    });
    return tagPrisma ? Tag.from(tagPrisma) : null;
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

export default {
  createTag,
  getTagById,
  getAllTags,
  deleteTag,
  getTagByName,
};