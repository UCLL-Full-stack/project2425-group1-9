import { Task } from '../../model/Task';
import { User } from '../../model/User';
import { Tag } from '../../model/Tag'; 
import { Reminder } from '../../model/Reminder';

describe('Task Model', () => {
  const user = new User({ id: 1, name: 'John Doe', email: 'john@example.com', password: 'Password123', role: 'user' });
  const tag = new Tag({ id: 1, name: 'urgent' });

  test('Given valid properties, when creating a Task, then it should be created successfully', () => {
    const task = new Task({
      title: 'Test Task',
      description: 'A task for testing.',
      priority: 'high',
      deadline: new Date(),
      status: 'pending',
      tags: [tag],
      user: user
    });

    expect(task).toBeDefined();
    expect(task.getTitle()).toBe('Test Task');
    expect(task.getPriority()).toBe('high');
    expect(task.getStatus()).toBe('pending');
    expect(task.getTags()).toEqual([tag]);
    expect(task.getUser()).toBe(user);
  });

  test('Given missing title, when creating a Task, then it should throw an error', () => {
    expect(() => new Task({
      title: '',
      description: 'A task without title.',
      priority: 'low',
      deadline: new Date(),
      status: 'pending',
      tags: [tag],
      user: user
    })).toThrowError('Task title is required and cannot be empty.');
  });

  test('Given invalid priority, when creating a Task, then it should throw an error', () => {
    expect(() => new Task({
      title: 'Test Task',
      description: 'A task with invalid priority.',
      priority: 'invalid',  
      deadline: new Date(),
      status: 'pending',
      tags: [tag],
      user: user
    })).toThrowError('Task priority must be one of: low, medium, or high.');
  });

  test('Given invalid tags, when creating a Task, then it should throw an error', () => {
    expect(() => new Task({
      title: 'Test Task',
      description: 'A task with invalid tags.',
      priority: 'medium',
      deadline: new Date(),
      status: 'pending',
      tags: null as any, 
      user: user
    })).toThrowError('Tags must be an array of Tag instances.');
  });

  test('Given a valid reminder, when creating a Task, then it should include the reminder', () => {
    const reminder = new Reminder({ id: 1, reminderTime: new Date(Date.now() + 10000), reminderMessage: "Test reminder", sent: false });
    const task = new Task({
      title: 'Test Task with Reminder',
      description: 'Task description',
      priority: 'medium',
      deadline: new Date(),
      status: 'pending',
      tags: [tag],
      reminder: reminder,
      user: user
    });

    expect(task.getReminder()).toBeDefined();
    expect(task.getReminder()?.getReminderMessage()).toBe("Test reminder");
  });
});
