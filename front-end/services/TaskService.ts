import { Task } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;






const getTasksByUserId = async (userId: number): Promise<Task[]> => {
  const response = await fetch(`${API_URL}/tasks/user/${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tasks for user');
  }
  
  return response.json();
};



const getAllTasks = async (): Promise<Task[]> => {
  const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch tasks');
  }
  return response.json(); 
};





const createTask = async (taskInput: Task): Promise<any> => {
  const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
  const response = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskInput),
  });
  
  if (!response.ok) {
    throw new Error('Failed to add task');
  }
  return response.json();
};



const updateTask = async (taskInput: Task): Promise<any> => {
  const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;
  const response = await fetch(`${API_URL}/tasks/${taskInput.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(taskInput),
  });
  
  if (!response.ok) {
    throw new Error('Failed to update task');
  }
  return response.json();
};

const taskService = {
  createTask,
  updateTask, 
  getTasksByUserId,
  getAllTasks,

};

export default taskService;