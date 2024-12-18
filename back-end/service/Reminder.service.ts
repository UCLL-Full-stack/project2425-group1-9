import reminderRepository from '../repository/Reminder.db';
import { ReminderInput } from '../types'; 
import { Reminder } from '../model/Reminder';
import cron from 'node-cron';
import taskRepository from '../repository/Task.db'; 
import sendReminderEmail from '../service/EmailService'; 
import userRepository from '../repository/User.db'



const createReminder = async (reminderInput: ReminderInput): Promise<Reminder> => {
    const newReminder = new Reminder({id: reminderInput.id, reminderTime: reminderInput.reminderTime, reminderMessage: reminderInput.reminderMessage});
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


cron.schedule('* * * * *', async () => {
    const now = new Date();
    const reminders = await reminderRepository.getAllReminders(); 

    for (const reminder of reminders) {
        if (reminder.id !== undefined) {
            if (reminder.reminderTime <= now && !reminder.sent) { 
                const task = await taskRepository.getTaskByReminderId(reminder.id);

                if (task) {
                    const userId = task.user?.getId(); 

                    if (userId !== undefined) { 
                        const user = await userRepository.getUserById({ id: userId }); 

                        if (user) {
                            console.log(user.email, reminder.reminderMessage)
                            await sendReminderEmail(user.email, 'Reminder', reminder.reminderMessage); 
                            reminder.sent = true; 
                            await reminderRepository.updateReminder(reminder);
                        }
                    } 
                } 
            }
        }
    }
});


export default {
    createReminder,
    deleteReminder,
    getReminderById,
};
