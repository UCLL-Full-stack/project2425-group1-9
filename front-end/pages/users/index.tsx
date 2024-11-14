import Head from 'next/head';
import Header from '../../components/header';
import { useState, useEffect } from 'react';
import { User } from '../../types'; 
import userService from '../../services/UserService';
import UserOverViewTable from '../../components/users/UserOverview'; 
import UserTasks from '@/components/tasks/UserTasks';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setSelectedUser(updatedUser); // Update the currently selected user
  };

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center bg-white">
        <h1>Users</h1>
        <section>
          <h2>Users overview</h2>
          <UserOverViewTable users={users} selectUser={setSelectedUser} />
          {selectedUser && (
            <UserTasks user={selectedUser} onUpdateUser={handleUpdateUser} />
          )}
        </section>
      </main>
    </>
  );
};

export default Users;

