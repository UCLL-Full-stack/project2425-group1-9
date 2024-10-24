import userRepository from '../repository/User.db';
import { User } from '../model/User';

const createUser = (user: User): User => {
  const existingUser = userRepository.getAllUsers().find(
    (u) => u.name === user.name 
  );
  if (existingUser) {
    throw new Error(
      `A user with the name ${user.name} already exists.`
    )};  

  return userRepository.createUser(user);
};

const getUserById = (id: number): User | null => {
  return userRepository.getUserById(id);
};

const getAllUsers = (): User[] => {
  return userRepository.getAllUsers();
};

const updateUser = (updatedUser: User): User | null => {
  const existingUser = userRepository.getUserById(updatedUser.id);
  if (!existingUser) {
    throw new Error(`User with ID ${updatedUser.id} does not exist.`);
  }
  return userRepository.updateUser(updatedUser);
};

const deleteUser = (id: number): boolean => {
  const existingUser = userRepository.getUserById(id);
  if (!existingUser) {
    throw new Error(`User with ID ${id} does not exist.`);
  }
  return userRepository.deleteUser(id);
};

export default {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
