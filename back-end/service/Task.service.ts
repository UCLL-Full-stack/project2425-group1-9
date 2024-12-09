import taskRepository from '../repository/Task.db';
import { TaskInput } from '../types'; 
import { Task } from '../model/Task';
import { User } from '../model/User';
import { Tag } from '../model/Tag';
import { Reminder } from '../model/Reminder';
import userDb from '../repository/User.db'
import tagRepository from '../repository/Tag.db'

const createTask = async ({ title, description, priority, deadline, status, tags: TagInput, user: UserInput }: TaskInput): Promise<Task> => {
    const existingTask = await taskRepository.getTaskByTitle(title);
    if (existingTask) {
        throw new Error(`A task with the title "${title}" already exists.`);
    }
        
    if (!TagInput.length) throw new Error('At least one Tag is required');
    if (!UserInput.id) throw new Error('User id is required');
        
    const user = await userDb.getUserById({ id: UserInput.id });
    if (!user) throw new Error('User not found');

    const tags = await Promise.all(
        TagInput.map(async (taginput) => {
            if (!taginput.id) throw new Error('Tag id is required');
            const tag = await tagRepository.getTagById(taginput.id);
            if (!tag) throw new Error(`Tag with id ${taginput.id} not found`);
            return tag;
        })
    );

    const newTask = new Task({
        title,
        description,
        priority,
        deadline,
        status: status || 'not finished',
        tags,
        user 
    });

    return taskRepository.createTask(newTask);
};

const getTaskById = async (id: number): Promise<Task | null> => {
    const task = await taskRepository.getTaskById({ id });
    if (!task) throw new Error(`Task with id ${id} does not exist.`);
    return task;
};

const getAllTasks = async ({
    name,
    role,
}: {
    name: string;
    role: string; 
}): Promise<Task[]> => {
    if (role === 'admin') {
        return taskRepository.getAllTasks();
    } else if (role === 'user') {
        return taskRepository.getTasksByUserName(name); 
    } else {
        throw new Error('You are not authorized to access this resource.');
    }
};
const updateTask = async (updatedTaskInput: TaskInput): Promise<Task | null> => {
    console.log('Received updateTask input:', updatedTaskInput);
    if (!updatedTaskInput.id) {
        throw new Error(`Task update failed. Please provide a valid id.`);
    }

    const existingTask = await taskRepository.getTaskById({id: updatedTaskInput.id});
    console.log('Existing task found:', existingTask);
    if (!existingTask) {
        throw new Error(`Task with ID ${updatedTaskInput.id} does not exist.`);
    }

    if (updatedTaskInput.deadline <= new Date()) {
        throw new Error('Updated task deadline must be in the future.');
    }
    
    const tagInstances = updatedTaskInput.tags.map(tagInput => new Tag(tagInput));


    const updatedTask = new Task({
        id: existingTask.id,
        title: updatedTaskInput.title,
        description: updatedTaskInput.description,
        priority: updatedTaskInput.priority,
        deadline: updatedTaskInput.deadline,
        status: updatedTaskInput.status, 
        tags: tagInstances,
        user: existingTask.getUser()
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

const getTasksByUserName = async (userName: string): Promise<Task[]> => {
    const tasks = await taskRepository.getTasksByUserName(userName);
    if (!tasks || tasks.length === 0) {
        throw new Error(`No tasks found for user: ${userName}`);
    }
    return tasks;
};




export default {
    createTask,
    getTaskById,
    getAllTasks,
    updateTask,
    deleteTask,
    getTaskByUserId,
    getTasksByUserName
};
