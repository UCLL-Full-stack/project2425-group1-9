import reminderService from '../../service/Reminder.service';
import reminderRepository from '../../repository/Reminder.db';
import { ReminderInput } from '../../types';
import { Reminder } from '../../model/Reminder';
import cron from 'node-cron';
import taskRepository from '../../repository/Task.db'; 
import sendReminderEmail from '../../service/EmailService'; 
import userRepository from '../../repository/User.db';

const reminderInput: ReminderInput = {
    id: 1,
    reminderTime: new Date('2024-12-19T10:00:00'),
    reminderMessage: 'Reminder message',
};

const reminder = new Reminder({
    ...reminderInput,
});

let mockCreateReminder: jest.Mock;
let mockGetReminderById: jest.Mock;
let mockDeleteReminder: jest.Mock;
let mockGetReminderByIdRepo: jest.Mock;

beforeEach(() => {
    mockCreateReminder = jest.fn();
    mockGetReminderById = jest.fn();
    mockDeleteReminder = jest.fn();
    mockGetReminderByIdRepo = jest.fn();

    reminderRepository.createReminder = mockCreateReminder;
    reminderRepository.getReminderById = mockGetReminderByIdRepo;
    reminderRepository.deleteReminder = mockDeleteReminder;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given valid reminder data, when createReminder is called, then a new reminder is created', async () => {
    // given
    mockCreateReminder.mockResolvedValue(reminder);

    // when
    const result = await reminderService.createReminder(reminderInput);

    // then
    expect(mockCreateReminder).toHaveBeenCalledWith(new Reminder({
        id: 1,
        reminderTime: new Date('2024-12-19T10:00:00'),
        reminderMessage: 'Reminder message',
    }));
    expect(result).toEqual(reminder);
});

test('given a valid reminder ID, when getReminderById is called, then the reminder is returned', async () => {
    // given
    mockGetReminderByIdRepo.mockResolvedValue(reminder);

    // when
    const result = await reminderService.getReminderById(1);

    // then
    expect(mockGetReminderByIdRepo).toHaveBeenCalledWith(1);
    expect(result).toEqual(reminder);
});

test('given an invalid reminder ID, when getReminderById is called, then an error is thrown', async () => {
    // given
    mockGetReminderByIdRepo.mockResolvedValue(null); 

    // when
    const getReminderById = async () => await reminderService.getReminderById(2);

    // then
    expect(getReminderById).rejects.toThrow('Reminder with id 2 does not exist.');
});

test('given a valid reminder, when deleteReminder is called, then the reminder is deleted', async () => {
    // given
    mockGetReminderByIdRepo.mockResolvedValue(reminder); 
    mockDeleteReminder.mockResolvedValue(true);

    // when
    const result = await reminderService.deleteReminder(1);

    // then
    expect(mockDeleteReminder).toHaveBeenCalledWith(1);
    expect(result).toBe(true);
});
