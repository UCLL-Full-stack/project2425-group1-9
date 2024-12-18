import { Tag } from '../../model/Tag';

describe('Tag model', () => {
test('Given a valid tag name, when creating a Tag, then it should be created successfully', () => {
  const tag = new Tag({ id: 1, name: 'Important' });

  expect(tag).toBeDefined();
  expect(tag.getName()).toBe('Important');
});

test('Given an empty tag name, when creating a Tag, then it should throw an error', () => {
  expect(() => new Tag({ id: 1, name: '' })).toThrowError('Tag name is required.');
});

test('Given a long tag name, when creating a Tag, then it should throw an error', () => {
  const longTagName = 'A very long tag name that exceeds the limit';

  expect(() => new Tag({ id: 1, name: longTagName })).toThrowError('Tag name cannot exceed 30 characters');
});
});
