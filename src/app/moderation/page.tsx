// PATKAAR VIBESS - INTERNAL PLATFORM MODERATION QUEUE

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { ShieldAlert, AlertTriangle, CheckCircle, XCircle, Ban, Eye, Lock } from 'lucide-react';

export default function ModerationQueuePage() {
  const { currentUser, reports, resolveReport, suspendUser } = useApp();
  const [filterStatus, setFilterStatus] = useState<'pending' | 'resolved'>('pending');

  if (!currentUser.is_moderator) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">Access Restricted</h2>
        <p className="text-xs text-slate-400">
          This panel is strictly reserved for internal Patkaar Vibess Student Moderators.
        </p>
      </div>
    );
  }

  const filteredReports = reports.filter(r => {
    if (filterStatus === 'pending') return r.status === 'pending';
    return r.status !== 'pending';
  });

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            Platform Moderation Queue
            <ShieldAlert className="w-5 h-5 text-amber-400" />
          </h1>
          <p className="text-xs text-slate-400">
            Internal PATKAAR VIBESS incident reports & content moderation.
          </p>
        </div>

        <div className="px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/40 text-amber-300 text-xs font-bold">
          Student Moderator Access
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setFilterStatus('pending')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            filterStatus === 'pending'
              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          Pending Incidents ({reports.filter(r => r.status === 'pending').length})
        </button>

        <button
          onClick={() => setFilterStatus('resolved')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            filterStatus === 'resolved'
              ? 'bg-amber-500/20 border-amber-500 text-amber-300'
              : 'bg-slate-900 border-slate-800 text-slate-400'
          }`}
        >
          Resolved Archive
        </button>
      </div>

      {/* Report Cards */}
      <div className="space-y-4">
        {filteredReports.length === 0 ? (
          <div className="p-12 text-center rounded-3xl glass-card border border-slate-800 text-slate-400 text-xs">
            No incident reports found in this queue. Platform clean!
          </div>
        ) : (
          filteredReports.map(rep => (
            <div key={rep.id} className="p-5 rounded-3xl glass-card border border-slate-800 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-rose-950/60 border border-rose-500/40 text-rose-300 uppercase">
                    Reason: {rep.reason.replace('_', ' ')}
                  </span>
                  <span className="text-xs text-slate-400">Target Type: <strong>{rep.target_type.toUpperCase()}</strong></span>
                </div>

                <span className="text-[10px] text-slate-500 font-mono">Report ID: {rep.id}</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 space-y-1">
                <p><strong>Reporter:</strong> {rep.reporter.full_name} ({rep.reporter.email})</p>
                {rep.reported_user && <p><strong>Accused User:</strong> {rep.reported_user.full_name}</p>}
                {rep.details && <p className="text-slate-400 italic">"Details: {rep.details}"</p>}
              </div>

              {rep.status === 'pending' && (
                <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => resolveReport(rep.id, false)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Resolve & Remove Content</span>
                  </button>

                  {rep.reported_user && (
                    <button
                      onClick={() => {
                        suspendUser(rep.reported_user!.id);
                        resolveReport(rep.id, false);
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      <Ban className="w-3.5 h-3.5" />
                      <span>Suspend Account</span>
                    </button>
                  )}

                  <button
                    onClick={() => resolveReport(rep.id, true)}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 font-bold text-xs"
                  >
                    Dismiss Report
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
}
