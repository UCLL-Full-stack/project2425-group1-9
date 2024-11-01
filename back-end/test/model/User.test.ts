import {User} from '../../model/User';
import {Task} from '../../model/Task'
  
test('Given valid properties, when creating a User, then it should be created successfully', () => {
    const userId = 1;
    const userName = "John Doe"
    const userEmail = 'john@example.com';
    const userPassword = 'password123';
    
    const user = new User({id: userId, name: userName, email: userEmail, password: userPassword, tasks: []});

    expect(user).toBeDefined();
    expect(user.getName()).toBe(userName);
    expect(user.getEmail()).toBe(userEmail);
});

test('Given an empty name, when creating a User, then it should throw an error', () => {
    const userId = 1;
    const userEmail = 'john@example.com';
    const userPassword = 'password123';

    expect(() => {new User({id: userId,name: '', email: userEmail, password: userPassword, tasks: []})}).toThrowError('Name is required and cannot be empty.');
});

test('Given an invalid email, when creating a User, then it should throw an error', () => {
    const userId = 1;
    const userName = 'John Doe';
    const userPassword = 'password123';
    
    expect(() => new User({id: userId, name: userName, email: '', password: userPassword, tasks: []})).toThrowError('A valid email is required.');
});

test('Given valid user and task, when adding a task to the user, then the task should be added successfully', () => {
    const user = new User({id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', tasks: []});
    const task = new Task({id: 1, title: 'Task 1', description: 'Description', priority: 'medium', deadline: new Date(Date.now() + 10000), status: 'not finished', tags:[]});
    
    user.addTask(task);
    
    expect(user.getTasks().length).toBe(1);
    expect(user.getTasks()[0]).toBe(task);
  });