import taskRepository from '../repository/Task.db';
import reminderRepository from '../repository/Reminder.db';
import { Reminder } from '../model/Reminder';

const createReminder = (reminderInput: { reminderTime: Date, taskId: number }): Reminder => {
  const task = taskRepository.getTaskById(reminderInput.taskId);
  if (!task) {
    throw new Error(`Task with ID ${reminderInput.taskId} does not exist.`);
  }

  if (reminderInput.reminderTime >= task.deadline) {
    throw new Error('Reminder time must be set before the task deadline.');
  }

  const newReminder = new Reminder(1, reminderInput.reminderTime, reminderInput.taskId);
  
  return reminderRepository.createReminder(newReminder);
};

const deleteReminder = (id: number): boolean => {
  const reminder = reminderRepository.getReminderById(id);
  if (!reminder) {
    throw new Error(`Reminder with ID ${id} does not exist.`);
  }

  return reminderRepository.deleteReminder(id);
};

export default {
  createReminder,
  deleteReminder
};
