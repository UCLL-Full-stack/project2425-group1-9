import { Task } from '../../model/Task';
import { Reminder } from '../../model/Reminder';
import { Tag } from '../../model/Tag';
import { User } from '../../model/User';

test('Given valid properties, when creating a Task, then it should be created successfully', () => {
  const user = new User({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  });

  const task = new Task({
    id: 1,
    title: 'Test Task',
    description: 'Description',
    priority: 'medium',
    deadline: new Date(Date.now() + 10000),
    status: 'not finished',
    tags: [],
    reminder: undefined, // No reminder for this test
    user: user
  });

  expect(task).toBeDefined();
  expect(task.getTitle()).toBe('Test Task');
});

test('Given an empty title, when creating a Task, then it should throw an error', () => {
  const user = new User({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  });

  expect(() => new Task({
    id: 1,
    title: '',
    description: 'Description',
    priority: 'medium',
    deadline: new Date(Date.now() + 10000),
    status: 'not finished',
    tags: [],
    reminder: undefined,
    user: user
  })).toThrowError('Task title is required and cannot be empty.');
});

test('Given a past deadline, when creating a Task, then it should throw an error', () => {
  const user = new User({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  });

  expect(() => new Task({
    id: 1,
    title: 'Test Task',
    description: 'Description',
    priority: 'medium',
    deadline: new Date(Date.now() - 10000),
    status: 'not finished',
    tags: [],
    reminder: undefined,
    user: user
  })).toThrowError('Deadline must be a valid future date.');
});




