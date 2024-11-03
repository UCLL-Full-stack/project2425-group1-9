import { User } from '../model/User';
import TaskDb from './Task.db';

const users: User[] = [
  new User({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'john123',
    tasks: [TaskDb.getAllTasks()[0], TaskDb.getAllTasks()[1]]
  }),
  new User({
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'jane123',
    tasks: [TaskDb.getAllTasks()[1]]
  }),
];

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

const findUserByEmail = (email: string): User | null => {
  return users.find(user => user.getEmail() === email) || null;
};

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
  findUserByName,
  findUserByEmail,
};

