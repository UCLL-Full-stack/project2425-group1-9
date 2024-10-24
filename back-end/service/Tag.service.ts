import tagRepository from '../repository/Tag.db';
import { Tag } from '../model/Tag';

const createTag = (tag: Tag): Tag => {
    const existingTag = tagRepository.getTagByName(tag.name.toLowerCase());
    if (existingTag) {
        throw new Error(`Tag with name "${tag.name}" already exists.`);
    } 
    if (tag.name.length > 20) {
        throw new Error('Tag name cannot be longer than 20 characters.');
    } 
    return tagRepository.createTag(tag);
};


const getAllTags = (): Tag[] => {
    return tagRepository.getAllTags();
};

const deleteTag = (id: number): boolean => {
    const existingTag = tagRepository.getTagById(id);
    if (!existingTag) {
        throw new Error(`Tag with ID ${id} does not exist.`);
    }
    return tagRepository.deleteTag(id);
};

export default {
    createTag,
    getAllTags,
    deleteTag,
};
