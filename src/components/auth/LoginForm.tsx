import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import type { LoginFormData } from '../../types/auth';

export function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await login(formData.email, formData.password);
      navigate('/find-work');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-gray-900 
            focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none
            placeholder:text-gray-500 caret-green-500"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-bold text-gray-900 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          required
          value={formData.password}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-gray-900 
            focus:border-green-500 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 focus:outline-none
            placeholder:text-gray-500 caret-green-500"
          placeholder="Enter your password"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium 
          text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 
          focus:ring-green-500 disabled:opacity-50 transition-colors duration-200"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>
    </form>
  );
}