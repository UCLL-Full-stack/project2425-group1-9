import reminderRepository from '../repository/Reminder.db';
import { ReminderInput } from '../types'; 
import { Reminder } from '../model/Reminder';

const createReminder = async (reminderInput: ReminderInput): Promise<Reminder> => {
    if (reminderInput.id === undefined) {
      throw new Error(`Reminder creation failed. Please provide a valid id.`);
    }

    const newReminder = new Reminder({id: reminderInput.id, reminderTime: reminderInput.reminderTime});
    return reminderRepository.createReminder(newReminder);
};

const deleteReminder = async (id: number): Promise<boolean> => {
    const reminder =  reminderRepository.getReminderById(id);
    if (!reminder) {
        throw new Error(`Reminder with ID ${id} does not exist.`);
    }

    return reminderRepository.deleteReminder(id);
};

const getReminderById = async (id: number): Promise<Reminder> => {
    const reminder = await reminderRepository.getReminderById( id );
    if (!reminder) throw new Error(`Reminder with id ${id} does not exist.`);
    return reminder;
};


export default {
    createReminder,
    deleteReminder,
    getReminderById,
};
