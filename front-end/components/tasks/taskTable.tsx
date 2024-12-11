import { useState } from 'react';
import { Task } from '../../types';
import taskService from '@/services/TaskService';

interface TaskTableProps {
    tasks: Task[];
    onEdit: (task: Task) => void; 
    setTasks: (tasks: Task[]) => void; 
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks, onEdit, setTasks }) => {
    const [selectedDescription, setSelectedDescription] = useState<string | null>(null);

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
        console.log(typeof setTasks);
        try {
            await taskService.deleteTask(taskId);
            setTasks(tasks.filter(task => task.id !== taskId));
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-200 w-full text-left shadow-sm">
                <thead className="bg-gray-800 text-white">
                    <tr>
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
                            <td className="border border-gray-300 px-4 py-2">
                                {task.reminder
                                    ? new Date(task.reminder.reminderTime).toLocaleString()
                                    : 'No Reminder'}
                            </td>
                            <td
                                className="border border-gray-300 px-4 py-2 cursor-pointer text-blue-600"
                                onClick={() => toggleTaskStatus(task)} 
                            >
                                {task.status }
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button onClick={() => onEdit(task)}>Edit</button>
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button onClick={() => handleDelete(task.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;