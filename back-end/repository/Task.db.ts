import { Task } from '../model/Task';
import TagDb from './Tag.db';
import ReminderDb from './Reminder.db';
import database from './database';



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

const getAllTasks = async (): Promise<Task[]> => {
  const taskPrisma = await database.task.findMany({
            include: {tags: true, reminder: true, user: true}
        })
        return taskPrisma.map((taskPrisma) => Task.from(taskPrisma));
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
