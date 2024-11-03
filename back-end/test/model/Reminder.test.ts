import { Reminder } from '../../model/Reminder';

test('Given valid properties, when creating a Reminder, then it should be created successfully', () => {
  const reminder = new Reminder({ id: 1, reminderTime: new Date(Date.now() + 10000)});

  expect(reminder).toBeDefined();
  expect(reminder.getReminderTime()).toBeInstanceOf(Date);
});

test('Given an empty reminder time, when creating a Reminder, then it should throw an error', () => {
  expect(() => new Reminder({ id: 1, reminderTime: null as any})).toThrowError('Reminder time is required');
});

test('Given a past reminder time, when creating a Reminder, then it should throw an error', () => {
  expect(() => new Reminder({ id: 1, reminderTime: new Date(Date.now() - 10000)})).toThrowError('Reminder time must be in the future');
});
