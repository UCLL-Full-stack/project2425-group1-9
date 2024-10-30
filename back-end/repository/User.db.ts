import { User } from '../model/User';

const users: User[] = []; 

const createUser = (user: User): User => {
  users.push(user);
  return user;
};

const getUserById = (id: number): User | null => {
  return users.find(user => user.id === id) || null;
};

const getAllUsers = (): User[] => {
  return users;
};

const findUserByName = (name: string): User | null => {
  return users.find(user => user.name === name) || null
}

const updateUser = (updatedUser: User): User | null => {
  const index = users.findIndex(user => user.id === updatedUser.id);
  if (index > -1) {
    users[index] = updatedUser;
    return updatedUser;
  }
  return null;
};

const deleteUser = (id: number): boolean => {
  const index = users.findIndex(user => user.id === id); 
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
