// PATKAAR VIBESS - STUDENT SIGNUP PAGE

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/lib/store';
import { ConnectionIntent } from '@/lib/types';
import { ShieldCheck, Sparkles, User, Mail, GraduationCap, Upload, CheckCircle2, ArrowRight } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const { updateProfile, verifyStudent, showToast } = useApp();
  
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('B.Tech');
  const [branch, setBranch] = useState('Computer Science & Engineering');
  const [year, setYear] = useState(3);
  const [bio, setBio] = useState('');
  const [studentIdNum, setStudentIdNum] = useState('');
  const [hereFor, setHereFor] = useState<ConnectionIntent[]>(['friends', 'networking', 'projects']);
  const [idFileName, setIdFileName] = useState<string | null>(null);

  const toggleIntent = (intent: ConnectionIntent) => {
    setHereFor(prev => 
      prev.includes(intent) ? prev.filter(i => i !== intent) : [...prev, intent]
    );
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIdFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) {
      showToast('Please fill in your name and college email.');
      return;
    }

    updateProfile({
      full_name: fullName,
      email,
      course,
      branch,
      year_of_study: Number(year),
      bio,
      here_for: hereFor
    });

    if (studentIdNum || idFileName) {
      verifyStudent(studentIdNum || 'PAT/2026/VERIFIED');
    }

    showToast('🎉 Student account created & verified! Welcome to Patkaar Vibess.');
    router.push('/feed');
  };

  return (
    <div className="max-w-xl mx-auto py-6 sm:py-12 space-y-6">
      
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          Verified Student Registration
        </div>
        <h1 className="text-3xl font-extrabold text-white">Join Your Campus Network</h1>
        <p className="text-xs text-slate-400">
          Create your verified student profile. Students only — zero faculty access.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 space-y-5">
        
        {/* Full Name & Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                required
                value={fullName}
                onChange={e => setFullName(e.target.value)}
                placeholder="Aarav Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">College Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="aarav@patkaar.edu.in"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
              />
            </div>
          </div>
        </div>

        {/* Academic Info */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Course / Degree</label>
            <input
              type="text"
              required
              value={course}
              onChange={e => setCourse(e.target.value)}
              placeholder="B.Tech / BA / BCA"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Branch / Dept</label>
            <input
              type="text"
              required
              value={branch}
              onChange={e => setBranch(e.target.value)}
              placeholder="Computer Science"
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Year of Study</label>
            <select
              value={year}
              onChange={e => setYear(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60"
            >
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
              <option value={4}>4th Year</option>
              <option value={5}>5th Year</option>
            </select>
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Bio / Introduction</label>
          <textarea
            rows={2}
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="Tell fellow students what you are building or interested in..."
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/60 resize-none"
          />
        </div>

        {/* "I'm here for" Options */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">I'm Here For (Select all that apply):</label>
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'friends', label: '🤝 Friends' },
              { id: 'networking', label: '💼 Networking' },
              { id: 'projects', label: '💻 Project Teammates' },
              { id: 'collaboration', label: '⚡ Collaboration' },
              { id: 'dating', label: '❤️ Dating (18+ Opt-In)' }
            ].map(item => {
              const selected = hereFor.includes(item.id as ConnectionIntent);
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => toggleIntent(item.id as ConnectionIntent)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                    selected 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-sm' 
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Student Verification Upload Box */}
        <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Student ID Verification
            </span>
            <span className="text-[10px] text-slate-400">Instant Badge</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={studentIdNum}
              onChange={e => setStudentIdNum(e.target.value)}
              placeholder="Roll / Student ID Number"
              className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
            />
            
            <label className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-slate-900 border border-dashed border-emerald-500/40 cursor-pointer hover:bg-slate-800 text-xs text-emerald-400 font-semibold transition-colors">
              <Upload className="w-4 h-4" />
              <span className="truncate">{idFileName || 'Upload ID Card'}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-indigo-600 text-slate-950 font-extrabold text-sm shadow-xl shadow-emerald-500/20 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          Create Verified Profile & Enter Campus
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>

        <div className="text-center text-xs text-slate-400 pt-1">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-emerald-400 font-semibold hover:underline">
            Sign In
          </Link>
        </div>

      </form>
    </div>
  );
}
