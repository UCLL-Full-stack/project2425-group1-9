import { Reminder } from '../model/Reminder';
import database from './database';

const createReminder = async (reminderData: Reminder): Promise<Reminder> => {
  try {
    const createdReminder = await database.reminder.create({
      data: {
        reminderTime: reminderData.reminderTime,
      },
    });
    return Reminder.from(createdReminder);
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const getReminderById = async (id: number): Promise<Reminder | null> => {
  try {
    const reminderPrisma = await database.reminder.findUnique({
      where: { id: id },
    });
    return reminderPrisma ? Reminder.from(reminderPrisma) : null;
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const getAllReminders = async (): Promise<Reminder[]> => {
  try {
    const remindersPrisma = await database.reminder.findMany();
    return remindersPrisma.map((reminderPrisma) => Reminder.from(reminderPrisma));
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const updateReminder = async (updatedReminderData: Reminder): Promise<Reminder | null> => {
  try {
    const updatedReminder = await database.reminder.update({
      where: { id: updatedReminderData.id },
      data: {
        reminderTime: updatedReminderData.reminderTime,
      },
    });
    return Reminder.from(updatedReminder);
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server log for details.');
  }
};

const deleteReminder = async (id: number): Promise<boolean> => {
  try {
    await database.reminder.delete({
      where: { id: id },
    });
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default {
  createReminder,
  getReminderById,
  getAllReminders,
  updateReminder,
  deleteReminder,
};