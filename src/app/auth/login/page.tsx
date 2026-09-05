// PATKAAR VIBESS - STUDENT LOGIN PAGE

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { ShieldCheck, Sparkles, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = Router();
  const { showToast } = useApp();
  const [email, setEmail] = useState('aarav.sharma@patkaar.edu.in');
  const [password, setPassword] = useState('studentpass123');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.toLowerCase().includes('patkaar') && !email.toLowerCase().includes('.edu') && !email.toLowerCase().includes('.ac.in')) {
      showToast('⚠️ Please use your official college email domain (.edu / .ac.in)');
      return;
    }
    showToast('Logged in successfully! Welcome to PATKAAR VIBESS.');
    router.push('/feed');
  };

  return (
    <div className="max-w-md mx-auto py-8 sm:py-16 space-y-6">
      
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-semibold">
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified Student Portal
        </div>
        <h1 className="text-3xl font-extrabold text-white">Welcome Back</h1>
        <p className="text-xs text-slate-400">
          Sign in with your verified college credentials
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            College Email Address (.edu / .ac.in)
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="yourname@patkaar.edu.in"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 mt-2"
        >
          Sign In to Campus
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>

        <div className="pt-2 text-center text-xs text-slate-400">
          New student on campus?{' '}
          <Link href="/auth/signup" className="text-emerald-400 font-semibold hover:underline">
            Create Verified Account
          </Link>
        </div>
      </form>

      <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800/80 text-[11px] text-slate-500 text-center">
        🔒 PATKAAR VIBESS enforces strict student domain verification. Faculty and external domains are blocked automatically.
      </div>

    </div>
  );
}

function Router() {
  return useRouter();
}
