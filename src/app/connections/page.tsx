// PATKAAR VIBESS - CONNECTION NETWORK MODULE

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { Users, Check, X, MessageSquare, Clock, UserCheck } from 'lucide-react';

export default function ConnectionsPage() {
  const { connections, respondConnectionRequest, startOrOpenConversation } = useApp();
  const [activeTab, setActiveTab] = useState<'pending' | 'accepted'>('pending');

  const pendingList = connections.filter(c => c.status === 'pending');
  const acceptedList = connections.filter(c => c.status === 'accepted');

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
          Connections Network
          <Users className="w-5 h-5 text-emerald-400" />
        </h1>
        <p className="text-xs text-slate-400">
          Manage intent-based requests for project collabs, networking & friendships.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('pending')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeTab === 'pending'
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <Clock className="w-3.5 h-3.5" />
          <span>Pending Requests</span>
          {pendingList.length > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500 text-slate-950 font-extrabold">
              {pendingList.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('accepted')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
            activeTab === 'accepted'
              ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          <UserCheck className="w-3.5 h-3.5" />
          <span>Connected Peers ({acceptedList.length})</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="space-y-3">
        {activeTab === 'pending' ? (
          pendingList.length === 0 ? (
            <div className="p-12 text-center rounded-3xl glass-card border border-slate-800 text-slate-400 text-xs">
              No pending connection requests right now.
            </div>
          ) : (
            pendingList.map(req => (
              <div key={req.id} className="p-4 rounded-3xl glass-card border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={req.sender.avatar_url} alt={req.sender.full_name} className="w-11 h-11 rounded-2xl object-cover ring-2 ring-emerald-500/20" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                      {req.sender.full_name}
                      {req.sender.is_verified && <VerificationBadge size="sm" showText={false} />}
                    </h3>
                    <p className="text-xs text-slate-400">{req.sender.course} • Year {req.sender.year_of_study}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950/60 text-indigo-300 border border-indigo-500/30">
                        Intent: {req.intent.toUpperCase()}
                      </span>
                      {req.note && <span className="text-[11px] text-slate-300 italic">"{req.note}"</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => respondConnectionRequest(req.id, true)}
                    className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1 transition-all"
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={() => respondConnectionRequest(req.id, false)}
                    className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))
          )
        ) : (
          acceptedList.length === 0 ? (
            <div className="p-12 text-center rounded-3xl glass-card border border-slate-800 text-slate-400 text-xs">
              You haven't connected with any peers yet. Use Discovery to connect!
            </div>
          ) : (
            acceptedList.map(req => (
              <div key={req.id} className="p-4 rounded-3xl glass-card border border-slate-800 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img src={req.sender.avatar_url} alt={req.sender.full_name} className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h3 className="font-bold text-sm text-slate-100">{req.sender.full_name}</h3>
                    <p className="text-xs text-slate-400">{req.sender.course} ({req.sender.branch})</p>
                  </div>
                </div>

                <button
                  onClick={() => startOrOpenConversation(req.sender, 'connection', `Connection: ${req.intent}`)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-emerald-400 flex items-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat</span>
                </button>
              </div>
            ))
          )
        )}
      </div>

    </div>
  );
}
