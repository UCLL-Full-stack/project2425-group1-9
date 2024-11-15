import { Reminder as ReminderPrisma} from '@prisma/client';

export class Reminder {
  readonly id?: number;
  readonly reminderTime: Date;

  constructor(reminder: { id?: number; reminderTime: Date;}) {
    this.id = reminder.id;
    this.reminderTime = reminder.reminderTime;
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

  static from({id, reminderTime}: ReminderPrisma): Reminder {
        return new Reminder({
            id,
            reminderTime
        });
    }
}
  

