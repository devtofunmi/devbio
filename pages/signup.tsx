import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from "framer-motion";
import { SiGithub, SiReact, SiNodedotjs, SiNextdotjs, SiTailwindcss } from 'react-icons/si';
import { useAuth } from '../lib/AuthContext';
import { toast } from 'react-toastify';
import SuccessModal from '../components/SuccessModal';
import LoadingSpinner from '../components/LoadingSpinner';

const Signup: React.FC = () => {
  const router = useRouter();
  const { supabase } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'username' ? value.toLowerCase() : value
    }));
  };

  const handleGitHubLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/dashboard?welcome=true`
        }
      });
      if (error) throw error;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to initiate GitHub login";
      toast.error(message);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            username: formData.username,
          },
          emailRedirectTo: `${window.location.origin}/dashboard?welcome=true`
        },
      });

      if (signUpError) throw signUpError;

      if (data.user) {
        if (data.session) {
          setShowSuccessModal(true);
        } else {
          toast.success('Please check your email to confirm your account!');
        }
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to sign up";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    router.push('/dashboard?welcome=true');
  };

  type FloatingProps = {
    children: React.ReactNode;
    delay?: number;
    distance?: number;
    duration?: number;
    className?: string;
  };

  const Floating = ({
    children,
    delay = 0,
    distance = 15,
    duration = 4,
    className = "",
  }: FloatingProps) => (
    <motion.div
      animate={{
        y: [0, -distance, 0],
        transition: {
          duration,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
          delay,
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white relative overflow-hidden">
      <SuccessModal isOpen={showSuccessModal} onClose={handleSuccessClose} />

      {/* Fixed Logo Navbar */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/50 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="inline-block group">
            <div className="flex items-center gap-3 transition-all group-hover:scale-105">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-500 rounded-xl rotate-6 group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-blue-500/20" />
                <div className="relative w-full h-full bg-black border border-white/10 rounded-xl flex items-center justify-center font-black text-blue-500 text-xs tracking-tighter">
                  D/B
                </div>
              </div>
              <span className="text-xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors">DevBio</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex mt-14 flex-col lg:flex-row w-full max-w-7xl mx-auto px-6 relative z-10">
        {/* Left Side: Signup Form */}
        <motion.div

          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1 p-6 md:p-16 lg:w-1/2 flex flex-col justify-center min-h-screen">
          <div className="w-full mx-auto md:max-w-md lg:mx-0">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Join the Elite.
            </h1>
            <p className="text-xl text-white/50 mb-12 font-light">
              Create your DevBio and showcase your engineering DNA.
            </p>

            <form onSubmit={handleSignup} className="space-y-6">

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Username</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 font-bold">devbio.co/</span>
                  <input
                    type="text"
                    name="username"
                    placeholder="username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full glass p-4 pl-24 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-white/5 placeholder:text-white/20 bg-transparent"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="engineer@devbio.co"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full glass p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-white/5 placeholder:text-white/20 bg-transparent"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-white/40 ml-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full glass p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all border-white/5 pr-14 placeholder:text-white/20 bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors cursor-pointer"
                  >
                    {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-4 rounded-2xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-white/5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? <LoadingSpinner /> : 'Create My Profile'}
              </button>

              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-white/5"></div>
                <span className="flex-shrink mx-4 text-white/20 text-xs font-bold uppercase tracking-widest">or</span>
                <div className="flex-grow border-t border-white/5"></div>
              </div>

              <button
                type="button"
                onClick={handleGitHubLogin}
                className="w-full glass hover:bg-white/5 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all border-white/5 cursor-pointer"
              >
                <SiGithub size={20} />
                <span>Sign up with GitHub</span>
              </button>

              <p className="text-center text-sm text-white/40 pt-4">
                Already have an account? <Link href="/login" className="text-blue-400 font-bold hover:underline">Log in</Link>
              </p>
            </form>
          </div>
        </motion.div>

        {/* Right Side: Visuals */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hidden lg:flex lg:w-1/2 lg:fixed lg:right-0 lg:top-0 lg:h-screen lg:items-center lg:justify-center"
        >
          <div className="relative w-full max-w-[500px] aspect-square">
            <Floating className="absolute top-10 left-5 w-24 h-24 glass rounded-3xl flex items-center justify-center text-blue-400 shadow-2xl">
              <SiReact size={50} />
            </Floating>
            <Floating delay={0.5} distance={10} duration={5} className="absolute top-0 right-20 w-16 h-16 glass rounded-full flex items-center justify-center text-green-400">
              <SiNodedotjs size={32} />
            </Floating>
            <Floating delay={1} distance={12} duration={4.5} className="absolute bottom-10 left-0 w-24 h-24 glass rounded-3xl flex items-center justify-center text-white">
              <SiNextdotjs size={50} />
            </Floating>
            <Floating delay={0.3} distance={10} duration={6} className="absolute bottom-5 right-24 w-28 h-28 glass rounded-3xl flex items-center justify-center text-blue-400">
              <SiTailwindcss size={60} />
            </Floating>
            <Floating delay={0.8} distance={10} duration={4} className="absolute top-24 right-0 w-16 h-16 glass rounded-full flex items-center justify-center text-white">
              <SiGithub size={40} />
            </Floating>

            <Floating
              delay={1.2}
              distance={10}
              duration={6}
              className="absolute top-32 left-32 w-64 h-28 glass rounded-3xl transform rotate-3 flex items-center justify-center p-4 border-white/10"
            >
              <div className="grid grid-cols-12 grid-rows-4 gap-1 w-full h-full opacity-40">
                {Array.from({ length: 48 }).map((_, i) => (
                  <div
                    key={i}
                    className={`rounded-[2px] ${i % 7 === 0 ? "bg-purple-600" : i % 5 === 0 ? "bg-purple-400" : "bg-white/10"
                      }`}
                  />
                ))}
              </div>
            </Floating>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;