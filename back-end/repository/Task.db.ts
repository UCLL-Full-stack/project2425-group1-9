import { Task } from '../model/Task';

const tasks: Task[] = []; 

const createTask = (task: Task): Task => {
  tasks.push(task);
  return task;
};

const getTaskById = (id: number): Task | null => {
  return tasks.find(task => task.getId() === id) || null;
};

const getTaskByTitle = (title: string): Task | null => {
  return tasks.find(task => task.getTitle() === title) || null
}

const getAllTasks = (): Task[] => {
  return tasks;
};

const updateTask = (updatedTask: Task): Task | null => {
  const index = tasks.findIndex(task => task.getId() === updatedTask.getId());
  if (index > -1) {
    tasks[index] = updatedTask;
    return updatedTask;
  }
  return null;
};

const deleteTask = (id: number): boolean => {
  const index = tasks.findIndex(task => task.getId() === id); 

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
  deleteTask,
  getTaskByTitle
};
