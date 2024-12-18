import taskService from '../../service/Task.service';
import taskRepository from '../../repository/Task.db';
import userDb from '../../repository/User.db';
import tagRepository from '../../repository/Tag.db';
import ReminderService from '../../service/Reminder.service';
import { TaskInput } from '../../types';
import { Task } from '../../model/Task';
import { User } from '../../model/User';
import { Tag } from '../../model/Tag';
import { Reminder } from '../../model/Reminder';

const taskInput: TaskInput = {
    id: 1,
    title: 'Task Title',
    description: 'Task Description',
    priority: 'low',
    deadline: new Date('2024-12-19T10:00:00'),
    status: 'Pending',
    tags: [{ id: 1, name: 'tag1' }], 
    user: { id: 1, name: 'johndoe', email: 'john.doe@example.com', password: 'hashedPassword123', role: 'user' }, 
};

const user = new User({
    id: 1,
    name: 'johndoe',
    email: 'john.doe@example.com',
    password: 'hashedPassword123',
    role: 'user',
});

const tag = new Tag({
    id: 1,
    name: 'tag1',
});

const task = new Task({
    id: 1,
    title: 'Task Title',
    description: 'Task Description',
    priority: 'low',
    deadline: new Date('2024-12-19T10:00:00'),
    status: 'Pending',
    tags: [tag], // TagInput
    user: user, 
});

let mockCreateTask: jest.Mock;
let mockGetTaskById: jest.Mock;
let mockGetTasksByUserId: jest.Mock;
let mockGetTasksByUserName: jest.Mock;
let mockUpdateTask: jest.Mock;
let mockDeleteTask: jest.Mock;
let mockGetTaskByTitle: jest.Mock;
let mockGetUserById: jest.Mock;
let mockGetTagById: jest.Mock;

beforeEach(() => {
    mockCreateTask = jest.fn();
    mockGetTaskById = jest.fn();
    mockGetTasksByUserId = jest.fn();
    mockGetTasksByUserName = jest.fn();
    mockUpdateTask = jest.fn();
    mockDeleteTask = jest.fn();
    mockGetTaskByTitle = jest.fn();
    mockGetUserById = jest.fn();
    mockGetTagById = jest.fn();

    taskRepository.createTask = mockCreateTask;
    taskRepository.getTaskById = mockGetTaskById;
    taskRepository.getTasksByUserId = mockGetTasksByUserId;
    taskRepository.getTasksByUserName = mockGetTasksByUserName;
    taskRepository.updateTask = mockUpdateTask;
    taskRepository.deleteTask = mockDeleteTask;
    taskRepository.getTaskByTitle = mockGetTaskByTitle;
    userDb.getUserById = mockGetUserById;
    tagRepository.getTagById = mockGetTagById;
});

afterEach(() => {
    jest.clearAllMocks();
});


test('given an existing task title, when createTask is called, then an error is thrown', async () => {
    // given
    mockGetTaskByTitle.mockResolvedValue(task); 

    // when
    const createTask = async () => await taskService.createTask(taskInput);

    // then
    expect(createTask).rejects.toThrow('A task with the title "Task Title" already exists.');
});

test('given no tags, when createTask is called, then an error is thrown', async () => {
    // given
    const taskInputWithoutTags = { ...taskInput, tags: [] };

    // when
    const createTask = async () => await taskService.createTask(taskInputWithoutTags);

    // then
    expect(createTask).rejects.toThrow('At least one Tag is required');
});


test('given a valid task ID, when getTaskById is called, then the task is returned', async () => {
    // given
    mockGetTaskById.mockResolvedValue(task);

    // when
    const result = await taskService.getTaskById(1);

    // then
    expect(mockGetTaskById).toHaveBeenCalledWith({ id: 1 });
    expect(result).toEqual(task);
});

test('given an invalid task ID, when getTaskById is called, then an error is thrown', async () => {
    // given
    mockGetTaskById.mockResolvedValue(null); // Task not found

    // when
    const getTaskById = async () => await taskService.getTaskById(1);

    // then
    expect(getTaskById).rejects.toThrow('Task with id 1 does not exist.');
});

test('given valid user and role, when getAllTasks is called, then tasks are returned', async () => {
    // given
    mockGetTasksByUserName.mockResolvedValue([task]);

    // when
    const result = await taskService.getAllTasks({ name: 'johndoe', role: 'user' });

    // then
    expect(mockGetTasksByUserName).toHaveBeenCalledWith('johndoe');
    expect(result).toEqual([task]);
});

test('given an invalid role, when getAllTasks is called, then an error is thrown', async () => {
    // when
    const getAllTasks = async () => await taskService.getAllTasks({ name: 'johndoe', role: 'guest' });

    // then
    expect(getAllTasks).rejects.toThrow('You are not authorized to access this resource.');
});

test('given a valid task ID, when updateTask is called, then the task is updated', async () => {
    // given
    const updatedTaskInput = {
        id: 1,
        title: 'Updated Task Title',
        description: 'Task Description',
        priority: 'low',
        deadline: new Date('2024-12-19T10:00:00'),
        status: 'Pending',
        tags: [tag], // TagInput
        user: user,  };
    mockGetTaskById.mockResolvedValue(task); // Task exists
    mockUpdateTask.mockResolvedValue(new Task(updatedTaskInput));

    // when
    const result = await taskService.updateTask(updatedTaskInput);

    // then
    expect(mockUpdateTask).toHaveBeenCalledWith(new Task(updatedTaskInput));
    expect(result).toEqual(new Task(updatedTaskInput));
});

test('given an invalid task ID, when updateTask is called, then an error is thrown', async () => {
    // given
    const updatedTaskInput = { ...taskInput, id: 999 }; // Non-existent task ID
    mockGetTaskById.mockResolvedValue(null); // Task not found

    // when
    const updateTask = async () => await taskService.updateTask(updatedTaskInput);

    // then
    expect(updateTask).rejects.toThrow('Task with ID 999 does not exist.');
});

test('given a valid task ID, when deleteTask is called, then the task is deleted', async () => {
    // given
    mockGetTaskById.mockResolvedValue(task);
    mockDeleteTask.mockResolvedValue(true);

    // when
    const result = await taskService.deleteTask(1);

    // then
    expect(mockDeleteTask).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
});

test('given an invalid task ID, when deleteTask is called, then an error is thrown', async () => {
    // given
    mockGetTaskById.mockResolvedValue(null); // Task not found

    // when
    const deleteTask = async () => await taskService.deleteTask(1);

    // then
    expect(deleteTask).rejects.toThrow('Task with ID 1 does not exist.');
});
