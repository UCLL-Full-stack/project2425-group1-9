import { Task } from '../model/Task';
import database from '../util/database';

const createTask = async ({title, description, priority, deadline, status, tags, reminder, user }: Task): Promise<Task> => {
  try {
    const createdTask = await database.task.create({
      data: {
        title,
        description,
        priority,
        deadline,
        status,
        tags: {
          connect: tags.map((tag) => ({ id: tag.id })),
        },
        ...(reminder ? { reminder: { connect: { id: reminder.id } } } : {}), 
        user: {
          connect: { id: user.id },
        },           
  },
  include: {
    tags: true,
    reminder: true,
    user: true,
  }, 
});
    return Task.from(createdTask);
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const getTaskById = async ({id}: {id:number}): Promise<Task | null> => {
  try {
    const taskPrisma = await database.task.findUnique({
      where: { id: id },
      include: { tags: true, reminder: true, user: true },
    });
    return taskPrisma ? Task.from(taskPrisma) : null;
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const getTaskByTitle = async (title: string): Promise<Task | null> => {
  try {
    const taskPrisma = await database.task.findFirst({
      where: { title: title },
      include: { tags: true, reminder: true, user: true },
    });
    return taskPrisma ? Task.from(taskPrisma) : null;
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const getAllTasks = async (): Promise<Task[]> => {
  try {
    const taskPrisma = await database.task.findMany({
      include: { tags: true, reminder: true, user: true },
    });
    console.log('Retrieved tasks from database:', taskPrisma); 
    return taskPrisma.map((taskPrisma) => Task.from(taskPrisma));
  } catch (error) {
    console.error(error);
    console.error('Error retrieving tasks:', error);
    throw new Error('Database error. See server log for details.');
  }
};

const updateTask = async ({id, title, description, priority, deadline, status, tags, reminder, user}: Task): Promise<Task | null> => {
  try {
    const taskPrisma = await database.task.update({
      where: { id: id },
      data: {
        title,
        description,
        priority,
        deadline,
        status,
        tags: {
          connect: tags.map((tag) => ({ id: tag.id })),
        },
        ...(reminder ? { reminder: { connect: { id: reminder.id } } } : {}),
        user: {
          connect: { id: user.id },
        },
      },
      include: {
        tags: true,
        reminder: true,
        user: true,
      },
    });
    return Task.from(taskPrisma);
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const deleteTask = async (id: number): Promise<boolean> => {
  try {
    await database.task.delete({
      where: { id: id },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const getTasksByUserId = async (userId: number): Promise<Task[]> => {
  try {
    const tasksPrisma = await database.task.findMany({
      where: { userId: userId },
      include: { tags: true, reminder: true, user: true },
    });
    return tasksPrisma.map((taskPrisma) => Task.from(taskPrisma));
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

export default {
  createTask,
  getTaskById,
  getAllTasks,
  updateTask,
  deleteTask,
  getTaskByTitle,
  getTasksByUserId
};