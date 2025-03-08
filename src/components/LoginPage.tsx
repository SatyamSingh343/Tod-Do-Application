import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { LogIn } from 'lucide-react';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch(login({
        name,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
      }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-96">
        <div className="flex items-center justify-center mb-8">
          <LogIn className="w-12 h-12 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-center mb-6 dark:text-white">Welcome to DoIt</h1>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-md mb-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;