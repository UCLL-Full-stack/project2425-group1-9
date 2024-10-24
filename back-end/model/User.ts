import {Task} from '../model/Task'
export class User {
  public tasks: Task[] = []; 

  constructor(
    public id: number,
    public name: string,
    public email: string,
    public password: string,
  ) {
    this.validate();
  }

  validate() {
    if (!this.name) {
      throw new Error('Name is required.');
    }
    if (!this.email) {
      throw new Error('Email is required.');
    }
    if (!this.password) {
      throw new Error('Password is required.');
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
}
