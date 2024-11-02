// components/TaskList.tsx
import React, { useState } from 'react';
import styles from '@styles/home.module.css';
import EditTask from './EditTask';

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
  onUpdate: (updatedTask: Task) => void; // Voeg een prop toe voor de update functie
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onUpdate }) => {
  const [editingTask, setEditingTask] = useState<Task | null>(null); // State voor de bewerkte taak

  const handleEdit = (task: Task) => {
    setEditingTask(task); // Stel de taak in die bewerkt moet worden
  };

  const handleUpdate = (updatedTask: Task) => {
    onUpdate(updatedTask); // Roep de update functie aan met de bijgewerkte taak
    setEditingTask(null); // Sluit de bewerkingsmodus
  };

  const handleCancel = () => {
    setEditingTask(null); // Annuleer de bewerking
  };

  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Priority</th>
            <th>Tags</th>
            <th>Deadline</th>
            <th>Status</th>
            <th>Actions</th> {/* Voeg een kolom toe voor acties */}
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
              <td>
                <button onClick={() => handleEdit(task)}>Edit</button> {/* Bewerkknop */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTask && ( // Als er een taak bewerkt wordt, toon het bewerkingsformulier
        <EditTask
          task={editingTask}
          onUpdate={handleUpdate}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default TaskList;