// components/UserTable.tsx

import { User } from '../../types';

interface UserTableProps {
    users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ users }) => {
    return (
        <div className="overflow-x-auto">
            <table className="table-auto border-collapse border border-gray-200 w-full text-left shadow-sm">
                <thead className="bg-gray-800 text-white">
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Email</th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-2">{user.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{user.email}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
