// PATKAAR VIBESS - CAMPUS EVENTS MODULE

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Calendar, MapPin, Clock, Users, Plus, CheckCircle2, X } from 'lucide-react';

export default function CampusEventsPage() {
  const { events, toggleRSVPEvent, addEvent } = useApp();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<'hackathon' | 'workshop' | 'cultural' | 'sports' | 'seminar' | 'fest'>('hackathon');
  const [startTime, setStartTime] = useState('');
  const [location, setLocation] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !location) return;
    addEvent(title, description, category, startTime || new Date().toISOString(), location);
    setTitle('');
    setDescription('');
    setLocation('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            Campus Events & Fests
            <Calendar className="w-5 h-5 text-indigo-400" />
          </h1>
          <p className="text-xs text-slate-400">
            Hackathons, workshops, music nights, cultural fests & gaming tourneys.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-500 to-emerald-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Host Event</span>
        </button>
      </div>

      {/* Events Stream */}
      <div className="space-y-4">
        {events.map(evt => (
          <div key={evt.id} className="p-5 rounded-3xl glass-card border border-slate-800 flex flex-col md:flex-row gap-5 hover:border-indigo-500/40 transition-all">
            
            {/* Event Banner */}
            <div className="w-full md:w-56 h-40 rounded-2xl overflow-hidden bg-slate-900 shrink-0 relative border border-slate-800">
              <img src={evt.image_url} alt={evt.title} className="w-full h-full object-cover" />
              <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-950/80 text-emerald-400 uppercase tracking-wide border border-emerald-500/30">
                {evt.category}
              </span>
            </div>

            {/* Event Details */}
            <div className="flex-1 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="font-extrabold text-base text-slate-100">{evt.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-2">{evt.description}</p>
                
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1 font-medium">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" />
                    {new Date(evt.start_time).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                    {evt.location}
                  </span>
                  <span className="flex items-center gap-1 font-medium">
                    <Users className="w-3.5 h-3.5 text-amber-400" />
                    {evt.interested_count} Attending
                  </span>
                </div>
              </div>

              {/* RSVP Action */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Organized by {evt.organizer}</span>
                <button
                  onClick={() => toggleRSVPEvent(evt.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
                    evt.is_going
                      ? 'bg-emerald-500/20 border border-emerald-500 text-emerald-300'
                      : 'bg-indigo-500 hover:bg-indigo-400 text-slate-950 shadow-md'
                  }`}
                >
                  {evt.is_going ? '✓ RSVP Confirmed (Attending)' : 'RSVP / Register'}
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

      {/* HOST EVENT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl glass-modal border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-indigo-400" />
                Publish Campus Event
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. PATKAAR HACKS 2026"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
                  >
                    <option value="hackathon">Hackathon</option>
                    <option value="workshop">Workshop</option>
                    <option value="cultural">Cultural</option>
                    <option value="sports">Sports</option>
                    <option value="fest">College Fest</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Location on Campus</label>
                  <input
                    type="text"
                    required
                    value={location}
                    onChange={e => setLocation(e.target.value)}
                    placeholder="e.g. Auditorium Hall B"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description & Agenda</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Details, prize money, eligibility, registration links..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-extrabold text-xs transition-all"
              >
                Publish Event
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
