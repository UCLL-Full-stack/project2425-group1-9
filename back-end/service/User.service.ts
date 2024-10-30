import userRepository from '../repository/User.db';
import { UserInput } from '../types'; 
import { User } from '../model/User';
import { error } from 'console';

const createUser = async (userInput: UserInput): Promise<User> => {
    const existingUser = userRepository.findUserByName(userInput.name);
    if (existingUser) {
        throw new Error(`User creation failed. Please try a different name.`);
    }

    if (userInput.id === undefined) {
      throw new Error(`User creation failed. Please provide a valid id.`);
    }

    const newUser = new User(
        userInput.id,
        userInput.name,
        userInput.email,
        userInput.password,
        userInput.tasks
    );
    return userRepository.createUser(newUser);
};

const getUserById = async (id: number): Promise<User | null> => {
    return userRepository.getUserById(id);
};

const getAllUsers = async (): Promise<User[]> => {
    return userRepository.getAllUsers();
};

const updateUser = async (updatedUserInput: UserInput): Promise<User | null> => {
    if (updatedUserInput.id === undefined) {
        throw new Error('User ID is required for update.');
    }

    const existingUser = userRepository.getUserById(updatedUserInput.id);
    if (!existingUser) {
        throw new Error(`User with ID ${updatedUserInput.id} does not exist.`);
    }

    const updatedUser = new User(
        updatedUserInput.id,
        updatedUserInput.name,
        updatedUserInput.email,
        updatedUserInput.password,
        existingUser.tasks
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
