import { Tag } from './Tag'
import { Reminder } from './Reminder'; 
import { Task as TaskPrisma, Reminder as ReminderPrisma, Tag as TagPrisma, User as UserPrisma} from '@prisma/client';
import { User } from './User';

export class Task {
  private id?: number;
  private title: string;
  private description: string;
  private priority: string;
  private deadline: Date;
  private status: string;
  private tags: Tag[];
  private reminder?: Reminder;
  private user: User;

  constructor(task: {
    id?: number;
    title: string;
    description: string;
    priority: string
    deadline: Date;
    status: string;
    tags: Tag[];
    reminder?: Reminder;
    user: User;
  }) {
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.priority = task.priority;
    this.deadline = task.deadline;
    this.status = task.status;
    this.tags = task.tags;
    this.reminder = task.reminder;
    this.user = task.user;
    this.validate();
  }

  validate() {
    if (!this.title || typeof this.title !== 'string' || this.title.trim().length === 0) {
      throw new Error('Task title is required and cannot be empty.');
    }
    if (!['low', 'medium', 'high'].includes(this.priority)) {
      throw new Error('Task priority must be one of: low, medium, or high.');
    }
    if (this.deadline <= new Date()) {
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

    if (this.reminder) {
      throw new Error("Task already has a reminder set.")
    }
    this.reminder = reminder;
  }

  getReminder(): Reminder | undefined{
    return this.reminder;
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
  
  getDeadline(): Date {
    return this.deadline;
  }

  getDescription(): string {
    return this.description;
  }

  getPriority(): string {
    return this.priority;
  }

  getUser(): User {
    return this.user
  }

  static from({
        id,
        title,
        description,
        priority,
        deadline,
        status,
        tags,
        reminder,
        user
    }: TaskPrisma & {
        tags: TagPrisma[];
        reminder: ReminderPrisma | null;
        user: UserPrisma;
    }) {
        return new Task({
            id,
            title,
            description,
            priority,
            deadline,
            status,
            tags: tags.map((tag) => Tag.from(tag)),
            reminder: reminder ? Reminder.from(reminder) : undefined, // Handle null case
            user: User.from(user)
        });
    }
}
