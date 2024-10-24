import { Task } from '../model/Task';

const tasks: Task[] = []; 

const createTask = (task: Task): Task => {
  tasks.push(task);
  return task;
};

const getTaskById = (id: number): Task | null => {
  return tasks.find(task => task.id === id) || null;
};

const getAllTasks = (): Task[] => {
  return tasks;
};

const updateTask = (updatedTask: Task): Task | null => {
  const index = tasks.findIndex(task => task.id === updatedTask.id);
  if (index > -1) {
    tasks[index] = updatedTask;
    return updatedTask;
  }
  return null;
};

const deleteTask = (id: number): boolean => {
  const index = tasks.findIndex(task => task.id === id); 

  if (index > -1) {  
    tasks.splice(index, 1);  
    return true;  
  }
  return false;  
};


export default {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask
};
