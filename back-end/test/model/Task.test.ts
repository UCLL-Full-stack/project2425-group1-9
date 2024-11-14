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

test('Given a valid task and reminder, when adding a reminder to the task, then the reminder should be added successfully', () => {
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
    reminder: undefined,
    user: user
  });
  
  const reminder = new Reminder({ id: 1, reminderTime: new Date(Date.now() + 5000) });
  task.setReminder(reminder);

  expect(task.getReminder()).toBe(reminder);
});

test('Given a reminder time after the task deadline, when adding the reminder, then it should throw an error', () => {
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
    deadline: new Date(Date.now() + 5000),
    status: 'not finished',
    tags: [],
    reminder: undefined,
    user: user
  });
  
  const reminder = new Reminder({ id: 1, reminderTime: new Date(Date.now() + 10000) });

  expect(() => task.setReminder(reminder)).toThrowError('Reminder time must be before the task deadline.');
});

test('Given a task with duplicate tags, when adding the tags, then it should throw an error', () => {
  const user = new User({
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  });

  const tag1 = new Tag({ id: 1, name: 'Important' });
  const tag2 = new Tag({ id: 1, name: 'Important' }); // Duplicate tag

  const task = new Task({
    id: 1,
    title: 'Test Task',
    description: 'Description',
    priority: 'medium',
    deadline: new Date(Date.now() + 10000),
    status: 'not finished',
    tags: [tag1],
    reminder: undefined,
    user: user
  });

  expect(() => task.addTag(tag2)).toThrowError('Tag already exists in the task.');
});