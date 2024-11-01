export class Reminder {
  private id?: number;
  private reminderTime: Date;
  private taskId: number;

  constructor(reminder: { id?: number; reminderTime: Date; taskId: number }) {
    this.id = reminder.id;
    this.reminderTime = reminder.reminderTime;
    this.taskId = reminder.taskId
    this.validate(reminder.reminderTime);
  }

  validate(reminderTime: Date) {
    if (!reminderTime) {
      throw new Error('Reminder time is required.');
    }
    if (reminderTime <= new Date()) {
      throw new Error('Reminder time must be in the future.');
    }
  }

  getId(): number | undefined {
    return this.id;
  }

  getReminderTime(): Date {
    return this.reminderTime;
  }

  getTaskId(): number {
    return this.taskId
  }
}
