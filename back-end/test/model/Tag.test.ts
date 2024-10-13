import Tag from '../../model/Tag';

test('should create a tag object', () => {
    const tag = new Tag('Work');
    expect(tag).toBeDefined();
    expect(tag.name).toBe('Work');
});

