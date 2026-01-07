import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiAlertTriangle, FiShield } from 'react-icons/fi';
import DeleteAccountModal from './DeleteAccountModal';
// import { motion } from 'framer-motion';

const AccountSettings = () => {
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteConfirm = () => {
        console.log('Account deletion confirmed');
    };

    return (
        <section className="space-y-8 mb-20 md:mb-0">
            {/* Change Password */}
            <div className="glass-card rounded-[3rem] p-10 border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                    <FiShield size={120} className="text-white" />
                </div>

                <div className="relative z-10">
                    <div className="mb-10">
                        <h3 className="text-2xl font-black text-white tracking-tighter">Identity Security</h3>
                        <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">Manage your access credentials</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-4">New Password</label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="w-full p-5 glass rounded-2xl focus:outline-none border-white/5 text-white font-bold"
                                />
                                <button
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors cursor-pointer"
                                >
                                    {showNewPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-4">Confirm Identity</label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="w-full p-5 glass rounded-2xl focus:outline-none border-white/5 text-white font-bold"
                                />
                                <button
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors cursor-pointer"
                                >
                                    {showConfirmPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        className="mt-10 px-10 py-5 bg-white text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 cursor-pointer"
                    >
                        Update Credentials
                    </button>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="glass-card rounded-[3rem] p-10 border-red-500/10 relative overflow-hidden group">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="w-24 h-24 bg-red-500/10 rounded-[2rem] flex items-center justify-center text-red-500 animate-pulse">
                        <FiAlertTriangle size={40} />
                    </div>

                    <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-black text-red-500 tracking-tighter mb-2">Danger Zone</h3>
                        <p className="text-red-500/40 text-sm font-medium leading-relaxed max-w-sm">
                            Deleting your account is permanent. All your engineering profiles, stats, and links will be scrubbed from the matrix.
                        </p>
                    </div>

                    <button
                        onClick={() => setShowDeleteModal(true)}
                        className="px-10 py-5 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all cursor-pointer shadow-xl shadow-red-500/10"
                    >
                        Delete Identity
                    </button>
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