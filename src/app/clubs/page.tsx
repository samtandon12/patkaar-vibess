// PATKAAR VIBESS - STUDENT CLUBS MODULE

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { Radio, Users, Plus, Sparkles, Check, X, Compass } from 'lucide-react';

export default function StudentClubsPage() {
  const { clubs, toggleJoinClub, addClub } = useApp();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Coding & AI');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !tagline) return;
    addClub(name, tagline, description, category);
    setName('');
    setTagline('');
    setDescription('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            Student-Run Clubs
            <Radio className="w-5 h-5 text-amber-400" />
          </h1>
          <p className="text-xs text-slate-400">
            Join student communities, tech societies, and cultural squads. 100% student-led.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 to-emerald-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Start Student Club</span>
        </button>
      </div>

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {clubs.map(club => (
          <div key={club.id} className="rounded-3xl glass-card border border-slate-800 overflow-hidden space-y-4 flex flex-col justify-between hover:border-amber-500/40 transition-all">
            
            <div>
              {/* Banner & Logo */}
              <div className="relative h-32 bg-slate-900">
                <img src={club.banner_url} alt={club.name} className="w-full h-full object-cover" />
                <div className="absolute -bottom-4 left-4 border-2 border-slate-950 rounded-2xl overflow-hidden w-12 h-12 bg-slate-900">
                  <img src={club.logo_url} alt={club.name} className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Club Info */}
              <div className="p-4 pt-6 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-base text-slate-100">{club.name}</h3>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-950/60 border border-amber-500/40 text-amber-300">
                    {club.category}
                  </span>
                </div>
                
                <p className="text-xs font-semibold text-emerald-400">{club.tagline}</p>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{club.description}</p>
              </div>
            </div>

            {/* Footer & Join Action */}
            <div className="p-4 pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                {club.members_count} Student Members
              </span>

              <button
                onClick={() => toggleJoinClub(club.id)}
                className={`px-4 py-1.5 rounded-xl font-bold text-xs transition-all ${
                  club.is_joined
                    ? 'bg-slate-900 text-slate-300 border border-slate-700 hover:bg-rose-950/40 hover:text-rose-300 hover:border-rose-500/40'
                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md'
                }`}
              >
                {club.is_joined ? '✓ Member (Leave)' : 'Join Club'}
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* CREATE CLUB MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl glass-modal border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Radio className="w-4 h-4 text-amber-400" />
                Register Student-Run Club
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Club Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Patkaar Gaming & Esports Club"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Tagline</label>
                <input
                  type="text"
                  required
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  placeholder="e.g. Competing in college tournaments & LAN parties."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
                >
                  <option value="Coding & AI">Coding & AI</option>
                  <option value="Entrepreneurship">Entrepreneurship</option>
                  <option value="Music & Arts">Music & Arts</option>
                  <option value="Sports & Gaming">Sports & Gaming</option>
                  <option value="Photography & Film">Photography & Film</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe your club's goals, weekly meetups and activities..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs transition-all"
              >
                Register & Publish Club
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
