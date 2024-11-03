const API_URL = process.env.NEXT_PUBLIC_API_URL;
import {User} from '../types/index'

const getAllUsers = async () => {
  const response = await fetch(`${API_URL}/users`);
  const data = await response.json();
  return data;
};

const getUserById = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};


const createUser = async (userInput: User) => {
      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInput),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add user');
      }
      return response.json();
  };



const userService = {
  getAllUsers,
  getUserById,
  createUser,
};

export default userService;
