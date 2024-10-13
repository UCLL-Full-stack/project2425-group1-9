import Reminder from '../../model/Reminder';

test('should create a reminder object', () => {
    const reminder = new Reminder(new Date());
    expect(reminder).toBeDefined();
});

