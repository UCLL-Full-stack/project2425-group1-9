import { User } from '../../model/User';

describe('User Model', () => {

  test('Given valid properties, when creating a User, then it should be created successfully', () => {
    const user = new User({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'Password123',
      role: 'user'
    });

    expect(user).toBeDefined();
    expect(user.getName()).toBe('Jane Doe');
    expect(user.getEmail()).toBe('jane@example.com');
    expect(user.getRole()).toBe('user');
  });

  test('Given missing name, when creating a User, then it should throw an error', () => {
    expect(() => new User({
      name: '',
      email: 'invalidemail@example.com',
      password: 'Password123',
      role: 'user'
    })).toThrowError('Name is required and cannot be empty.');
  });

  test('Given invalid email format, when creating a User, then it should throw an error', () => {
    expect(() => new User({
      name: 'John Doe',
      email: 'invalid-email',
      password: 'Password123',
      role: 'user'
    })).toThrowError('A valid email is required.');
  });

  test('Given short password, when creating a User, then it should throw an error', () => {
    expect(() => new User({
      name: 'John Doe',
      email: 'john@example.com',
      password: '123',
      role: 'user'
    })).toThrowError('Password must be at least 6 characters long, with at least one uppercase letter, one lowercase letter, and one digit.');
  });
  
});
