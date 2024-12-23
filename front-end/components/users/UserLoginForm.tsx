// components/users/UserLoginForm.tsx

import { useState } from 'react';
import classNames from 'classnames';
import UserService from "../../services/UserService";
import { StatusMessage } from "../../types";
import { useRouter } from 'next/router';

const UserLoginForm: React.FC = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [statusMessages, setStatusMessages] = useState<StatusMessage[]>([]);
  const router = useRouter();

  const clearErrors = () => {
    setNameError(null);
    setPasswordError(null);
    setStatusMessages([]);
  };
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    clearErrors();

    

    const user = { name, password };
    try {
        const response = await UserService.loginUser(user);

        if (response.status === 200) {
            setStatusMessages([{ message: "Login successful", type: "success" }]);
            const userData = await response.json();
            localStorage.setItem("loggedInUser", JSON.stringify({
                token: userData.token,
                name: userData.name,
                role: userData.role,
            }));

            setTimeout(() => {
                router.push("/");
            }, 2000);
        } else {
            const errorData = await response.json();
            setStatusMessages([{
                message: errorData.message || "Username or password incorrect",
                type: "error",
            }]);
        }
    } catch (error) {
      if (error instanceof Error) {
        setPasswordError(error.message);  
      } else {
        setPasswordError("An unexpected error occurred.");
      }
    }
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {statusMessages.length > 0 && (
        <div className="text-center">
          {statusMessages.map((msg, index) => (
            <p
              key={index}
              className={classNames({
                "text-green-600": msg.type === "success",
                "text-red-600": msg.type === "error",
              })}
            >
              {msg.message}
            </p>
          ))}
        </div>
      )}

      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Username</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {nameError && <div className="text-red-600">{nameError}</div>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {passwordError && <div className="text-red-600">{passwordError}</div>}
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-300"
      >
        Login
      </button>
    </form>
  );
};

export default UserLoginForm;