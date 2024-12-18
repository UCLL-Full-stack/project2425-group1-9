import userService from '@/services/UserService';
import { User } from '../../types';

interface UserTableProps {
    users: User[];
    isAdmin: boolean; 
}

const UserTable: React.FC<UserTableProps> = ({ users , isAdmin}) => {
    const handleDelete = async (userId: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await userService.deleteUser(userId);
                alert('User deleted successfully');
                window.location.reload(); 
            } catch (error) {
                alert('Failed to delete user');
            }
        }
    };



    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-200 w-full text-left shadow-sm">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                        {isAdmin && (
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        )}
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                            {isAdmin && (
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Delete
                                    </button>
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
