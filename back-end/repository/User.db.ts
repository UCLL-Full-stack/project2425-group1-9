import { User } from '../model/User';
import database from './database';

const createUser  = async ({ name, email, password }: User): Promise<User> => {
  try {
    const createdUser  = await database.user.create({
      data: {
        name,
        email,
        password,
      },
    });
    return User.from(createdUser );
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const getUserById = async ({id}: {id: number}): Promise<User | null> => {
  try {
    const userPrisma = await database.user.findUnique({
      where: { id: id },
      include: { tasks: true }, 
    });
    return userPrisma ? User.from(userPrisma) : null;
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const getAllUsers = async (): Promise<User[]> => {
  try {
    const usersPrisma = await database.user.findMany({
      include: { tasks: true }, 
    });
    return usersPrisma.map((userPrisma) => User.from(userPrisma));
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const updateUser  = async ({ id, name, email, password }: User): Promise<User | null> => {
  try {
    const userPrisma = await database.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
      },
    });
    return User.from(userPrisma);
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const deleteUser  = async (id: number): Promise<boolean> => {
  try {
    await database.user.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

const findUserByName = async (name: string): Promise<User | null> => {
  try {
    const userPrisma = await database.user.findFirst({
      where: { name },
    });
    return userPrisma ? User.from(userPrisma) : null;
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const findUserByEmail = async (email: string): Promise<User | null> => {
  try {
    const userPrisma = await database.user.findFirst({
      where: { email },
    });
    return userPrisma ? User.from(userPrisma) : null;
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

export default {
  createUser ,
  getUserById,
  getAllUsers,
  updateUser ,
  deleteUser ,
  findUserByName,
  findUserByEmail,
};