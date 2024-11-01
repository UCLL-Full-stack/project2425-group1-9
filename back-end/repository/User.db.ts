import { User } from '../model/User';
import { Task } from '../model/Task';
import { Tag } from '../model/Tag';
import { Reminder } from '../model/Reminder';

const tag1 = new Tag({ id: 1, name: 'Urgent' });
const tag2 = new Tag({ id: 2, name: 'Work' });
const tag3 = new Tag({ id: 3, name: 'Personal' });

const reminder1 = new Reminder({ id: 1, reminderTime: new Date(Date.now() + 24 * 60 * 60 * 1000)});
const reminder2 = new Reminder({ id: 2, reminderTime: new Date(Date.now() + 48 * 60 * 60 * 1000)});

const tasksForJohn = [
  new Task({
    id: 1,
    title: 'Complete project report',
    description: 'Finish the quarterly project report.',
    priority: 'high',
    deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    status: 'not finished',
    tags: [tag1, tag2],
    reminder: reminder1
  }),
  new Task({
    id: 2,
    title: 'Grocery shopping',
    description: 'Buy groceries for the week.',
    priority: 'medium',
    deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    status: 'not finished',
    tags: [tag3],
    reminder: reminder2
  }),
];

const tasksForJane = [
  new Task({
    id: 3,
    title: 'Prepare for meeting',
    description: 'Prepare slides for the upcoming client meeting.',
    priority: 'high',
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    status: 'not finished',
    tags: [tag1]
  }),
];

// Define users
const users: User[] = [
  new User({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'john123',
    tasks: tasksForJohn
  }),
  new User({
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'jane123',
    tasks: tasksForJane
  }),
];

// User operations
const createUser = (user: User): User => {
  users.push(user);
  return user;
};

const getUserById = (id: number): User | null => {
  return users.find(user => user.getId() === id) || null;
};

const getAllUsers = (): User[] => {
  return users;
};

const findUserByName = (name: string): User | null => {
  return users.find(user => user.getName() === name) || null;
};

const updateUser = (updatedUser: User): User | null => {
  const index = users.findIndex(user => user.getId() === updatedUser.getId());
  if (index > -1) {
    users[index] = updatedUser;
    return updatedUser;
  }
  return null;
};

const deleteUser = (id: number): boolean => {
  const index = users.findIndex(user => user.getId() === id);
  if (index > -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  findUserByName
};
