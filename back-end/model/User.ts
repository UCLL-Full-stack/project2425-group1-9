import {Task} from '../model/Task'
export class User {
  private id?: number;
  private name: string;
  private email: string;
  private password: string;
  private tasks: Task[];

  constructor(user: {
    id?: number;
    name: string;
    email: string;
    password: string;
    tasks: Task[];
  }) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.tasks = user.tasks || [];
    this.validate();
  }

  validate() {
    if (!this.name || typeof this.name !== 'string' || this.name.trim().length === 0) {
      throw new Error('Name is required and cannot be empty.');
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email || typeof this.email !== 'string' || !emailPattern.test(this.email)) {
      throw new Error('A valid email is required.');
    }
    if (!this.password || typeof this.password !== 'string' || this.password.length < 6) {
      throw new Error('Password is required and must be at least 6 characters long.');
    }
    if (!Array.isArray(this.tasks) || this.tasks.some(task => !(task instanceof Task))) {
      throw new Error('Tasks must be an array of Task instances.');
    }
}

 
  addTask(task: Task) {
    if (!task) {
      throw new Error('Task is required.');
    }
    this.tasks.push(task);
  }

  getTasks() {
    return this.tasks;
  }

  getId() {
    return this.id
  }

  getName() {
    return this.name
  }

  getEmail() {
    return this.email
  }
  
}
