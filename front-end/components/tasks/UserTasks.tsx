import React from 'react';
import { User, Task } from '../../types';

type Props = {
  user: User;
};

const UserTasks: React.FC<Props> = ({ user }: Props) => {
  return (
    <>
      <h2>Tasks for {user.name}</h2>
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
          {user.tasks.map((task: Task, index: number) => (
            <tr key={index}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.priority}</td>
              <td>{new Date(task.deadline).toLocaleDateString()}</td> 
              <td>{task.tags.length > 0 ? task.tags.map(tag => tag.name).join(', ') : 'No Tags'}</td>
              <td>
                {task.reminder ? new Date(task.reminder.reminderTime).toLocaleString() : 'No Reminder'}
              </td>
              <td>{task.status}</td>

            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTasks;
