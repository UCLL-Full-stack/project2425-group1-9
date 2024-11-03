import { Task } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const createTask = async (taskInput: Task): Promise<any> => {
  // Log the input task for debugging
  const taskData = {taskInput};
  console.log("Task data to be sent:", taskData);  // Log the task data

  try {
    const response = await fetch(`${API_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (!response.ok) {
      // Log the error response from the server for better understanding
      const errorData = await response.json();
      console.error("Error response from server:", errorData);
      throw new Error(`Failed to add task: ${errorData.message || response.statusText}`);
    }
    
    return response.json();
  } catch (error) {
    console.error("Error during fetch:", error);
    throw error;  // Rethrow the error after logging it
  }
};

const taskService = {
  createTask,
};

export default taskService;
