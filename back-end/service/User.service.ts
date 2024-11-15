import userRepository from '../repository/User.db';
import { UserInput } from '../types'; 
import { User } from '../model/User';
import { error } from 'console';

const createUser = async ({id, name, email, password}: UserInput): Promise<User> => {
    const existingUser = await userRepository.findUserByName(name);
    if (existingUser) {
        throw new Error(`User creation failed. Please try a different name.`);
    }

    const newUser = new User({
        id, name, email, password
    });
    return userRepository.createUser(newUser);
};

const getUserById = async (id: number): Promise<User> => {
    const user = await userRepository.getUserById( {id} );
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

const getAllUsers = async (): Promise<User[]> => {
    return userRepository.getAllUsers();
};

const updateUser = async ({id, name, email, password}: UserInput): Promise<User | null> => {
    if (id === undefined) {
        throw new Error('User ID is required for update.');
    }

    const existingUser = userRepository.getUserById({id});
    if (!existingUser) {
        throw new Error(`User with ID ${id} does not exist.`);
    }

    const updatedUser = new User({
        id, name, email, password
    }
    );
    return userRepository.updateUser(updatedUser);
};

const deleteUser = async (id: number): Promise<boolean> => {
    const existingUser = userRepository.getUserById({id});
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
