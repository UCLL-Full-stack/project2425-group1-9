export class Reminder {
  constructor(
    public id: number,
    public reminderTime: Date,
    public taskId: number
  ) {
    this.validate();
  }

  validate() {
    if (!this.reminderTime) {
      throw new Error('Reminder time is required');
    }
    if (this.reminderTime <= new Date()) {
      throw new Error('Reminder time must be in the future');
    }
  }
}
