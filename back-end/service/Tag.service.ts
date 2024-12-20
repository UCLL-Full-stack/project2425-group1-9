import tagRepository from '../repository/Tag.db';
import { TagInput } from '../types'; 
import { Tag } from '../model/Tag';
import TagDb from '../repository/Tag.db';

const createTag = async (tagInput: TagInput): Promise<Tag> => {
    const existingTag = await tagRepository.getTagByName(tagInput.name.toLowerCase());
    if (existingTag) {
        throw new Error(`Tag with name "${tagInput.name}" already exists.`);
    }

    const newTag = new Tag({id: tagInput.id, name: tagInput.name});
    return tagRepository.createTag(newTag);
};

const getAllTags = async (): Promise<Tag[]> => {
    return tagRepository.getAllTags();
};

const getTagById = async (id: number): Promise<Tag> => {
    const tag = await TagDb.getTagById( id );
    if (!tag) throw new Error(`Tag with id ${id} does not exist.`);
    return tag;
}

const deleteTag = async (id: number): Promise<boolean> => {
    const existingTag = await tagRepository.getTagById(id);
    if (!existingTag) {
        throw new Error(`Tag with ID ${id} does not exist.`);
    }
    return tagRepository.deleteTag(id);
};

export default {
    createTag,
    getAllTags,
    deleteTag,
    getTagById,
};
