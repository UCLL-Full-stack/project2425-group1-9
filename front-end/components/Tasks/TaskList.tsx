// components/TaskList.tsx
import React from 'react';
import styles from '@styles/home.module.css';

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

interface TaskListProps {
  tasks: Task[];
}

const TaskList: React.FC<TaskListProps> = ({ tasks }) => {
  return (
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
  );
};

export default TaskList;