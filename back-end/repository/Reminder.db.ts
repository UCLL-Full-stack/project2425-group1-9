import { Reminder } from '../model/Reminder';

const reminders: Reminder[] = [
  new Reminder({ id: 1, reminderTime: new Date(Date.now() + 24 * 60 * 60 * 1000), taskId: 1}),
  new Reminder({ id: 2, reminderTime: new Date(Date.now() + 48 * 60 * 60 * 1000), taskId: 2})
]; 

const createReminder = (reminder: Reminder): Reminder => {
  reminders.push(reminder);
  return reminder;
};

const getReminderById = (id: number): Reminder | null => {
  return reminders.find(reminder => reminder.getId() === id) || null;
};

const getAllReminders = (): Reminder[] => {
  return reminders;
};

const updateReminder = (updatedReminder: Reminder): Reminder | null => {
  const index = reminders.findIndex(reminder => reminder.getId() === updatedReminder.getId());
  if (index > -1) {
    reminders[index] = updatedReminder;
    return updatedReminder;
  }
  return null;
};

const deleteReminder = (id: number): boolean => {
  const index = reminders.findIndex(reminder => reminder.getId() === id)
  
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
