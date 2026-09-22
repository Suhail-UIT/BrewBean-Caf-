import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Coffee, Lock, Mail, User as UserIcon, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal, authModalInitialMode, login, register } = useAuth();
  const [mode, setMode] = useState<'login' | 'register'>(authModalInitialMode);
  
  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync mode when modal opens
  React.useEffect(() => {
    if (isAuthModalOpen) {
      setMode(authModalInitialMode);
    }
  }, [isAuthModalOpen, authModalInitialMode]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, phone, password);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin@brewbeancafe.in');
    setPassword('adminpassword123');
    setMode('login');
  };

  const fillDemoCustomer = () => {
    setEmail('rahul.sharma@example.com');
    setPassword('customer123');
    setMode('login');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          className="fixed inset-0 bg-[#1D130E]/70 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-[#FAF7F2] rounded-3xl shadow-2xl border border-[#E8DFD8] overflow-hidden z-10"
        >
          {/* Header banner */}
          <div className="bg-gradient-to-r from-[#2C1810] via-[#3D2318] to-[#2C1810] p-6 text-[#FAF7F2] relative">
            <button
              onClick={closeAuthModal}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-[#D4A373] text-sm font-semibold tracking-wider uppercase mb-1">
              <Coffee className="w-4 h-4" />
              <span>BrewBean Club</span>
            </div>
            <h2 className="text-2xl font-serif font-bold tracking-tight">
              {mode === 'login' ? 'Welcome Back' : 'Join BrewBean Café'}
            </h2>
            <p className="text-xs text-stone-300 mt-1">
              {mode === 'login'
                ? 'Sign in to order, track deliveries, and manage reservations'
                : 'Create an account for personalized coffee moments in Noida'}
            </p>
          </div>

          {/* Quick Demo Fillers */}
          <div className="bg-[#EFE9E1] px-6 py-2.5 flex items-center justify-between border-b border-[#E2D8CE] text-xs">
            <span className="text-[#5C4D44] font-medium flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#A37042]" /> Quick Test:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={fillDemoAdmin}
                className="px-2.5 py-1 rounded-full bg-[#2C1810] text-[#FAF7F2] hover:bg-[#432619] transition-all font-semibold flex items-center gap-1 shadow-sm"
              >
                <ShieldCheck className="w-3 h-3 text-[#D4A373]" /> Demo Admin
              </button>
              <button
                type="button"
                onClick={fillDemoCustomer}
                className="px-2.5 py-1 rounded-full bg-[#D4A373] text-[#2C1810] hover:bg-[#C49A6C] transition-all font-semibold shadow-sm"
              >
                Demo Customer
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-[#E8DFD8]">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-3 text-sm font-semibold tracking-wide transition-all border-b-2 ${
                mode === 'login'
                  ? 'border-[#8B5A2B] text-[#2C1810] bg-[#FAF7F2]'
                  : 'border-transparent text-[#7D6E66] hover:text-[#2C1810] bg-[#F4EFEA]'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 py-3 text-sm font-semibold tracking-wide transition-all border-b-2 ${
                mode === 'register'
                  ? 'border-[#8B5A2B] text-[#2C1810] bg-[#FAF7F2]'
                  : 'border-transparent text-[#7D6E66] hover:text-[#2C1810] bg-[#F4EFEA]'
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-[#8C7A70] absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C7A70] absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. hello@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                />
              </div>
            </div>

            {mode === 'register' && (
              <div>
                <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-[#8C7A70] absolute left-3.5 top-3" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#4A3B32] uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8C7A70] absolute left-3.5 top-3" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DDD3C9] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8B5A2B] text-[#2C1810]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-4 py-3 px-6 bg-[#2C1810] hover:bg-[#432619] active:bg-[#1D100A] text-white font-semibold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : mode === 'login' ? (
                'Sign In to Account'
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Footer switcher note */}
          <div className="bg-[#F4EFEA] px-6 py-3.5 text-center text-xs text-[#6B5C54] border-t border-[#E8DFD8]">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-bold text-[#8B5A2B] hover:underline"
                >
                  Create one now
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="font-bold text-[#8B5A2B] hover:underline"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
