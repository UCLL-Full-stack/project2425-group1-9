import { Tag } from './Tag'
import { Reminder } from './Reminder'; 

export class Task {
  private id?: number;
  private title: string;
  private description: string;
  private priority: 'low' | 'medium' | 'high';
  private deadline: Date;
  private status: string;
  private tags: Tag[];
  private reminder?: Reminder;

  constructor(task: {
    id?: number;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    deadline: Date;
    status: string;
    tags: Tag[];
    reminder?: Reminder;
  }) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.priority = task.priority;
    this.deadline = task.deadline;
    this.status = task.status;
    this.tags = task.tags;
    this.reminder = task.reminder;
    this.validate();
  }

  validate() {
    if (!this.title || typeof this.title !== 'string' || this.title.trim().length === 0) {
      throw new Error('Task title is required and cannot be empty.');
    }
    if (!['low', 'medium', 'high'].includes(this.priority)) {
      throw new Error('Task priority must be one of: low, medium, or high.');
    }
    if (!(this.deadline instanceof Date) || isNaN(this.deadline.getTime()) || this.deadline <= new Date()) {
      throw new Error('Deadline must be a valid future date.');
    }
    if (!this.status || typeof this.status !== 'string' || this.status.trim().length === 0) {
      throw new Error('Status is required and cannot be empty.');
    }
    if (!Array.isArray(this.tags)) {
      throw new Error('Tags must be an array of Tag instances.');
    }
}


  addTag(tag: Tag) {
    if (!tag) {
      throw new Error('Tag is required.');
    }
    
    const exists = this.tags.some(existingTag => existingTag.getId() === tag.getId());
    if (exists) {
      throw new Error('This tag is already associated with the task.');
    }
    
    this.tags.push(tag);
  }

  getTags(): Tag[] {
    return this.tags;
  }

  setReminder(reminder: Reminder) {
    if (!reminder) {
      throw new Error('Reminder is required.');
    }
    if (reminder.getReminderTime() >= this.deadline) {
      throw new Error('Reminder time must be set before the task deadline.');
    }
    this.reminder = reminder;
  }

  getReminder(): Reminder | undefined{
    return this.reminder;
  }

  markAsCompleted() {
    this.status = 'finished';
  }

  getStatus(): string {
    return this.status;
  }

  getTitle(): string {
    return this.title;
  }

  getId(): number | undefined {
    return this.id
  }
}
