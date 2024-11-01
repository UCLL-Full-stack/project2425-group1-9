import { Task } from '../model/Task';
import TagDb from './Tag.db';
import ReminderDb from './Reminder.db';

const tasksForJohn: Task[] = [ 
  new Task({
    id: 1,
    title: 'Complete project report',
    description: 'Finish the quarterly project report.',
    priority: 'high',
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    status: 'not finished',
    tags: [TagDb.getAllTags()[0], TagDb.getAllTags()[1]], 
    reminder: ReminderDb.getAllReminders()[0] 
  }),
  new Task({
    id: 2,
    title: 'Grocery shopping',
    description: 'Buy groceries for the week.',
    priority: 'medium',
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    status: 'not finished',
    tags: [TagDb.getAllTags()[1]], 
    reminder: ReminderDb.getAllReminders()[1] 
  }),
];

const tasksForJane: Task[] = [ 
  new Task({
    id: 3,
    title: 'Prepare for meeting',
    description: 'Prepare slides for the upcoming client meeting.',
    priority: 'high',
    deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    status: 'not finished',
    tags: [TagDb.getAllTags()[2]]
  }),
];

const tasks: Task[] = [...tasksForJohn, ...tasksForJane]; 

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
