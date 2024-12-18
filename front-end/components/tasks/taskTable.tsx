import { useEffect, useState } from 'react';
import { Task } from '../../types';
import taskService from '@/services/TaskService';
import ReminderForm from '../reminder/reminderAddForm'; // Import the new ReminderForm component

interface TaskTableProps {
    tasks: Task[];
    onEdit: (task: Task) => void; 
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit }) => {
    const [selectedDescription, setSelectedDescription] = useState<string | null>(null);
    const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [isAdmin, setIsAdmin] = useState(false);
     
    useEffect(() => {
        const role = JSON.parse(localStorage.getItem('loggedInUser'))?.role;
        setIsAdmin(role === 'admin');
    }, []);

    const handleDescriptionClick = (description: string) => {
        setSelectedDescription(description);
    };

    const toggleTaskStatus = async (task: Task) => {
        try {
            const updatedStatus = task.status === 'done' ? 'not done' : 'done';
            const updatedTask = { ...task, status: updatedStatus };
            await taskService.updateTask(updatedTask); 
        } catch (error) {
            console.error("Failed to update task status", error);
        }
    };

    const handleDelete = async (taskId: number) => {
        try {
            await taskService.deleteTask(taskId);
            alert('User deleted successfully');
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    const handleReminderClick = (task: Task) => {
        setSelectedTask(task); 
        setIsReminderModalOpen(true); 
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-200 w-full text-left shadow-sm">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        {isAdmin && <th className="border border-gray-300 pl-2 py-2">User</th>} 
                        <th className="border border-gray-300 pl-2 py-2">Title</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Priority</th>
                        <th className="border border-gray-300 px-10 py-2">Deadline</th>
                        <th className="border border-gray-300 px-4 py-2">Tags</th>
                        <th className="border border-gray-300 px-10 py-2">Reminder</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                        <th className="border border-gray-300 px-4 py-2">Edit task</th>
                        <th className="border border-gray-300 px-4 py-2">Delete Task</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {tasks.map((task, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            {isAdmin && (
                                <td className="border border-gray-300 pl-2 py-2">
                                    {task.user?.name || 'Unknown'}
                                </td>
                            )} 
                            <td className="border border-gray-300 pl-2  py-2">{task.title}</td>
                            <td
                                className="border border-gray-300 px-4 py-2 truncate max-w-[200px] cursor-pointer"
                                title="Click to view full description"
                                onClick={() => handleDescriptionClick(task.description)}
                            >
                                {task.description}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">{task.priority}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                {new Date(task.deadline).toLocaleDateString()}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                {task.tags.length > 0
                                    ? task.tags.map(tag => tag.name).join(', ')
                                    : 'No Tags'}
                            </td>
                            <td
                                className="border border-gray-300 px-4 py-2 cursor-pointer text-blue-600"
                                onClick={() => handleReminderClick(task)} 
                            >
                                {task.reminder
                                    ? new Date(task.reminder.reminderTime).toLocaleString()
                                    : 'No Reminder'}
                            </td>
                            <td
                                className="border border-gray-300 px-4 py-2 cursor-pointer text-black-600"
                                onClick={() => toggleTaskStatus(task)} 
                            >
                                {task.status }
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="px-3 py-1 bg-blue-600 text-white rounded-md" onClick={() => onEdit(task)}>Edit</button>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button className="px-3 py-1 bg-red-600 text-white rounded-md" onClick={() => handleDelete(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isReminderModalOpen && selectedTask && (
                <ReminderForm task={selectedTask} onClose={() => setIsReminderModalOpen(false)} />
            )}

            {selectedDescription && (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-md shadow-sm">
                    <h3 className="text-lg font-bold mb-2">Full Description</h3>
                    <p className="text-gray-800">{selectedDescription}</p>
                    <button
                        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md"
                        onClick={() => setSelectedDescription(null)}
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default TaskTable;
