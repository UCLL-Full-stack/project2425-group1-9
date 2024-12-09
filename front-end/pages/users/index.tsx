// pages/users/index.tsx

import { useEffect, useState } from 'react';
import userService from '../../services/UserService';
import { User } from '../../types'; 
import UserTable from '../../components/users/userTable'; 
import Head from 'next/head';
import Header from '@/components/header';

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await userService.getAllUsers();
        setUsers(data);
      } catch (error) {
        setError('Failed to load users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); 

  return (
    <>
      <Head>
        <title>All Users</title>
      </Head>
      <Header />
      <main className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
        <div className="w-full max-w-6xl px-4">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">All Users</h1>

          {loading && <p className="text-center text-blue-500">Loading users...</p>}
          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}

          {!loading && !error && users?.length === 0 && (
            <p className="text-center text-gray-600">No users found.</p>
          )}

          {!loading && !error && users?.length > 0 && (
            <UserTable users={users} /> 
          )}
        </div>
      </main>
    </>
  );
};

export default UsersPage;
