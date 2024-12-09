// pages/signup.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';
import userService from '../../services/UserService';
import SignupForm from '../../components/users/signUpForm';  // Make sure to create the form
import Header from '../../components/header';  // Import Header
import { User } from '@/types';

const SignUpPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCreateUser = async (userInput: User) => {
    setLoading(true);
    setError(null);

    try {
      await userService.createUser(userInput);
      router.push('/login'); 
    } catch (err) {
      setError('Failed to create account. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header /> 

      <div className="bg-gray-100 min-h-screen flex justify-center items-center py-12">
        <div className="w-full max-w-md px-8 py-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account</h1>

          <SignupForm onSubmit={handleCreateUser} loading={loading} error={error} />

          <p className="mt-4 text-center text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:text-blue-700">
              Login here
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignUpPage;
