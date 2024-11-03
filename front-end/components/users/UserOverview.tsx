import React from 'react';
import { User } from '../../types';

type Props = {
  users: Array<User>;
  selectUser: (user: User) => void; 
  addTask: (userId: number) => void; 
};

const UserOverViewTable: React.FC<Props> = ({ users, selectUser, addTask }: Props) => {
  return (
    <>
      {users && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Actions</th> 
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} onClick={() => { selectUser(user) }} role="button">
                <td>{user.name}</td>
                <td>
                  <button 
                    className="btn btn-primary" 
                    onClick={(e) => {
                      e.stopPropagation();
                      addTask(user.id); 
                    }}
                  >
                    Add Task
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserOverViewTable;
