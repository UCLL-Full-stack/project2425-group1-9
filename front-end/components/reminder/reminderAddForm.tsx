import { useState } from 'react';
import { Reminder, Task } from '../../types';
import taskService from '@/services/TaskService';
import reminderService from '../../services/ReminderService'

interface ReminderFormProps {
    task: Task;
    onClose: () => void;
}

const ReminderForm: React.FC<ReminderFormProps> = ({ task, onClose }) => {
    const [reminderTime, setReminderTime] = useState<Date | null>(task.reminder ? new Date(task.reminder.reminderTime) : null);
    const [reminderMessage, setReminderMessage] = useState<string>(task.reminder ? task.reminder.reminderMessage : '');

    const handleReminderSubmit = async () => {
        if (reminderTime && reminderMessage) {
            try {
                const createdReminder: Reminder = await reminderService.createReminder({
                    reminderTime,
                    reminderMessage,
                });

                const updatedTask: Task = {
                    ...task,
                    reminder: createdReminder, 
                };

                await taskService.updateTask(updatedTask);
                
                onClose();
            } catch (error) {
                console.error('Failed to create reminder or update task:', error);
            }
        } else {
            alert('Please set both reminder time and message');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-lg">
                <h3 className="text-lg font-bold mb-4">Set Reminder for {task.title}</h3>
                <label htmlFor="reminderTime" className="block mb-2">Reminder Time:</label>
                <input
                    type="datetime-local"
                    id="reminderTime"
                    value={reminderTime ? reminderTime.toISOString().slice(0, 16) : ""}
                    onChange={(e) => setReminderTime(new Date(e.target.value))}
                    className="border border-gray-300 p-2 rounded-md mb-4"
                />
                <label htmlFor="reminderMessage" className="block mb-2">Reminder Message:</label>
                <textarea
                    id="reminderMessage"
                    value={reminderMessage}
                    onChange={(e) => setReminderMessage(e.target.value)}
                    className="border border-gray-300 p-2 rounded-md mb-4 w-full"
                    rows={4}
                    placeholder="Enter reminder message"
                />
                <div className="mt-4 flex justify-end">
                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded-md"
                        onClick={handleReminderSubmit}
                    >
                        Set Reminder
                    </button>
                    <button
                        className="ml-2 px-4 py-2 bg-gray-600 text-white rounded-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReminderForm;
