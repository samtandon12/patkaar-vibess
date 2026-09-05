// PATKAAR VIBESS - STUDENT OPPORTUNITY BOARD

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { Briefcase, MapPin, Plus, DollarSign, ExternalLink, X } from 'lucide-react';

export default function OpportunitiesPage() {
  const { opportunities, addOpportunity } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const [organization, setOrganization] = useState('');
  const [category, setCategory] = useState<'internship' | 'hackathon' | 'competition' | 'freelance' | 'project' | 'scholarship'>('internship');
  const [location, setLocation] = useState('Remote / On-Campus');
  const [stipend, setStipend] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !organization) return;
    addOpportunity(title, organization, category, location, description, stipend);
    setTitle('');
    setOrganization('');
    setStipend('');
    setDescription('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            Student Opportunity Board
            <Briefcase className="w-5 h-5 text-teal-400" />
          </h1>
          <p className="text-xs text-slate-400">
            Internships, freelance roles, student startup openings & hackathons.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Post Opportunity</span>
        </button>
      </div>

      {/* Opportunities Board */}
      <div className="space-y-4">
        {opportunities.map(opp => (
          <div key={opp.id} className="p-5 rounded-3xl glass-card border border-slate-800 space-y-3 hover:border-teal-500/40 transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-extrabold text-base text-slate-100">{opp.title}</h3>
                <p className="text-xs text-emerald-400 font-semibold">{opp.organization}</p>
              </div>

              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-slate-900 border border-slate-800 text-teal-300 uppercase tracking-wide self-start sm:self-center">
                {opp.category}
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{opp.description}</p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                {opp.location}
              </span>
              {opp.stipend && (
                <span className="flex items-center gap-1 font-semibold text-emerald-300">
                  <DollarSign className="w-3.5 h-3.5" />
                  {opp.stipend}
                </span>
              )}
              <span className="text-[11px] text-slate-500 ml-auto">
                Posted by {opp.posted_by.full_name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* POST OPPORTUNITY MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl glass-modal border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-teal-400" />
                Post Student Opportunity
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Opportunity Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Frontend Developer Intern"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Startup / Org Name</label>
                  <input
                    type="text"
                    required
                    value={organization}
                    onChange={e => setOrganization(e.target.value)}
                    placeholder="e.g. CampusBites Tech"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Stipend / Pay</label>
                  <input
                    type="text"
                    value={stipend}
                    onChange={e => setStipend(e.target.value)}
                    placeholder="e.g. ₹15,000 / month"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description & Requirements</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe role responsibilities, tech stack, and duration..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-teal-400 hover:bg-teal-300 text-slate-950 font-extrabold text-xs transition-all"
              >
                Publish Opportunity
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
