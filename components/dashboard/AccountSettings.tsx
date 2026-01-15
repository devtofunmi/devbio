import React, { useState } from 'react';
import { FiEye, FiEyeOff, FiAlertTriangle, FiShield, FiLoader } from 'react-icons/fi';
import DeleteAccountModal from './DeleteAccountModal';
import { useAuth } from '../../lib/AuthContext';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const AccountSettings = () => {
    const { user, signOut, supabase } = useAuth();
    const router = useRouter();
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const [username, setUsername] = useState('');
    const [loadingUsername, setLoadingUsername] = useState(true);
    const [savingUsername, setSavingUsername] = useState(false);

    React.useEffect(() => {
        if (user) {
            supabase.from('profiles').select('username').eq('id', user.id).single()
                .then(({ data, error }) => {
                    if (data) setUsername(data.username || '');
                    setLoadingUsername(false);
                });
        }
    }, [user, supabase]);

    const handleUsernameUpdate = async () => {
        if (!user) return;
        if (!username || username.length < 3) {
            toast.error("Username must be at least 3 characters.");
            return;
        }
        setSavingUsername(true);
        try {
            const { error } = await supabase.from('profiles').update({ username }).eq('id', user.id);
            if (error) throw error;
            toast.success("Username updated!");
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to update username.";
            toast.error(message);
        } finally {
            setSavingUsername(false);
        }
    };

    const handlePasswordUpdate = async () => {
        if (!newPassword || !confirmPassword) {
            toast.error("Please fill in both password fields.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }

        if (newPassword.length < 6) {
            toast.error("Password must be at least 6 characters.");
            return;
        }

        setLoading(true);
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;
            toast.success("Security credentials updated!");
            setNewPassword('');
            setConfirmPassword('');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Failed to update password.";
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (!user) return;

        setIsDeleting(true);
        try {
            const { error: profileError } = await supabase
                .from('profiles')
                .delete()
                .eq('id', user.id);

            if (profileError) throw profileError;
            await signOut();
            toast.success("Identity scrubbed from the matrix.");
            router.push('/');
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : "Unknown error";
            toast.error("Scrub operation failed: " + message);
            setIsDeleting(false);
        }
    };

    return (
        <section className="space-y-8 mb-20 md:mb-0">
            <div className="glass-card rounded-[3rem] p-10 border-white/5 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                    <FiShield size={120} className="text-white" />
                </div>

                <div className="relative z-10">
                    <div className="mb-10 border-b border-white/5 pb-10">
                        <div className="mb-8">
                            <h3 className="text-2xl font-black text-white tracking-tighter">Public Handle</h3>
                            <p className="text-white/40 text-sm font-medium uppercase tracking-widest mt-1">Your unique identity on the matrix</p>
                        </div>
                        <div className="flex flex-col md:flex-row gap-4 items-end">
                            <div className="space-y-2 w-full md:w-[320px]">
                                <label className="text-xs font-black text-white/40 uppercase tracking-[0.2em] ml-4">Username</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/[^a-z0-9._-]/g, ''))}
                                        placeholder="username"
                                        className="w-full p-5 glass rounded-2xl focus:outline-none border-white/5 text-white font-bold font-mono"
                                    />
                                </div>
                            </div>
                            <button
                                onClick={handleUsernameUpdate}
                                disabled={savingUsername || loadingUsername}
                                className="w-full md:w-auto px-8 py-5 bg-white text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {savingUsername ? <FiLoader className="animate-spin" /> : 'Save'}
                            </button>
                        </div>
                    </div>

                    {user?.app_metadata?.provider === 'email' && (
                        <>
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
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
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
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
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
                                onClick={handlePasswordUpdate}
                                disabled={loading}
                                className="mt-10 px-5 mx-auto md:mx-0 py-5 bg-white text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 cursor-pointer flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading && <FiLoader className="animate-spin" />}
                                {loading ? 'Updating...' : 'Update Credentials'}
                            </button>
                        </>
                    )}
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
                isDeleting={isDeleting}
            />
        </section>
    )
}

export default AccountSettings;