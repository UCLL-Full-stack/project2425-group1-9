import taskRepository from '../repository/Task.db';
import { Task } from '../model/Task';

const createTask = (task: Task): Task => {
  const existingTask = taskRepository.getAllTasks().find(t => t.title === task.title);
  if (existingTask) {
    throw new Error(`A task with the title "${task.title}" already exists.`);
  }  
  return taskRepository.createTask(task);
};

const getTaskById = (id: number): Task | null => {
  return taskRepository.getTaskById(id);
};

const getAllTasks = (): Task[] => {
  return taskRepository.getAllTasks();
};

const updateTask = (updatedTask: Task): Task | null => {
  const existingTask = taskRepository.getTaskById(updatedTask.id);
  if (!existingTask) {
    throw new Error(`Task with ID ${updatedTask.id} does not exist.`);
  } 
  if (existingTask.status === 'finished') {
    throw new Error('Completed tasks cannot be updated.');
  }
  if (updatedTask.deadline <= new Date()) {
    throw new Error('Updated task deadline must be in the future.');
  }
  return taskRepository.updateTask(updatedTask);
};

const deleteTask = (id: number): boolean => {
  const existingTask = taskRepository.getTaskById(id);
  if (!existingTask) {
    throw new Error(`Task with ID ${id} does not exist.`);
  }

  if (existingTask.status === 'finished') {
    throw new Error('Completed tasks cannot be deleted.');
  }  
  return taskRepository.deleteTask(id);
};

export default {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,
};
