import React, { useEffect, useState } from 'react';
import { User, Task } from '../../types';
import taskService from '../../services/TaskService';
import AddTaskForm from './AddTaskForm';

type Props = {
  user: User;
  onUpdateUser:  (updatedUser:  User) => void;
};

const UserTasks: React.FC<Props> = ({ user, onUpdateUser }: Props) => {
  const [currentUser, setCurrentUser] = useState<User>(user);

  useEffect(() => {
    setCurrentUser(user);
  }, [user]);

  const handleStatusClick = async (task: Task) => {
    const newStatus = task.status === 'finished' ? 'not finished' : 'finished';

    try {
      const updatedTask = { ...task, status: newStatus };
      const response = await taskService.updateTask(updatedTask);

      const updatedUser = {
        ...currentUser,
        tasks: currentUser.tasks.map((t) => (t.id === response.id ? response : t)),
      };

      setCurrentUser(updatedUser);
      onUpdateUser(updatedUser); 
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleTaskAdded = (newTask: Task) => {
    const updatedUser  = {
      ...currentUser ,
      tasks: [...currentUser .tasks, newTask],
    };
    setCurrentUser (updatedUser );
    onUpdateUser (updatedUser );
  };

  return (
    <>
      <h2>Tasks for {currentUser.name}</h2>
      <AddTaskForm userId={currentUser .id} onTaskAdded={handleTaskAdded} />
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">Description</th>
            <th scope="col">Priority</th>
            <th scope="col">Deadline</th>
            <th scope="col">Tags</th>
            <th scope="col">Reminder</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {currentUser.tasks.map((task: Task, index: number) => (
            <tr key={index}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.priority}</td>
              <td>{new Date(task.deadline).toLocaleDateString()}</td>
              <td>{task.tags.length > 0 ? task.tags.map((tag) => tag.name).join(', ') : 'No Tags'}</td>
              <td>
                {task.reminder ? new Date(task.reminder.reminderTime).toLocaleString() : 'No Reminder'}
              </td>
              <td
                onClick={() => handleStatusClick(task)}
                style={{ cursor: 'pointer', color: task.status === 'finished' ? 'gray' : 'blue' }}
              >
                {task.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTasks;
