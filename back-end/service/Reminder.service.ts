import taskRepository from '../repository/Task.db';
import reminderRepository from '../repository/Reminder.db';
import { ReminderInput } from '../types'; 
import { Reminder } from '../model/Reminder';

const createReminder = async (reminderInput: ReminderInput): Promise<Reminder> => {
    const task =  taskRepository.getTaskById(reminderInput.taskId);
    if (!task) {
      throw new Error('Task not found');
    }

    if (reminderInput.reminderTime >= task.deadline) {
        throw new Error('Reminder time must be set before the task deadline.');
    }

    if (reminderInput.id === undefined) {
      throw new Error(`Reminder creation failed. Please provide a valid id.`);
    }

    const newReminder = new Reminder(reminderInput.id, reminderInput.reminderTime, reminderInput.taskId);
    return reminderRepository.createReminder(newReminder);
};

const deleteReminder = async (id: number): Promise<boolean> => {
    const reminder =  reminderRepository.getReminderById(id);
    if (!reminder) {
        throw new Error(`Reminder with ID ${id} does not exist.`);
    }

    return reminderRepository.deleteReminder(id);
};

export default {
    createReminder,
    deleteReminder
};
