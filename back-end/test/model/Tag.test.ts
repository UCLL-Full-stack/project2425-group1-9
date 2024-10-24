import { Tag } from '../../model/Tag';
  
    
test('Given a valid tag name, when creating a Tag, then it should be created successfully', () => {
    const tagId = 1;
    const tagName = 'Important';

    const tag = new Tag(tagId, tagName);

    expect(tag).toBeDefined();
    expect(tag.name).toBe(tagName);
  });
  

  test('Given an empty tag name, when creating a Tag, then it should throw an error', () => {
    const tagId = 1;

    expect(() => new Tag(tagId, '')).toThrowError('Tag name is required.');
  });
    
  test('Given a long tag name, when creating a Tag, then it should throw an error', () => {
    const tagId = 1;
    const longTagName = 'A very long tag name that exceeds the limit';

    expect(() => new Tag(tagId, longTagName)).toThrowError('Tag name cannot exceed 30 characters');
  });

