import { Task } from '../../types';

interface TaskTableProps {
    tasks: Task[];
}

const TaskTable: React.FC<TaskTableProps> = ({ tasks }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-200 w-full text-left shadow-sm">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Title</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                        <th className="border border-gray-300 px-4 py-2">Priority</th>
                        <th className="border border-gray-300 px-4 py-2">Deadline</th>
                        <th className="border border-gray-300 px-4 py-2">Tags</th>
                        <th className="border border-gray-300 px-4 py-2">Reminder</th>
                        <th className="border border-gray-300 px-4 py-2">Status</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {tasks.map((task, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{task.title}</td>
                            <td className="border border-gray-300 px-4 py-2">{task.description}</td>
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
                            <td className="border border-gray-300 px-4 py-2">{task.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TaskTable;
