import React from 'react';
import { Link } from 'react-router-dom';
import { LoginForm } from '../components/auth/LoginForm';
import { Briefcase, Globe2, Users } from 'lucide-react';

export function Login() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left side - Login Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Upwork
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join the world's work marketplace
          </p>
        </div>

        <div className="mt-8">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <LoginForm />
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    New to Upwork?
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <Link
                  to="/signup"
                  className="w-full flex justify-center py-2 px-4 border-2 border-green-600 rounded-md text-sm font-medium text-green-600 hover:bg-green-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                >
                  Join as a Freelancer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image and Features */}
      <div className="hidden lg:flex lg:flex-1 bg-green-600">
        <div className="flex flex-col justify-center px-12 py-12 text-white">
          <img
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80"
            alt="Remote work"
            className="rounded-lg mb-8 object-cover h-64"
          />

          <h2 className="text-4xl font-bold mb-8">
            Connect. Create. Succeed.
          </h2>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <Globe2 className="w-8 h-8 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Global Opportunities</h3>
                <p className="text-green-100">Access projects from clients worldwide and build your international portfolio.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Briefcase className="w-8 h-8 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Flexible Work</h3>
                <p className="text-green-100">Choose projects that match your schedule and work style.</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Users className="w-8 h-8 mt-1" />
              <div>
                <h3 className="text-xl font-semibold mb-2">Trusted Network</h3>
                <p className="text-green-100">Join a community of professionals and build lasting client relationships.</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-green-700 rounded-lg">
            <blockquote className="text-lg italic text-green-100">
              "Upwork has transformed how I work, giving me the freedom to choose projects I love and clients I connect with."
            </blockquote>
            <p className="mt-4 font-semibold">Sarah M. - Web Developer</p>
          </div>
        </div>
      </div>
    </div>
  );
}