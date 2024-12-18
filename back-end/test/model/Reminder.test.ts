import { Reminder } from '../../model/Reminder';


describe('Reminder model', () => {
test('Given valid properties, when creating a Reminder, then it should be created successfully', () => {
  const reminder = new Reminder({ id: 1, reminderTime: new Date(Date.now() + 10000), reminderMessage: "reminderMessage", sent: false});

  expect(reminder).toBeDefined();
  expect(reminder.getReminderTime()).toBeInstanceOf(Date);
});

test('Given an empty reminder time, when creating a Reminder, then it should throw, an error', () => {
  expect(() => new Reminder({ id: 1, reminderTime: null as any, reminderMessage: "reminderMessage", sent: false})).toThrowError('Reminder time is required');
});

test('Given an empty reminder message, when creating a Reminder, then it should throw, an error', () => {
  expect(() => new Reminder({ id: 1, reminderTime: new Date(Date.now() + 10000), reminderMessage: "", sent: false})).toThrowError('Reminder message is required');
});
});
