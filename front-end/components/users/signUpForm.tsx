// components/SignupForm.tsx

import { useState } from 'react';
import { User } from '../../types';

interface SignupFormProps {
  onSubmit: (userInput: User) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit, loading, error }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTester, setIsTester] = useState(false); 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }
        
    const role = isTester ? 'tester' : 'user';

    const userInput: User = { name, email, password, role};
    onSubmit(userInput);
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
        <input
          type="text"
          id="name"
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
        <input
          type="text"
          id="email"
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          id="password"
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          className="w-full mt-1 p-2 border border-gray-300 rounded-lg"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="tester" className="block text-sm font-medium text-gray-700">Register as Tester</label>
        <input
          type="checkbox"
          id="tester"
          className="mt-1"
          checked={isTester}
          onChange={(e) => setIsTester(e.target.checked)}
        />
        <span className="ml-2 text-sm text-gray-600">Check this box if you want to register as a tester</span>
      </div>

      <button
        type="submit"
        className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
};

export default SignupForm;
