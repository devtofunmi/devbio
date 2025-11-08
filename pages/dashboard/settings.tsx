import React, { useState } from 'react';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const themes = [
  {
    id: 'light',
    name: 'Light',
    preview: 'bg-white border-2 border-gray-200',
    description: 'Clean and bright for daytime use'
  },
  {
    id: 'dark',
    name: 'Dark',
    preview: 'bg-gray-900 border-2 border-gray-700',
    description: 'Easy on the eyes in low-light conditions'
  },
  {
    id: 'system',
    name: 'System',
    preview: 'bg-gradient-to-r from-white to-gray-900 border-2 border-gray-400',
    description: 'Automatically matches your system preferences'
  },
  {
    id: 'midnight',
    name: 'Midnight Blue',
    preview: 'bg-gradient-to-r from-blue-900 to-indigo-900 border-2 border-blue-700',
    description: 'Deep blue theme for night owls'
  },
  {
    id: 'sepia',
    name: 'Sepia',
    preview: 'bg-amber-50 border-2 border-amber-200',
    description: 'Warm, paper-like appearance'
  },
  {
    id: 'forest',
    name: 'Forest',
    preview: 'bg-gradient-to-r from-green-800 to-emerald-900 border-2 border-green-700',
    description: 'Nature-inspired dark green theme'
  },
  {
    id: 'lavender',
    name: 'Lavender',
    preview: 'bg-gradient-to-r from-purple-100 to-purple-200 border-2 border-purple-300',
    description: 'Soft, calming purple tones'
  },
  {
    id: 'nord',
    name: 'Nord',
    preview: 'bg-gradient-to-r from-slate-800 to-slate-900 border-2 border-slate-700',
    description: 'Arctic-inspired cool colors'
  },
  {
    id: 'sunset',
    name: 'Sunset',
    preview: 'bg-gradient-to-r from-orange-400 to-pink-500 border-2 border-orange-500',
    description: 'Warm, vibrant sunset colors'
  }
];

const SettingsPage: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState('system');

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        
        {/* Theme Selection */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Theme Preferences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`p-4 rounded-lg transition-all ${
                  selectedTheme === theme.id
                    ? 'ring-2 ring-blue-500 ring-offset-2'
                    : 'hover:bg-gray-50'
                }`}
              >
                <div className={`h-24 rounded-md mb-3 ${theme.preview}`} />
                <div className="text-left">
                  <h3 className="font-medium text-gray-900">{theme.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{theme.description}</p>
                </div>
              </button>
            ))}
          </div>
        </section>



        {/* Account Settings */}
        <section className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Account Settings</h2>
          <div className="space-y-6">
            {/* Change Password */}
            <div className="pb-6 border-b border-gray-200">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="current-password"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="new-password"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-full border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Update Password
                </button>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="pt-4">
              <h3 className="text-sm font-medium text-red-600 mb-4">Danger Zone</h3>
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Delete Account</h3>
                    <div className="mt-2">
                      <p className="text-sm text-red-700">
                        Once you delete your account, there is no going back. Please be certain.
                      </p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
