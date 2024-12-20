import { useState, useEffect } from 'react';
import Head from 'next/head';
import useSWR, { mutate } from 'swr';
import { Task } from '../../types';
import taskService from '../../services/TaskService';
import TaskTable from '../../components/tasks/taskTable';
import AddTaskForm from '../../components/tasks/taskAddForm';
import EditTaskForm from '@/components/tasks/taskEditForm';
import Header from '@/components/header';
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations"; 


const fetchTasks = async () => {
    const tasks = await taskService.getAllTasks();
    return tasks;
};

const UserTasksPage: React.FC = () => {
    const [userRole, setUserRole] = useState<string | null>(null); 
    const { data: tasks, error, isLoading } = useSWR('userTasks', fetchTasks);
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [filter, setFilter] = useState({
        deadline: '', 
        status: '', 
        priority: '',
    });

    useEffect(() => {

        const role = JSON.parse(localStorage.getItem('loggedInUser'))?.role;
        setUserRole(role)

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

    const filteredTasks = tasks?.filter(task => {
    const taskDeadline = new Date(task.deadline).toISOString().split('T')[0]; 
    const matchesDeadline = !filter.deadline || taskDeadline === filter.deadline;
    const matchesStatus = !filter.status || task.status === filter.status;
    const matchesPriority = !filter.priority || task.priority === filter.priority;

    return matchesDeadline && matchesStatus && matchesPriority;
});


    return (
        <>
            <Head>
                <title>User Tasks</title>
            </Head>
            <Header />
            <main className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
                <div className="w-full max-w-7xl px-2">
                    <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
                        {userRole === 'admin' ? 'All Users Tasks' : userRole === 'user' ? 'Your Tasks' : userRole === 'tester' ? 'Your Tasks': 'Unauthorized'}
                    </h1>
                    
                    <div className="flex justify-center space-x-4 mb-6">
                        {userRole && (userRole === 'admin' || userRole === 'user' || userRole === 'tester') && (
                            <>
                                <div>
                                    <label className="block font-medium text-gray-700 mb-1">Filter by Deadline</label>
                                    <input
                                        type="date"
                                        value={filter.deadline}
                                        onChange={(e) => setFilter({ ...filter, deadline: e.target.value })}
                                        className="border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700 mb-1">Filter by Status</label>
                                    <select
                                        value={filter.status}
                                        onChange={(e) => setFilter({ ...filter, status: e.target.value })}
                                        className="border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="">All</option>
                                        <option value="done">Done</option>
                                        <option value="not done">Not Done</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block font-medium text-gray-700 mb-1">Filter by Priority</label>
                                    <select
                                        value={filter.priority}
                                        onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
                                        className="border border-gray-300 rounded-md p-2"
                                    >
                                        <option value="">All</option>
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                    </select>
                                </div>
                            </>
                        )}
                    </div>

                    {userRole && (userRole === 'admin' || userRole === 'user' ) && (
                        <div className="text-center mb-4">
                            <button
                                onClick={() => setShowForm(true)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300"
                            >
                                Add Task
                            </button>
                        </div>
                    )}


                    {isLoading && <p className="text-center text-blue-500">Loading tasks...</p>}
                    {error && (
                        <p className="text-center text-red-500">You are not authorized to view this page. Please log in.</p>
                    )}

                    {!isLoading && !error && filteredTasks?.length === 0 && (
                        <p className="text-center text-gray-600">No tasks match your filters.</p>
                    )}

                    {!isLoading && !error && filteredTasks?.length > 0 && (
                        <TaskTable tasks={filteredTasks} onEdit={handleEditTask} />
                    )}
                </div>

                {showForm && <AddTaskForm onClose={handleFormClose} />}
                {editingTask && (
                    <EditTaskForm task={editingTask} onClose={() => setEditingTask(null)} />
                )}
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default UserTasksPage;
