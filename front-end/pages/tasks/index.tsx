import Head from 'next/head';
import useSWR, { mutate } from 'swr';
import { Task } from '../../types';
import taskService from '../../services/TaskService';
import TaskTable from '../../components/tasks/taskTable';
import { useEffect, useState } from 'react';
import Header from '@/components/header';
import AddTaskForm from '../../components/tasks/taskAddForm'; // Import the form component
import EditTaskForm from '@/components/tasks/taskEditForm';

const fetchTasks = async () => {
    const tasks = await taskService.getAllTasks();
    return tasks;
};

const UserTasksPage: React.FC = () => {
    const { data: tasks, error, isLoading } = useSWR('userTasks', fetchTasks);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            mutate('userTasks');
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleFormClose = () => {
        setShowForm(false);
        mutate('userTasks'); 
    };

    const handleEditTask = (task: Task) => {
        setEditingTask(task);
    };
    

    return (
        <>
            <Head>
                <title>User Tasks</title>
            </Head>
            <Header />
            <main className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
                <div className="w-full max-w-7xl px-2">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Your Tasks</h1>
                    <div className="text-center mb-4">
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300"
                        >
                            Add Task
                        </button>
                    </div>

                    {isLoading && <p className="text-center text-blue-500">Loading tasks...</p>}
                    {error && (
                        <p className="text-center text-red-500">Failed to load tasks. Please try again.</p>
                    )}

                    {!isLoading && !error && tasks?.length === 0 && (
                        <p className="text-center text-gray-600">No tasks found for this user.</p>
                    )}

                    {!isLoading && !error && tasks?.length > 0 && (
                        <TaskTable tasks={tasks} onEdit={handleEditTask} />
                    )}
                </div>

                {showForm && <AddTaskForm onClose={handleFormClose} />}

                {editingTask && (
                <EditTaskForm task={editingTask} onClose={() => setEditingTask(null)} />)}

            </main>
        </>
    );
};

export default UserTasksPage;
