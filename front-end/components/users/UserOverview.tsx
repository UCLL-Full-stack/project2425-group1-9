import React from 'react';
import { User } from '../../types';

type Props = {
  users: Array<User>;
  selectUser: (user: User) => void; 
};

const UserOverViewTable: React.FC<Props> = ({ users, selectUser }: Props) => {
  return (
    <>
      {users && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} onClick={() => { selectUser(user) }} role="button">
                <td>{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UserOverViewTable;
