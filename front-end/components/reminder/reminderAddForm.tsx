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
    const [error, setError] = useState<string>();

    const handleReminderSubmit = async () => {
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
            } catch (err: any) {
                setError(err.message);
            } 
    };

    return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-600 bg-opacity-50">
        <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Set Reminder for {task.title}</h3>
            {error && (
                <div className="text-red-600 mb-4">
                    {error}
                </div>
            )}

            <label htmlFor="reminderTime" className="block mb-2">Reminder Time:</label>
            <input
                type="datetime-local"
                id="reminderTime"
                value={reminderTime ? reminderTime.toISOString().slice(0, 16) : ""}
                onChange={(e) => setReminderTime(new Date(e.target.value))}
                className="border border-gray-300 p-2 rounded-md mb-4 w-full"
            />

            <label htmlFor="reminderMessage" className="block mb-2">Reminder Message:</label>
            <textarea
                id="reminderMessage"
                value={reminderMessage}
                onChange={(e) => setReminderMessage(e.target.value)}
                className="border border-gray-300 p-2 rounded-md mb-4 w-full"
                rows={4}
                placeholder="Enter reminder message"
            ></textarea>

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
