import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import DashboardLayout from '../../components/dashboard/DashboardLayout';

const themes = [
  { id: 'basics', name: 'Basics', preview: 'bg-white shadow-inner border border-gray-200' },
  { id: 'carbon', name: 'Carbon', preview: 'bg-gray-900' },
  { id: 'monokai', name: 'Monokai', preview: 'bg-gradient-to-br from-[#272822] via-[#49483e] to-[#f92672] border border-[#f8f8f2]' },
  { id: 'dracula', name: 'Dracula', preview: 'bg-gradient-to-br from-[#282a36] via-[#44475a] to-[#bd93f9] border border-[#6272a4]' },
  { id: 'nord', name: 'Nord', preview: 'bg-gradient-to-br from-[#2e3440] via-[#4c566a] to-[#88c0d0] border border-[#81a1c1]' },
  { id: 'gruvbox', name: 'Gruvbox', preview: 'bg-gradient-to-br from-[#282828] via-[#504945] to-[#fabd2f] border border-[#b8bb26]' },
  { id: 'one-dark', name: 'One Dark', preview: 'bg-gradient-to-br from-[#282c34] via-[#3a3f4b] to-[#61afef] border border-[#98c379]' },
  { id: 'github-dark', name: 'GitHub Dark', preview: 'bg-gradient-to-br from-[#0d1117] via-[#161b22] to-[#238636] border border-[#30363d]' },
  { id: 'solarized-dark', name: 'Solarized Dark', preview: 'bg-gradient-to-br from-[#002b36] via-[#073642] to-[#b58900] border border-[#586e75]' },
  { id: 'christmas', name: 'Christmas', preview: 'bg-green-700' },
  { id: 'pride', name: 'Pride', preview: 'bg-gradient-to-b from-pink-500 via-yellow-400 to-green-500' },
  { id: 'winter', name: 'Winter · Live', preview: 'bg-gradient-to-b from-blue-100 to-blue-300' },
  { id: 'chameleon', name: 'Chameleon · Live', preview: 'bg-gradient-to-tr from-green-500 to-lime-400' },
  { id: 'rainy-night', name: 'Rainy Night · Live', preview: 'bg-gradient-to-b from-gray-800 via-blue-900 to-gray-800' },
];

const SettingsPage: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState('basics');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const geistSans = { className: "font-sans" };

  return (
    <DashboardLayout>
      <div className={`${geistSans.className} max-w-4xl mx-auto`} >

        {/* Theme Selection */}
        <section className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">Theme Preferences</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {themes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => setSelectedTheme(theme.id)}
                className={`flex flex-col items-center p-3 rounded-2xl border transition-all 
                  ${selectedTheme === theme.id
                    ? 'ring-2 ring-blue-500 ring-offset-2'
                    : 'hover:ring-2 hover:ring-gray-300'}
                `}
              >
                {/* Theme preview box */}
                <div
                  className={`w-full h-36 rounded-2xl mb-3 flex items-center justify-center ${theme.preview}`}
                >
                  {/* Simulated link blocks */}
                  <div className="flex flex-col gap-2 w-2/3">
                    <div className="h-4 rounded-full bg-white/80" />
                    <div className="h-4 rounded-full bg-white/80" />
                    <div className="h-4 rounded-full bg-white/80" />
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-800">{theme.name}</p>
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
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="current-password" className="block text-sm font-semibold text-gray-700">
                    Current Password
                  </label>
                  <div className="relative flex-1 mt-1">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      id="current-password"
                      placeholder="Current Password"
                      className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-16 text-black placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-0 top-0 h-full px-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                      tabIndex={-1}
                    >
                      {showCurrentPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="new-password" className="block text-sm font-semibold text-gray-700">
                    New Password
                  </label>
                  <div className="relative flex-1 mt-1">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      id="new-password"
                      placeholder="New Password"
                      className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-16 text-black placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-0 top-0 h-full px-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                      tabIndex={-1}
                    >
                      {showNewPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700">
                    Confirm New Password
                  </label>
                  <div className="relative mt-1 flex-1">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirm-password"
                      placeholder="Confirm New Password"
                      className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 pr-16 text-black placeholder-gray-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-0 top-0 h-full px-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  className="cursor-pointer rounded-full flex justify-center py-2 mt-4 px-4 border border-transparent text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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
                        className="inline-flex justify-center rounded-full cursor-pointer border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        onClick={() => setShowDeleteModal(true)}
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

      {/* Delete Account Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm w-4/5 md:w-[400px]">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Confirm Account Deletion</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete your account? This action cannot be undone.</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 cursor-pointer rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 cursor-pointer rounded-full bg-red-600 text-white hover:bg-red-700"
                onClick={() => { setShowDeleteModal(false); /* Add delete logic here */ }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default SettingsPage;
