import taskRepository from '../repository/Task.db';
import { TaskInput } from '../types'; 
import { Task } from '../model/Task';
import { User } from '../model/User';
import { Tag } from '../model/Tag';
import { Reminder } from '../model/Reminder';
import userDb from '../repository/User.db'
import tagRepository from '../repository/Tag.db'

const createTask = async ({ title, description, priority, deadline, status, tags, reminder, user }: TaskInput): Promise<Task> => {
    const existingTask = await taskRepository.getTaskByTitle(title);
    if (existingTask) {
        throw new Error(`A task with the title "${title}" already exists.`);
    }

    const tagInstances: Tag[] = [];

    for (const tagInput of tags) {
        const existingTag = await tagRepository.getTagByName(tagInput.name); 
        if (existingTag) {
            tagInstances.push(existingTag);
        } else {
            const newTag = new Tag(tagInput);
            tagInstances.push(await tagRepository.createTag(newTag)); 
        }
    }
    
    let reminderInstance: Reminder | undefined;
    if (reminder) {
        const reminderTime = new Date(reminder.reminderTime); // Convert to Date object
        if (isNaN(reminderTime.getTime())) {
            throw new Error('Invalid reminder time format.');
        }
        reminderInstance = new Reminder({
            id: reminder.id,
            reminderTime: reminderTime
        });
    }

     
    if (!user || typeof user.id !== 'number') {
        throw new Error('User  ID must be provided and must be a number.');
    }

    const userInstance = await userDb.getUserById( {id: user.id} );
    if (!userInstance) throw new Error('User  not found');

    const newTask = new Task({
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
    const task = await taskRepository.getTaskById({ id });
    if (!task) throw new Error(`Task with id ${id} does not exist.`);
    return task;
};

const getAllTasks = async (): Promise<Task[]> => {
    return taskRepository.getAllTasks();
};

const updateTask = async (updatedTaskInput: TaskInput): Promise<Task | null> => {
    if (updatedTaskInput.id === undefined) {
        throw new Error(`Task update failed. Please provide a valid id.`);
    }

    const existingTask = await taskRepository.getTaskById({id: updatedTaskInput.id});
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
    const existingTask = await taskRepository.getTaskById({id});
    if (!existingTask) {
        throw new Error(`Task with ID ${id} does not exist.`);
    }

    if (existingTask.getStatus() === 'finished') {
        throw new Error('Completed tasks cannot be deleted.');
    }

    return taskRepository.deleteTask(id);
};

const getTaskByUserId = async (UserId: number): Promise<Task[] | null> => {
    const task = await taskRepository.getTasksByUserId( UserId );
    if (!task) throw new Error(`Task with id ${UserId} does not exist.`);
    return task;
};




export default {
    createTask,
    getTaskById,
    getAllTasks,
    updateTask,
    deleteTask,
    getTaskByUserId
};
