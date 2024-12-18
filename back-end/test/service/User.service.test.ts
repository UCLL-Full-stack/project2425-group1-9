import { User } from '../../model/User';
import userRepository from '../../repository/User.db';
import taskRepository from '../../repository/Task.db';
import userService from '../../service/User.service';
import bcrypt from 'bcrypt';
import { UserInput } from '../../types';

const userInput: UserInput = {
    id: 1,
    name: 'johndoe',
    email: 'john.doe@example.com',
    password: 'securePassword123',
    role: 'user',
};

const user = new User({
    ...userInput,
    password: 'hashedPassword123', 
});

let mockFindUserByName: jest.Mock;
let mockCreateUser: jest.Mock;
let mockGetUserById: jest.Mock;
let mockDeleteUser: jest.Mock;
let mockGetTasksByUserId: jest.Mock;
let mockHash: jest.Mock;

beforeEach(() => {
    mockFindUserByName = jest.fn();
    mockCreateUser = jest.fn();
    mockGetUserById = jest.fn();
    mockDeleteUser = jest.fn();
    mockGetTasksByUserId = jest.fn();
    mockHash = jest.fn();

    userRepository.findUserByName = mockFindUserByName;
    userRepository.createUser = mockCreateUser;
    userRepository.getUserById = mockGetUserById;
    userRepository.deleteUser = mockDeleteUser;
    taskRepository.getTasksByUserId = mockGetTasksByUserId;
    bcrypt.hash = mockHash;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given valid user data, when createUser is called, then a new user is created', async () => {
    // given
    mockFindUserByName.mockResolvedValue(null); 
    mockHash.mockResolvedValue('hashedPassword123'); 
    mockCreateUser.mockResolvedValue(user);

    // when
    const result = await userService.createUser(userInput);

    // then
    expect(mockFindUserByName).toHaveBeenCalledWith('johndoe');
    expect(mockHash).toHaveBeenCalledWith('securePassword123', 10);
    expect(mockCreateUser).toHaveBeenCalledWith(
        new User({
            id: 1,
            name: 'johndoe',
            email: 'john.doe@example.com',
            password: 'hashedPassword123',
            role: 'user',
        })
    );
    expect(result).toEqual(user);
});

test('given an existing user, when createUser is called, then an error is thrown', async () => {
    // given
    mockFindUserByName.mockResolvedValue(user); 

    // when
    const createUser = async () => await userService.createUser(userInput);

    // then
    expect(createUser).rejects.toThrow('User creation failed. Please try a different name.');
});

test('given a valid user ID, when getUserById is called, then the user is returned', async () => {
    // given
    mockGetUserById.mockResolvedValue(user);

    // when
    const result = await userService.getUserById(1);

    // then
    expect(mockGetUserById).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(user);
});

test('given an invalid user ID, when getUserById is called, then an error is thrown', async () => {
    // given
    mockGetUserById.mockResolvedValue(null);

    // when
    const getUserById = async () => await userService.getUserById(1);

    // then
    expect(getUserById).rejects.toThrow('User with id 1 does not exist.');
});


test('given a non-existent user, when deleteUser is called, then an error is thrown', async () => {
    // given
    mockGetUserById.mockResolvedValue(null);

    // when
    const deleteUser = async () => await userService.deleteUser(1);

    // then
    expect(deleteUser).rejects.toThrow('User with ID 1 does not exist.');
});
