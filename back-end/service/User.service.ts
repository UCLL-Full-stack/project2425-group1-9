import userRepository from '../repository/User.db';
import { AuthenticationResponse, Role, UserInput } from '../types'; 
import { User } from '../model/User';
import bcrypt from 'bcrypt'; 
import { generateJwtToken } from '../util/jwt';

const createUser = async ({id, name, email, password, role}: UserInput): Promise<User> => {
    const existingUser = await userRepository.findUserByName(name);
    if (existingUser) {
        throw new Error(`User creation failed. Please try a different name.`);
    }
    const hashedPassword = await bcrypt.hash(password, 10); 
    if (!email) {
        throw new Error('Email is required.');
    }
    if (!role) {
        throw new Error('Email is required.');
    }

    const newUser = new User({
        id, name, email, password: hashedPassword, role
    });
    return userRepository.createUser(newUser);
};

const getUserById = async (id: number): Promise<User> => {
    const user = await userRepository.getUserById( {id} );
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

const getUserByName = async (name: string): Promise<User> => {
    const user = await userRepository.findUserByName( name );
    if (!user) throw new Error(`User with name ${name} does not exist.`);
    return user;
};


const getAllUsers = async (): Promise<User[]> => {
    return userRepository.getAllUsers();
};


const updateUser = async ({id, name, email, password, role}: UserInput): Promise<User | null> => {
    if (id === undefined) {
        throw new Error('User ID is required for update.');
    }

    const existingUser = userRepository.getUserById({id});
    if (!existingUser) {
        throw new Error(`User with ID ${id} does not exist.`);
    }
    if (!email) {
        throw new Error('Email is required.');
    }
    if (!role) {
        throw new Error('Email is required.');
    }

    const updatedUser = new User({
        id, name, email, password, role
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

const authenticate = async ({ name, password }:UserInput): Promise<AuthenticationResponse> => {
  const user = await userRepository.findUserByName(name);
  if (!user) {
    throw new Error('Invalid name or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.getPassword());
  if (!isPasswordValid) {
    throw new Error('Invalid name or password');
  }

  return {
    
    token: generateJwtToken({name, role: user.getRole()}),
    name: name,
    role: user.getRole(),
  };
};



export default {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
    authenticate,
    getUserByName
};
