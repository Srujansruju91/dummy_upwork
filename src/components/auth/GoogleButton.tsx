import React from 'react';
import { signInWithGoogle } from '../../services/authService';

export function GoogleButton() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signInWithGoogle();
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
    >
      <img src="https://www.google.com/favicon.ico" alt="Google" className="w-4 h-4" />
      {isLoading ? 'Connecting...' : 'Continue with Google'}
    </button>
  );
}