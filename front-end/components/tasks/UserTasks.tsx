import React, { useEffect, useState } from 'react';
import { User, Task } from '../../types';
import taskService from '../../services/TaskService';

type Props = {
  user: User;
};

const UserTasks: React.FC<Props> = ({ user }: Props) => {
  const [currentUser, setCurrentUser] = useState<User>(user);
  const [tasks, setTasks] = useState<Task[]>([]);


  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  
  useEffect(() => {
    const fetchTasks = async () => {
        const fetchedTasks = await taskService.getTasksByUserId(currentUser.id); 
        setTasks(fetchedTasks);
      
    };

    fetchTasks();
  }, [currentUser ]);

  return (
    <>
      <h2>Tasks for {currentUser.name}</h2>
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
          {tasks.length === 0 ? (
            <tr>
              <td colSpan={7}>No tasks found for this user.</td>
            </tr>
          ) : (
          tasks.map((task: Task, index: number) => (
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
                style={{ cursor: 'pointer', color: task.status === 'finished' ? 'gray' : 'blue' }}
              >
                {task.status}
              </td>
            </tr>
            ))
          )}
        </tbody>
      </table>
    </>
  );
};

export default UserTasks;
