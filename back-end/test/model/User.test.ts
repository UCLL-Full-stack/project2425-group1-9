import {User} from '../../model/User';
import {Task} from '../../model/Task'
  
test('Given valid properties, when creating a User, then it should be created successfully', () => {
    const userId = 1;
    const userName = "John Doe"
    const userEmail = 'john@example.com';
    const userPassword = 'password123';
    
    const user = new User({id: userId, name: userName, email: userEmail, password: userPassword});

    expect(user).toBeDefined();
    expect(user.getName()).toBe(userName);
    expect(user.getEmail()).toBe(userEmail);
});

test('Given an empty name, when creating a User, then it should throw an error', () => {
    const userId = 1;
    const userEmail = 'john@example.com';
    const userPassword = 'password123';

    expect(() => {new User({id: userId,name: '', email: userEmail, password: userPassword})}).toThrowError('Name is required and cannot be empty.');
});

test('Given an invalid email, when creating a User, then it should throw an error', () => {
    const userId = 1;
    const userName = 'John Doe';
    const userPassword = 'password123';
    
    expect(() => new User({id: userId, name: userName, email: '', password: userPassword})).toThrowError('A valid email is required.');
});

