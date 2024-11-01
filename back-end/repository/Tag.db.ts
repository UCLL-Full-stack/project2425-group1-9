import { Tag } from '../model/Tag';

const tags: Tag[] = [
  new Tag({ id: 1, name: 'Urgent' }),
  new Tag({ id: 2, name: 'Work' }),
  new Tag({ id: 3, name: 'Personal' })
]; 

const createTag = (tag: Tag): Tag => {
  tags.push(tag);
  return tag;
};

const getTagById = (id: number): Tag | null => {
  return tags.find(tag => tag.getId() === id) || null;
};

const getAllTags = (): Tag[] => {
  return tags;
};

const getTagByName = (name: string): Tag | null => {
    return tags.find(tag => tag.getName() === name) || null; 
};

const deleteTag = (id: number): boolean => {
  const index = tags.findIndex(tag => tag.getId() === id)
  
  if (index > -1) {  
    tags.splice(index, 1);  
    return true;  
  }
  return false;  
};

export default {
  createTag,
  getTagById,
  getAllTags,
  deleteTag,
  getTagByName,
};
