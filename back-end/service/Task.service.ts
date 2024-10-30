import taskRepository from '../repository/Task.db';
import { TaskInput } from '../types'; 
import { Task } from '../model/Task';

const createTask = async (taskInput: TaskInput): Promise<Task> => {
    const existingTask = taskRepository.getAllTasks().find(t => t.title === taskInput.title);
    if (existingTask) {
        throw new Error(`A task with the title "${taskInput.title}" already exists.`);
    }

    if (taskInput.id === undefined) {
      throw new Error(`Task creation failed. Please provide a valid id.`);
    }

    const newTask = new Task(
        taskInput.id,
        taskInput.title,
        taskInput.description,
        taskInput.priority,
        taskInput.deadline,
        taskInput.status || 'not finished',
        taskInput.tags,
        taskInput.reminder
    );

    return taskRepository.createTask(newTask);
};

const getTaskById = async (id: number): Promise<Task | null> => {
    return taskRepository.getTaskById(id);
};

const getAllTasks = async (): Promise<Task[]> => {
    return taskRepository.getAllTasks();
};

const updateTask = async (updatedTaskInput: TaskInput): Promise<Task | null> => {
  if (updatedTaskInput.id === undefined) {
      throw new Error(`Task creation failed. Please provide a valid id.`);
    }
    const existingTask = taskRepository.getTaskById(updatedTaskInput.id);
    if (!existingTask) {
        throw new Error(`Task with ID ${updatedTaskInput.id} does not exist.`);
    }
    
    if (existingTask.status === 'finished') {
        throw new Error('Completed tasks cannot be updated.');
    }
    
    if (updatedTaskInput.deadline <= new Date()) {
        throw new Error('Updated task deadline must be in the future.');
    }
    
    const updatedTask = new Task(
        updatedTaskInput.id,
        updatedTaskInput.title,
        updatedTaskInput.description,
        updatedTaskInput.priority,
        updatedTaskInput.deadline,
        updatedTaskInput.status,
        existingTask.tags,
        existingTask.reminder
    );

    return taskRepository.updateTask(updatedTask);
};

const deleteTask = async (id: number): Promise<boolean> => {
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
