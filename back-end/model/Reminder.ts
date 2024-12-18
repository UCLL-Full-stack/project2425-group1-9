import { Reminder as ReminderPrisma} from '@prisma/client';

export class Reminder {
  readonly id?: number;
  readonly reminderTime: Date;
  readonly reminderMessage: string
  sent: boolean;

  constructor(reminder: { id?: number; reminderTime: Date; reminderMessage: string; sent?: boolean}) {
    this.id = reminder.id;
    this.reminderTime = reminder.reminderTime;
    this.reminderMessage = reminder.reminderMessage
    this.sent = reminder.sent || false
    this.validate(reminder.reminderTime, reminder.reminderMessage);
  }

  validate(reminderTime: Date, reminderMessage: string) {
    if (!reminderTime) {
      throw new Error('Reminder time is required.');
    }
    if (!reminderMessage) {
      throw new Error('Reminder message is required.');
    }
  }

  getId(): number | undefined {
    return this.id;
  }

  getReminderTime(): Date {
    return this.reminderTime;
  }

  getReminderMessage(): string {
    return this.reminderMessage
  }

  static from({id, reminderTime, reminderMessage}: ReminderPrisma): Reminder {
        return new Reminder({
            id,
            reminderTime,
            reminderMessage
        });
    }
}
  

