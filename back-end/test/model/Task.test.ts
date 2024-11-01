import { Task } from '../../model/Task';
import { Reminder } from '../../model/Reminder';
import { Tag } from '../../model/Tag';

test('Given valid properties, when creating a Task, then it should be created successfully', () => {
  const task = new Task({
    id: 1,
    title: 'Test Task',
    description: 'Description',
    priority: 'medium',
    deadline: new Date(Date.now() + 10000),
    status: 'not finished',
    tags: []
  });

  expect(task).toBeDefined();
  expect(task.getTitle()).toBe('Test Task');
});

test('Given an empty title, when creating a Task, then it should throw an error', () => {
  expect(() => new Task({
    id: 1,
    title: '',
    description: 'Description',
    priority: 'medium',
    deadline: new Date(Date.now() + 10000),
    status: 'not finished',
    tags: []
  })).toThrowError('Task title is required and cannot be empty.');
});

test('Given a past deadline, when creating a Task, then it should throw an error', () => {
  expect(() => new Task({
    id: 1,
    title: 'Test Task',
    description: 'Description',
    priority: 'medium',
    deadline: new Date(Date.now() - 10000),
    status: 'not finished',
    tags: []
  })).toThrowError('Deadline must be a valid future date.');
});

test('Given a valid task and reminder, when adding a reminder to the task, then the reminder should be added successfully', () => {
  const task = new Task({
    id: 1,
    title: 'Test Task',
    description: 'Description',
    priority: 'medium',
    deadline: new Date(Date.now() + 10000),
    status: 'not finished',
    tags: []
  });
  const reminder = new Reminder({ id: 1, reminderTime: new Date(Date.now() + 5000)});

  task.setReminder(reminder);

  expect(task.getReminder()).toBe(reminder);
});

test('Given a reminder time after the task deadline, when adding the reminder, then it should throw an error', () => {
  const task = new Task({
    id: 1,
    title: 'Test Task',
    description: 'Description',
    priority: 'medium',
    deadline: new Date(Date.now() + 5000),
    status: 'not finished',
    tags: []
  });
  const reminder = new Reminder({ id: 1, reminderTime: new Date(Date.now() + 10000)});

  expect(() => task.setReminder(reminder)).toThrowError('Reminder time must be set before the task deadline.');
});

test('Given a duplicate tag, when adding the same tag again, then it should throw an error', () => {
  const task = new Task({
    id: 1,
    title: 'Test Task',
    description: 'Description',
    priority: 'medium',
    deadline: new Date(Date.now() + 10000),
    status: 'not finished',
    tags: []
  });
  const tag = new Tag({ id: 1, name: 'Urgent' });

  task.addTag(tag);

  expect(() => task.addTag(tag)).toThrowError('This tag is already associated with the task.');
});

test('When marking a task as completed, then the task status should be set to "finished"', () => {
  const task = new Task({
    id: 1,
    title: 'Test Task',
    description: 'Description',
    priority: 'medium',
    deadline: new Date(Date.now() + 10000),
    status: 'not finished',
    tags: []
  });

  task.markAsCompleted();

  expect(task.getStatus()).toBe('finished');
});
