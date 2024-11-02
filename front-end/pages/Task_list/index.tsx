// pages/Task_list/index.tsx
import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css'; // Je kunt deze CSS gebruiken of een nieuwe stijl maken
import { useEffect, useState } from 'react';

// Definieer het type van een taak
type Task = {
  id: number;
  title: string;
};

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch('http://localhost:5000/tasks');
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <>
      <Head>
        <title>Task List</title>
        <meta name="description" content="List of tasks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>
        <h1 className={styles.heading}>Your Task List</h1>

        <div>
          {tasks.length === 0 ? (
            <p>No tasks available.</p>
          ) : (
            tasks.map(task => (
              <div key={task.id}>
                <h2>{task.title}</h2>
              </div>
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default Tasks;