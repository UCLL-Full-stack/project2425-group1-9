import User from '../../model/User';

test('should create a user object', () => {
    const user = new User('John', 'Doe', 'john@example.com', 'password123');
    expect(user).toBeDefined();
    expect(user.firstName).toBe('John');
    expect(user.lastName).toBe('Doe');
    expect(user.email).toBe('john@example.com');
});

