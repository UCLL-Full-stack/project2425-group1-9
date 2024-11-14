import taskRepository from '../repository/Task.db';
import { TaskInput } from '../types'; 
import { Task } from '../model/Task';
import { User } from '../model/User';
import { Tag } from '../model/Tag';
import { Reminder } from '../model/Reminder';

const createTask = async ({id, title, description, priority, deadline, status, tags, reminder, user }: TaskInput): Promise<Task> => {
    const existingTask = taskRepository.getTaskByTitle(title);
    if (existingTask) {
        throw new Error(`A task with the title "${title}" already exists.`);
    }

    const tagInstances = tags.map(tagInput => new Tag(tagInput));

    const reminderInstance = reminder ? new Reminder(reminder) : undefined;

    const userInstance = new User(user);

    const newTask = new Task({
        id,
        title,
        description,
        priority,
        deadline,
        status: status || 'not finished',
        tags: tagInstances, 
        reminder: reminderInstance, 
        user: userInstance 
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

    if (updatedTaskInput.deadline && updatedTaskInput.deadline <= new Date()) {
        throw new Error('Updated task deadline must be in the future.');
    }
    
    const userInstance = new User(updatedTaskInput.user);
    const tagInstances = updatedTaskInput.tags.map(tagInput => new Tag(tagInput));


    const updatedTask = new Task({
        id: updatedTaskInput.id,
        title: updatedTaskInput.title || existingTask.getTitle(),
        description: updatedTaskInput.description || existingTask.getDescription(),
        priority: updatedTaskInput.priority || existingTask.getPriority(),
        deadline: updatedTaskInput.deadline || existingTask.getDeadline(),
        status: updatedTaskInput.status || existingTask.getStatus(), 
        tags: tagInstances || existingTask.getTags(),
        reminder: existingTask.getReminder(), 
        user: userInstance
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
