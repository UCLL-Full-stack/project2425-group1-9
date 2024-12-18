import { Tag } from './Tag'
import { Reminder } from './Reminder'; 
import { Task as TaskPrisma, Reminder as ReminderPrisma, Tag as TagPrisma, User as UserPrisma} from '@prisma/client';
import { User } from './User';
import { ReminderInput } from '../types';

export class Task {
  readonly id?: number;
  readonly title: string;
  readonly description: string;
  readonly priority: string;
  readonly deadline: Date;
  readonly status: string;
  readonly tags: Tag[];
  public reminder?: Reminder;
  readonly user: User;

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
    if (!this.status || typeof this.status !== 'string' || this.status.trim().length === 0) {
      throw new Error('Status is required and cannot be empty.');
    }
    if (!Array.isArray(this.tags)) {
      throw new Error('Tags must be an array of Tag instances.');
    }
}

  getTags(): Tag[] {
    return this.tags;
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
            reminder: reminder ? Reminder.from(reminder) : undefined, 
            user: User.from(user)
        });
    }
}
