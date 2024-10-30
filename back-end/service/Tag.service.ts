import tagRepository from '../repository/Tag.db';
import { TagInput } from '../types'; 
import { Tag } from '../model/Tag';

const createTag = async (tagInput: TagInput): Promise<Tag> => {
    const existingTag = tagRepository.getTagByName(tagInput.name.toLowerCase());
    if (existingTag) {
        throw new Error(`Tag with name "${tagInput.name}" already exists.`);
    }

    if (tagInput.name.length > 20) {
        throw new Error('Tag name cannot be longer than 20 characters.');
    }

    if (tagInput.id === undefined) {
      throw new Error(`Tag creation failed. Please provide a valid id.`);
    }

    const newTag = new Tag(tagInput.id, tagInput.name);
    return tagRepository.createTag(newTag);
};

const getAllTags = async (): Promise<Tag[]> => {
    return tagRepository.getAllTags();
};

const deleteTag = async (id: number): Promise<boolean> => {
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
