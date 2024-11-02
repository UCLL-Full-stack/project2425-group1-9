import Head from 'next/head';
import Header from '@components/header';
import styles from '@styles/home.module.css';
import { useEffect, useState } from 'react';
import AddTask from '@components/Tasks/AddTask';
import TaskList from '@components/Tasks/TaskList';

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

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [addingTask, setAddingTask] = useState<boolean>(false);

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

  const handleAddTask = async (newTask: Omit<Task, 'id'>) => {
    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add task');
      }

      const addedTask = await response.json();
      setTasks(prevTasks => [...prevTasks, addedTask]);
      setAddingTask(false); // Sluit het toevoegen van de taak af
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    }
  };

  const handleCancelAdd = () => {
    setAddingTask(false); // Sluit het toevoegen van de taak af zonder deze op te slaan
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const newTask = await response.json();
      setTasks(prevTasks => 
        prevTasks.map(task => (task.id === newTask.id ? newTask : task))
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
    }
  };

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
          <>
            {addingTask ? (
              <AddTask onAdd={handleAddTask} onCancel={handleCancelAdd} tasks={tasks} />
            ) : (
              <button onClick={() => setAddingTask(true)}>Add New Task</button>
            )}
            <TaskList tasks={tasks} onUpdate={handleUpdateTask} />
            <p>
              Here you can see all your tasks. You can add, edit, or remove tasks as needed.
            </p>
          </>
        )}
      </main>
    </>
  );
};

export default Home;