import { Tag } from '../model/Tag';

const tags: Tag[] = []; 

const createTag = (tag: Tag): Tag => {
  tags.push(tag);
  return tag;
};

const getTagById = (id: number): Tag | null => {
  return tags.find(tag => tag.id === id) || null;
};

const getAllTags = (): Tag[] => {
  return tags;
};

const getTagByName = (name: string): Tag | null => {
    return tags.find(tag => tag.name === name) || null; 
};

const deleteTag = (id: number): boolean => {
  const index = tags.findIndex(tag => tag.id === id)
  
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
