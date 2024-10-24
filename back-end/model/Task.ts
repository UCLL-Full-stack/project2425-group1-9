import { Tag } from './Tag'
import { Reminder } from './Reminder'; 

export class Task {
  public tags: Tag[] = []; 
  public reminder?: Reminder;

  constructor(
    public id: number,
    public title: string,
    public description: string = '',
    public priority: 'low' | 'medium' | 'high',
    public deadline: Date,
    public status: 'not finished' | 'finished' = 'not finished',
    public userId: number
  ) {
    this.validate();
  }

  validate() {
    if (!this.title) {
      throw new Error('Task title is required');
    }
    if (!this.priority) {
      throw new Error('Task priority must be low, medium, or high');
    }
    if (this.deadline < new Date()) {
      throw new Error('Deadline must be in the future');
    }
  }

  addTag(tag: Tag) {
    if (!tag) {
      throw new Error('Tag is required.');
    }
    
    const exists = this.tags.some(existingTag => existingTag.id === tag.id);
    if (exists) {
      throw new Error('This tag is already associated with the task.');
    }
    
    this.tags.push(tag);
  }

  getTags() {
    return this.tags;
  }

  setReminder(reminder: Reminder) {
    if (!reminder) {
      throw new Error('Reminder is required.');
    }
    if (reminder.reminderTime >= this.deadline) {
      throw new Error('Reminder time must be set before the task deadline.');
    }
    this.reminder = reminder;
  }

  getReminder() {
    return this.reminder;
  }

  markAsCompleted() {
    this.status = 'finished';
  }
}
