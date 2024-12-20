import tagService from '../../service/Tag.service';
import tagRepository from '../../repository/Tag.db';
import TagDb from '../../repository/Tag.db';
import { TagInput } from '../../types';
import { Tag } from '../../model/Tag';

const tagInput: TagInput = {
    id: 1,
    name: 'Technology',
};

const tag = new Tag({
    ...tagInput,
});

let mockGetTagByName: jest.Mock;
let mockCreateTag: jest.Mock;
let mockGetTagById: jest.Mock;
let mockDeleteTag: jest.Mock;
let mockGetAllTags: jest.Mock;

beforeEach(() => {
    mockGetTagByName = jest.fn();
    mockCreateTag = jest.fn();
    mockGetTagById = jest.fn();
    mockDeleteTag = jest.fn();
    mockGetAllTags = jest.fn();

    tagRepository.getTagByName = mockGetTagByName;
    tagRepository.createTag = mockCreateTag;
    tagRepository.getTagById = mockGetTagById;
    tagRepository.deleteTag = mockDeleteTag;
    tagRepository.getAllTags = mockGetAllTags;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given valid tag data, when createTag is called, then a new tag is created', async () => {
    // given
    mockGetTagByName.mockResolvedValue(null); 
    mockCreateTag.mockResolvedValue(tag);

    // when
    const result = await tagService.createTag(tagInput);

    // then
    expect(mockGetTagByName).toHaveBeenCalledWith('technology');
    expect(mockCreateTag).toHaveBeenCalledWith(new Tag({
        id: 1,
        name: 'Technology',
    }));
    expect(result).toEqual(tag);
});




test('given an invalid tag ID, when getTagById is called, then an error is thrown', async () => {
    // given
    mockGetTagById.mockResolvedValue(null); // No tag with that ID

    // when
    const getTagById = async () => await tagService.getTagById(1);

    // then
    expect(getTagById).rejects.toThrow('Tag with id 1 does not exist.');
});

test('given valid tags, when getAllTags is called, then all tags are returned', async () => {
    // given
    const tags = [new Tag({ id: 1, name: 'Technology' }), new Tag({ id: 2, name: 'Science' })];
    mockGetAllTags.mockResolvedValue(tags);

    // when
    const result = await tagService.getAllTags();

    // then
    expect(mockGetAllTags).toHaveBeenCalled();
    expect(result).toEqual(tags);
});

test('given a non-existent tag, when deleteTag is called, then an error is thrown', async () => {
    // given
    mockGetTagById.mockResolvedValue(null); // No tag with that ID

    // when
    const deleteTag = async () => await tagService.deleteTag(1);

    // then
    expect(deleteTag).rejects.toThrow('Tag with ID 1 does not exist.');
});

test('given a valid tag, when deleteTag is called, then the tag is deleted', async () => {
    // given
    mockGetTagById.mockResolvedValue(tag); // Tag exists
    mockDeleteTag.mockResolvedValue(true);

    // when
    const result = await tagService.deleteTag(1);

    // then
    expect(mockDeleteTag).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
});
