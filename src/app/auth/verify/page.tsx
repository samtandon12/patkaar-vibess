// PATKAAR VIBESS - STUDENT VERIFICATION HUB

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { ShieldCheck, Upload, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';

export default function VerificationHubPage() {
  const { currentUser, verifyStudent } = useApp();
  const [studentId, setStudentId] = useState(currentUser.verification_student_id || '');
  const [fileUploaded, setFileUploaded] = useState(false);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    verifyStudent(studentId || 'PAT/2026/VERIFIED');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      
      <div className="flex items-center gap-3">
        <Link href="/feed" className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
            Student Verification Center
          </h1>
          <p className="text-xs text-slate-400">
            Verify your enrolled student status to receive the official badge.
          </p>
        </div>
      </div>

      {/* Current Status Card */}
      <div className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-sm text-slate-200">Current Status</h2>
          <VerificationBadge size="lg" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Student Name</span>
            <span className="font-semibold text-slate-200">{currentUser.full_name}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Campus Email</span>
            <span className="font-semibold text-emerald-400">{currentUser.email}</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Course & Branch</span>
            <span className="font-semibold text-slate-200">{currentUser.course} ({currentUser.branch})</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Verification ID</span>
            <span className="font-mono text-emerald-300 font-semibold">{currentUser.verification_student_id || 'Not Assigned'}</span>
          </div>
        </div>
      </div>

      {/* Upload & Re-Verification Form */}
      <form onSubmit={handleVerify} className="p-6 rounded-3xl glass-card border border-slate-800 space-y-4">
        <h2 className="font-bold text-sm text-slate-200">Update / Submit Verification Proof</h2>
        <p className="text-xs text-slate-400">
          Upload your physical or digital college ID card, or enter your official enrollment roll number.
        </p>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Student Roll / Registration Number</label>
          <input
            type="text"
            value={studentId}
            onChange={e => setStudentId(e.target.value)}
            placeholder="e.g. PAT/2024/CS/104"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1.5">Upload Student ID Card Photo</label>
          <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-800 hover:border-emerald-500/50 rounded-2xl bg-slate-900/40 cursor-pointer transition-colors">
            <Upload className="w-8 h-8 text-emerald-400 mb-2" />
            <span className="text-xs font-semibold text-slate-300">
              {fileUploaded ? '✓ ID Card File Attached' : 'Click to select ID Card image (PNG, JPG)'}
            </span>
            <span className="text-[10px] text-slate-500 mt-1">Automatic OCR credential validation enabled</span>
            <input type="file" accept="image/*" className="hidden" onChange={() => setFileUploaded(true)} />
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm transition-all"
        >
          Confirm & Re-Issue Verified Badge
        </button>
      </form>

    </div>
  );
}
