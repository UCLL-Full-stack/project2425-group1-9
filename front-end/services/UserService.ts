const API_URL = process.env.NEXT_PUBLIC_API_URL;
import {User} from '../types/index'

const getAllUsers = async (): Promise<User[]> => {
  const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
  const response = await fetch(`${API_URL}/users`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData?.error;
    throw new Error(errorMessage); 
  }
  return response.json(); 
};

const getUserById = async (id: number) => {
  const response = await fetch(`${API_URL}/users/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
};

const getUserByName = async (name: string): Promise<User> => {
  const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
  const response = await fetch(`${API_URL}/users/${name}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData?.error;
    throw new Error(errorMessage); 
  }
  return response.json(); 
};


const createUser = async (userInput: User) => {
  const response = await fetch(`${API_URL}/users/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userInput),
  });

  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData?.error || 'Failed to create account. Please try again later.';
    throw new Error(errorMessage); 
  }

  return response.json();
};


const loginUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};


const deleteUser = async (id: number): Promise<void> => {
  const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
  const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
      },
  });

  if (!response.ok) {
      throw new Error('Failed to delete user');
  }
};





const userService = {
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  getUserByName,
  deleteUser,
};

export default userService;
