import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, signInWithGoogle } from '../../services/authService';
import { countries } from '../../data/countries';
import type { SignUpData } from '../../types/auth';

export function SignupForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<SignUpData>({
    email: '',
    password: '',
    confirm_password: '',
    first_name: '',
    last_name: '',
    phone_number: '',
    country: '',
    user_type: 'client'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      setError('Passwords do not match');
      return;
    }
    setIsLoading(true);
    setError('');

    try {
      await signUp(formData);
      navigate('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
      navigate('/');
    } catch (error) {
      setError('Failed to sign in with Google');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
        Continue with Google
      </button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or sign up with email</span>
        </div>
      </div>

      {/* Rest of the form fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="first_name" className="block text-sm font-bold text-gray-900">First Name</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
          />
        </div>

        <div>
          <label htmlFor="last_name" className="block text-sm font-bold text-gray-900">Last Name</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-bold text-gray-900">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-bold text-gray-900">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="confirm_password" className="block text-sm font-bold text-gray-900">Confirm Password</label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          value={formData.confirm_password}
          onChange={(e) => setFormData(prev => ({ ...prev, confirm_password: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="phone_number" className="block text-sm font-bold text-gray-900">Phone Number</label>
        <input
          type="tel"
          id="phone_number"
          name="phone_number"
          value={formData.phone_number}
          onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
        />
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-bold text-gray-900">Country</label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2"
        >
          <option value="">Select a country</option>
          {countries.map(country => (
            <option key={country.code} value={country.code}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900">I want to</label>
        <div className="mt-2 space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="user_type"
              value="client"
              checked={formData.user_type === 'client'}
              onChange={(e) => setFormData(prev => ({ ...prev, user_type: e.target.value as 'client' | 'freelancer' }))}
              className="form-radio text-green-600"
            />
            <span className="ml-2">Hire for a Project</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="user_type"
              value="freelancer"
              checked={formData.user_type === 'freelancer'}
              onChange={(e) => setFormData(prev => ({ ...prev, user_type: e.target.value as 'client' | 'freelancer' }))}
              className="form-radio text-green-600"
            />
            <span className="ml-2">Work as a Freelancer</span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
      >
        {isLoading ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}