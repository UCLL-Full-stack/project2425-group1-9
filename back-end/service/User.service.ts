import userRepository from '../repository/User.db';
import { UserInput } from '../types'; 
import { User } from '../model/User';
import { error } from 'console';

const createUser = async ({id, name, email, password, tasks}: UserInput): Promise<User> => {
    const existingUser = userRepository.findUserByName(name);
    if (existingUser) {
        throw new Error(`User creation failed. Please try a different name.`);
    }

    const newUser = new User({
        name, email, password, tasks
    });
    return userRepository.createUser(newUser);
};

const getUserById = async (id: number): Promise<User | null> => {
    return userRepository.getUserById(id);
};

const getAllUsers = async (): Promise<User[]> => {
    return userRepository.getAllUsers();
};

const updateUser = async ({id, name, email, password, tasks}: UserInput): Promise<User | null> => {
    if (id === undefined) {
        throw new Error('User ID is required for update.');
    }

    const existingUser = userRepository.getUserById(id);
    if (!existingUser) {
        throw new Error(`User with ID ${id} does not exist.`);
    }

    const updatedUser = new User({
        id, name, email, password, tasks
    }
    );
    return userRepository.updateUser(updatedUser);
};

const deleteUser = async (id: number): Promise<boolean> => {
    const existingUser = userRepository.getUserById(id);
    if (!existingUser) {
        throw new Error(`User with ID ${id} does not exist.`);
    }
    return userRepository.deleteUser(id);
};

export default {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
};
