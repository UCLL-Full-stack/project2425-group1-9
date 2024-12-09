import {Task} from '../model/Task'
import { Task as TaskPrisma, User as UserPrisma} from '@prisma/client';
import { Role } from '../types';

export class User {
  readonly id?: number;
  readonly name: string;
  readonly email: string;
  readonly password: string;
  readonly role: Role;

  constructor(user: {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: Role;
  }) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
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

  getPassword() {
    return this.password
  }

  getRole() {
    return this.role
  }
  
  static from({
        id,
        name,
        email,
        password,
        role
    }: UserPrisma ) {
        return new User({
          id,
          name,
          email,
          password,
          role: role as Role
        });
    }
}
