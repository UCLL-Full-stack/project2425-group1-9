import {User} from '../../model/User';
import {Task} from '../../model/Task'
  
test('Given valid properties, when creating a User, then it should be created successfully', () => {
    const userId = 1;
    const userName = "John Doe"
    const userEmail = 'john@example.com';
    const userPassword = 'password123';
    
    const user = new User(userId, userName, userEmail, userPassword);

    expect(user).toBeDefined();
    expect(user.name).toBe(userName);
    expect(user.email).toBe(userEmail);
});

test('Given an empty name, when creating a User, then it should throw an error', () => {
    const userId = 1;
    const userEmail = 'john@example.com';
    const userPassword = 'password123';

    expect(() => new User(userId, '', userEmail, userPassword)).toThrowError('Name is required.');
});

test('Given an invalid email, when creating a User, then it should throw an error', () => {
    const userId = 1;
    const userName = 'John Doe';
    const userPassword = 'password123';
    
    expect(() => new User(userId, userName, '', userPassword)).toThrowError('Email is required');
});

test('Given valid user and task, when adding a task to the user, then the task should be added successfully', () => {
    const user = new User(1, 'John Doe', 'john@example.com', 'password123');
    const task = new Task(1, 'Task 1', 'Description', 'medium', new Date(Date.now() + 10000), 'not finished', 1);
    
    user.addTask(task);
    
    expect(user.tasks.length).toBe(1);
    expect(user.tasks[0]).toBe(task);
  });