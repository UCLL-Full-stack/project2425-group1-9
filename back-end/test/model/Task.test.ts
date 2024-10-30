import { Task } from '../../model/Task';
import { Reminder } from '../../model/Reminder';
import { Tag } from '../../model/Tag'


  test('Given valid properties, when creating a Task, then it should be created successfully', () => {
    const taskId = 1;
    const taskTitle = 'Test Task';
    const taskDescription = 'Description';
    const taskPriority = 'medium';
    const taskDeadline = new Date(Date.now() + 10000);
    const taskStatus = 'not finished';

    const task = new Task(taskId, taskTitle, taskDescription, taskPriority, taskDeadline, taskStatus, [] );

    expect(task).toBeDefined();
    expect(task.title).toBe(taskTitle);
  });

  test('Given an empty title, when creating a Task, then it should throw an error', () => {
    const taskId = 1;
    const taskDescription = 'Description';
    const taskPriority = 'medium';
    const taskDeadline = new Date(Date.now() + 10000);
    const taskStatus = 'not finished';

    expect(() => new Task(taskId, '', taskDescription, taskPriority, taskDeadline, taskStatus, [])).toThrowError('Task title is required');
  });

  test('Given a past deadline, when creating a Task, then it should throw an error', () => {
    const taskId = 1;
    const taskTitle = 'Test Task';
    const taskDescription = 'Description';
    const taskPriority = 'medium';
    const taskStatus = 'not finished';

    expect(() => new Task(taskId, taskTitle, taskDescription, taskPriority, new Date(Date.now() - 10000), taskStatus,[] )).toThrowError('Deadline must be in the future');
  });

  test('Given a valid task and reminder, when adding a reminder to the task, then the reminder should be added successfully', () => {
    const task = new Task(1, 'Test Task', 'Description', 'medium', new Date(Date.now() + 10000), 'not finished', []);
    const reminder = new Reminder(1, new Date(Date.now() + 5000), 1);
    
    task.setReminder(reminder);
    
    expect(task.reminder).toBe(reminder);
  });

  test('Given a reminder time after the task deadline, when adding the reminder, then it should throw an error', () => {
    const task = new Task(1, 'Test Task', 'Description', 'medium', new Date(Date.now() + 5000), 'not finished', []);
    const reminder = new Reminder(1, new Date(Date.now() + 10000), 1);
    
    expect(() => task.setReminder(reminder)).toThrowError('Reminder time must be set before the task deadline.');
  });

  test('Given a duplicate tag, when adding the same tag again, then it should throw an error', () => {
    const task = new Task(1, 'Test Task', 'Description', 'medium', new Date(Date.now() + 10000), 'not finished', []);
    const tag = new Tag(1, 'Urgent');

    task.addTag(tag);

    expect(() => task.addTag(tag)).toThrowError('This tag is already associated with the task.');
  });

  test('When marking a task as completed, then the task status should be set to "finished"', () => {
    const task = new Task(1, 'Test Task', 'Description', 'medium', new Date(Date.now() + 10000), 'not finished', []);

    task.markAsCompleted();

    expect(task.status).toBe('finished');
  });

