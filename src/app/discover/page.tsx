// PATKAAR VIBESS - STUDENT DISCOVERY MODULE (UPGRADED UI/UX)

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { ConnectionIntent, StudentProfile } from '@/lib/types';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { 
  Search, 
  Users, 
  Sparkles, 
  Filter, 
  UserPlus, 
  MessageSquare, 
  BookOpen, 
  Briefcase, 
  Code, 
  Heart,
  X,
  Send,
  CheckCircle2,
  Zap
} from 'lucide-react';

export default function StudentDiscoverPage() {
  const { students, currentUser, sendConnectionRequest, startOrOpenConversation, showToast } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIntentFilter, setSelectedIntentFilter] = useState<string>('all');
  const [selectedYearFilter, setSelectedYearFilter] = useState<number | 'all'>('all');
  
  // Connection Modal state
  const [targetStudentModal, setTargetStudentModal] = useState<StudentProfile | null>(null);
  const [connectIntent, setConnectIntent] = useState<ConnectionIntent>('projects');
  const [connectNote, setConnectNote] = useState('');

  const calculateMatchScore = (target: StudentProfile): number => {
    let score = 70; // baseline campus score
    const sharedSkills = target.skills.filter(s => currentUser.skills.includes(s)).length;
    const sharedInterests = target.interests.filter(i => currentUser.interests.includes(i)).length;
    score += sharedSkills * 10 + sharedInterests * 5;
    return Math.min(score, 99);
  };

  const filteredStudents = students.filter(s => {
    if (s.id === currentUser.id) return false;

    const matchesSearch = 
      s.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.skills.some(sk => sk.toLowerCase().includes(searchQuery.toLowerCase())) ||
      s.interests.some(item => item.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesIntent = selectedIntentFilter === 'all' || s.here_for.includes(selectedIntentFilter as ConnectionIntent);
    const matchesYear = selectedYearFilter === 'all' || s.year_of_study === selectedYearFilter;

    return matchesSearch && matchesIntent && matchesYear;
  });

  const handleSendConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetStudentModal) return;
    sendConnectionRequest(targetStudentModal.id, connectIntent, connectNote);
    setTargetStudentModal(null);
    setConnectNote('');
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            Discover Campus Peers
            <Users className="w-5 h-5 text-indigo-400" />
          </h1>
          <p className="text-xs text-slate-400">
            Find project teammates, study buddies, hackathon partners & friends across all departments.
          </p>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 rounded-3xl glass-card border border-slate-800 space-y-3 shadow-lg">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search by name, skills (e.g. React, Python), course, or interests..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500/60"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Intent Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mr-1">Here for:</span>
            {[
              { id: 'all', label: 'All Students' },
              { id: 'projects', label: '💻 Projects' },
              { id: 'friends', label: '🤝 Friends' },
              { id: 'networking', label: '💼 Networking' },
              { id: 'collaboration', label: '⚡ Collaboration' },
              { id: 'dating', label: '❤️ Dating' }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setSelectedIntentFilter(item.id)}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                  selectedIntentFilter === item.id 
                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-sm' 
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Year Filter */}
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] text-slate-500 font-bold">Year:</span>
            <select
              value={selectedYearFilter}
              onChange={e => setSelectedYearFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
              className="px-2.5 py-1 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 focus:outline-none font-semibold"
            >
              <option value="all">All Years</option>
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
              <option value={4}>4th Year</option>
            </select>
          </div>

        </div>
      </div>

      {/* Student Profile Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredStudents.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-3xl glass-card border border-slate-800 text-slate-400 text-xs">
            No students found matching your criteria. Try adjusting your search query!
          </div>
        ) : (
          filteredStudents.map(student => {
            const matchPct = calculateMatchScore(student);

            return (
              <div 
                key={student.id} 
                className="p-5 rounded-3xl glass-card glass-card-hover border border-slate-800 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  
                  {/* Header info with Match Badge */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={student.avatar_url} 
                        alt={student.full_name} 
                        className="w-12 h-12 rounded-2xl object-cover ring-2 ring-indigo-500/30 shadow-md" 
                      />
                      <div>
                        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-1.5">
                          {student.full_name}
                          {student.is_verified && <VerificationBadge size="sm" showText={false} />}
                        </h3>
                        <p className="text-xs text-indigo-400 font-semibold">{student.course} ({student.branch})</p>
                        <p className="text-[10px] text-slate-400">Year {student.year_of_study} Student</p>
                      </div>
                    </div>

                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-gradient-to-r from-emerald-500/20 to-indigo-500/20 border border-emerald-500/40 text-emerald-300 flex items-center gap-1 shadow-sm">
                      <Zap className="w-3 h-3 text-emerald-400 fill-emerald-400" />
                      {matchPct}% Match
                    </span>
                  </div>

                  {/* Student Bio */}
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-normal">
                    "{student.bio}"
                  </p>

                  {/* Skills Pill Cloud */}
                  <div>
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      {student.skills.map((sk, idx) => (
                        <span key={idx} className="px-2.5 py-0.5 rounded-lg text-[10px] font-semibold bg-slate-900 border border-slate-800 text-slate-200">
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* "I'm here for" badges */}
                  <div className="pt-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Looking For</span>
                    <div className="flex flex-wrap gap-1">
                      {student.here_for.map((intent, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-950/50 border border-indigo-500/30 text-indigo-300">
                          {intent === 'friends' && '🤝 Friends'}
                          {intent === 'networking' && '💼 Networking'}
                          {intent === 'projects' && '💻 Projects'}
                          {intent === 'collaboration' && '⚡ Collab'}
                          {intent === 'dating' && '❤️ Dating'}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Bar */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2">
                  <button
                    onClick={() => setTargetStudentModal(student)}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 text-slate-950 font-black text-xs shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                  >
                    <UserPlus className="w-4 h-4 stroke-[2.5]" />
                    <span>Connect Intent</span>
                  </button>

                  <button
                    onClick={() => startOrOpenConversation(student, 'direct', 'Direct Message')}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors shadow-sm"
                    title="Direct Message"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* CONNECT INTENT MODAL */}
      {targetStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl glass-modal border border-slate-800 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <img src={targetStudentModal.avatar_url} alt={targetStudentModal.full_name} className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-sm text-slate-100">Connect with {targetStudentModal.full_name.split(' ')[0]}</h3>
                  <p className="text-[10px] text-slate-400">{targetStudentModal.course}</p>
                </div>
              </div>
              <button onClick={() => setTargetStudentModal(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendConnect} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">Select Connection Purpose:</label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'projects', label: '💻 Project Teammates' },
                    { id: 'friends', label: '🤝 Friendship' },
                    { id: 'networking', label: '💼 Networking' },
                    { id: 'collaboration', label: '⚡ Collaboration' }
                  ].map(item => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => setConnectIntent(item.id as ConnectionIntent)}
                      className={`p-2.5 rounded-xl text-xs font-semibold border text-left transition-all ${
                        connectIntent === item.id
                          ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 font-bold shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Add Note / Message (Optional)</label>
                <textarea
                  rows={2}
                  value={connectNote}
                  onChange={e => setConnectNote(e.target.value)}
                  placeholder="Introduce yourself or mention why you'd like to connect..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-emerald-500 text-slate-950 font-black text-xs transition-all flex items-center justify-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                Send Connection Request
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
