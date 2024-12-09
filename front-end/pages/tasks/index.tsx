// pages/user-tasks/index.tsx

import Head from 'next/head';
import useSWR, { mutate } from 'swr';
import { Task } from '../../types';
import taskService from '../../services/TaskService';
import TaskTable from '../../components/tasks/taskTable'; // Import the new TaskTable component
import { useEffect } from 'react';
import Header from '@/components/header';

// Fetcher function for SWR
const fetchTasks = async () => {
    const tasks = await taskService.getAllTasks();
    return tasks;
};

const UserTasksPage: React.FC = () => {
    const { data: tasks, error, isLoading } = useSWR('userTasks', fetchTasks);

    // Optional: Set up periodic re-fetching (e.g., every 1 minute)
    useEffect(() => {
        const interval = setInterval(() => {
            mutate('userTasks'); // Trigger a re-fetch
        }, 60000); // 60 seconds
        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <>
            <Head>
                <title>User Tasks</title>
            </Head>
            <Header /> 
            <main className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
                <div className="w-full max-w-6xl px-4">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">Your Tasks</h1>

                    {isLoading && <p className="text-center text-blue-500">Loading tasks...</p>}
                    {error && (
                        <p className="text-center text-red-500">Failed to load tasks. Please try again.</p>
                    )}

                    {!isLoading && !error && tasks?.length === 0 && (
                        <p className="text-center text-gray-600">No tasks found for this user.</p>
                    )}

                    {!isLoading && !error && tasks?.length > 0 && (
                        <TaskTable tasks={tasks} /> 
                    )}
                </div>
            </main>
        </>
    );
};

export default UserTasksPage;
