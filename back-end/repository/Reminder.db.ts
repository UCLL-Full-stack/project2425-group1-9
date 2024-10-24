import { Reminder } from '../model/Reminder';

const reminders: Reminder[] = []; 

const createReminder = (reminder: Reminder): Reminder => {
  reminders.push(reminder);
  return reminder;
};

const getReminderById = (id: number): Reminder | null => {
  return reminders.find(reminder => reminder.id === id) || null;
};

const getAllReminders = (): Reminder[] => {
  return reminders;
};

const updateReminder = (updatedReminder: Reminder): Reminder | null => {
  const index = reminders.findIndex(reminder => reminder.id === updatedReminder.id);
  if (index > -1) {
    reminders[index] = updatedReminder;
    return updatedReminder;
  }
  return null;
};

const deleteReminder = (id: number): boolean => {
  const index = reminders.findIndex(reminder => reminder.id === id)
  
  if (index > -1) {  
    reminders.splice(index, 1);  
    return true;  
  }
  return false;  
};

export default {
  createReminder,
  getReminderById,
  getAllReminders,
  updateReminder,
  deleteReminder
};
