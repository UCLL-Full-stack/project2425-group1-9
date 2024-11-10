import taskRepository from '../repository/Task.db';
import { TaskInput } from '../types'; 
import { Task } from '../model/Task';

const createTask = async (taskInput: TaskInput): Promise<Task> => {
    const existingTask = taskRepository.getTaskByTitle(taskInput.title)
    if (existingTask) {
        throw new Error(`A task with the title "${taskInput.title}" already exists.`);
    }
    

    const newTask = new Task({
        id: taskInput.id,
        title: taskInput.title,
        description: taskInput.description,
        priority: taskInput.priority,
        deadline: taskInput.deadline,
        status: taskInput.status || 'not finished',
        tags: taskInput.tags,
        reminder: taskInput.reminder
    });

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
        throw new Error(`Task update failed. Please provide a valid id.`);
    }

    const existingTask = await taskRepository.getTaskById(updatedTaskInput.id);
    if (!existingTask) {
        throw new Error(`Task with ID ${updatedTaskInput.id} does not exist.`);
    }

    if (existingTask.getStatus() === 'finished' && updatedTaskInput.status === 'finished') {
        throw new Error('Completed tasks cannot be updated.');
    }

    if (updatedTaskInput.deadline && updatedTaskInput.deadline <= new Date()) {
        throw new Error('Updated task deadline must be in the future.');
    }

    const updatedTask = new Task({
        id: updatedTaskInput.id,
        title: updatedTaskInput.title || existingTask.getTitle(),
        description: updatedTaskInput.description || existingTask.getDescription(),
        priority: updatedTaskInput.priority || existingTask.getPriority(),
        deadline: updatedTaskInput.deadline || existingTask.getDeadline(),
        status: updatedTaskInput.status || existingTask.getStatus(), // Update status if provided
        tags: updatedTaskInput.tags || existingTask.getTags(),
        reminder: existingTask.getReminder() || undefined, // Keep the existing reminder
    });

    return taskRepository.updateTask(updatedTask);
};

const deleteTask = async (id: number): Promise<boolean> => {
    const existingTask = taskRepository.getTaskById(id);
    if (!existingTask) {
        throw new Error(`Task with ID ${id} does not exist.`);
    }

    if (existingTask.getStatus() === 'finished') {
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
