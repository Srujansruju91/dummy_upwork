import React from 'react';
import { Link } from 'react-router-dom';
import { SignupForm } from '../components/auth/SignupForm';
import { Globe2 } from 'lucide-react';

export function Signup() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Signup Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Join Upwork
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Start your freelancing journey today
          </p>
        </div>

        <div className="mt-8">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <SignupForm />
            
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="text-sm text-green-600 hover:text-green-500"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image and Features */}
      <div className="hidden lg:flex lg:flex-1 bg-green-600">
        <div className="flex flex-col justify-center px-12 py-12 text-white">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
            alt="Team collaboration"
            className="rounded-lg mb-8 object-cover h-64"
          />
          
          <h2 className="text-4xl font-bold mb-6">
            Join the World's Work Marketplace
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <Globe2 className="w-6 h-6 mt-1" />
              <div>
                <p className="text-lg text-green-100">
                  Connect with clients worldwide and build your professional portfolio
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-green-700 rounded-lg">
            <blockquote className="text-lg italic text-green-100">
              "Joining Upwork was the best career decision I've made. I've found amazing clients and projects that truly match my skills."
            </blockquote>
            <p className="mt-4 font-semibold">Alex K. - UX Designer</p>
          </div>
        </div>
      </div>
    </div>
  );
}