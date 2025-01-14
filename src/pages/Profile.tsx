import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { countries } from '../data/countries';
import { updateProfile } from '../services/profileService';
import { Upload } from 'lucide-react';

export function Profile() {
  const { user, refreshUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone_number: user?.phone_number || '',
    country: user?.country || '',
    title: user?.title || '',
    bio: user?.bio || '',
    resume_url: user?.resume_url || ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateProfile(formData);
      await refreshUser();
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('resume', file);
      // Upload logic will be implemented in profileService
      const resumeUrl = await uploadResume(formData);
      setFormData(prev => ({ ...prev, resume_url: resumeUrl }));
    } catch (error) {
      console.error('Failed to upload resume:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Profile</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                  <input
                    type="text"
                    value={formData.first_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                  <input
                    type="text"
                    value={formData.last_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    disabled
                    className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  >
                    {countries.map(country => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
                {user?.user_type === 'freelancer' && (
                  <>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Professional Title</label>
                      <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                        placeholder="e.g., Senior Full Stack Developer"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                        rows={4}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Resume</label>
                      <div className="mt-1 flex items-center">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileUpload}
                          className="hidden"
                          id="resume-upload"
                        />
                        <label
                          htmlFor="resume-upload"
                          className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Upload className="h-5 w-5 mr-2" />
                          Upload Resume
                        </label>
                        {formData.resume_url && (
                          <span className="ml-4 text-sm text-gray-500">
                            Current resume: {formData.resume_url.split('/').pop()}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Name</h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {user?.first_name} {user?.last_name}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{user?.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Phone</h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{user?.phone_number}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Country</h3>
                  <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                    {countries.find(c => c.code === user?.country)?.name}
                  </p>
                </div>
                {user?.user_type === 'freelancer' && (
                  <>
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Professional Title</h3>
                      <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{user?.title || 'Not set'}</p>
                    </div>
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Bio</h3>
                      <p className="mt-1 text-sm text-gray-900 dark:text-gray-100">{user?.bio || 'No bio provided'}</p>
                    </div>
                    <div className="col-span-2">
                      <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Resume</h3>
                      {user?.resume_url ? (
                        <a
                          href={user.resume_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 text-sm text-green-600 hover:text-green-700"
                        >
                          View Resume
                        </a>
                      ) : (
                        <p className="mt-1 text-sm text-gray-500">No resume uploaded</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}