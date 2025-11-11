import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import DeleteAccountModal from './DeleteAccountModal';

const AccountSettings = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteConfirm = () => {
        console.log('Account deletion confirmed');
    };

    return (
        <section className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="space-y-6">
                {/* Change Password */}
                <div className="pb-6 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700 mb-4">Change Password</h3>
                    <div className="space-y-4">
                        

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
                                <svg
                                    className="h-5 w-5 text-red-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
                                        clipRule="evenodd"
                                    />
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
            <DeleteAccountModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={handleDeleteConfirm}
            />
        </section>
    )
}

export default AccountSettings;