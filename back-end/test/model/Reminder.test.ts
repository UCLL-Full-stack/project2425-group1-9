import { Reminder } from '../../model/Reminder';


  test('Given valid properties, when creating a Reminder, then it should be created successfully', () => {
    const reminderId = 1;
    const reminderTime = new Date(Date.now() + 10000);

    const reminder = new Reminder(reminderId, reminderTime, 1);

    expect(reminder).toBeDefined();
    expect(reminder.reminderTime).toBeInstanceOf(Date);
  });

  test('Given an empty reminder time, when creating a Reminder, then it should throw an error', () => {
    const reminderId = 1;

    expect(() => new Reminder(reminderId, null as any, 1)).toThrowError('Reminder time is required');
  });

  test('Given a past reminder time, when creating a Reminder, then it should throw an error', () => {
    const reminderId = 1;

    expect(() => new Reminder(reminderId, new Date(Date.now() - 10000), 1)).toThrowError('Reminder time must be in the future');
  });

