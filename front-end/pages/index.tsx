import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { useEffect, useState } from 'react';

// Definieer het type van een taak
interface Tag {
  id: number;
  name: string;
}

interface Reminder {
  id: number;
  reminderTime: string;
  taskId: number;
}

interface Task {
  id: number;
  title: string;
  priority: string;
  deadline: string;
  status: string;
  tags: Tag[];
  reminder?: Reminder;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:3000/tasks');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return (
    <>
      <Head>
        <title>Task List</title>
        <meta name="description" content="Task management app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1>Task List</h1>

        {loading && <p>Loading tasks...</p>}
        {error && <p>Error loading tasks: {error.message}</p>}
        {!loading && !error && (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Priority</th>
                <th>Tags</th>
                <th>Deadline</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.priority}</td>
                  <td>{task.tags.map(tag => tag.name).join(', ')}</td>
                  <td>{new Date(task.deadline).toLocaleString()}</td>
                  <td>{task.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <p>
          Here you can see all your tasks. You can add, edit, or remove tasks as needed.
        </p>
      </main>
    </>
  );
};

export default TaskList;