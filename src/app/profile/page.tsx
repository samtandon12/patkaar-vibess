// PATKAAR VIBESS - STUDENT PROFILE MODULE

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { ConnectionIntent } from '@/lib/types';
import { 
  User, 
  ShieldCheck, 
  Sparkles, 
  Edit3, 
  Code, 
  Trophy, 
  BookOpen, 
  Globe, 
  Link2, 
  AtSign, 
  Share2,
  Plus,
  Check
} from 'lucide-react';

export default function ProfilePage() {
  const { currentUser, updateProfile, showToast } = useApp();
  const [isEditing, setIsEditing] = useState(false);

  // Edit Form state
  const [bio, setBio] = useState(currentUser.bio);
  const [skillsInput, setSkillsInput] = useState(currentUser.skills.join(', '));
  const [interestsInput, setInterestsInput] = useState(currentUser.interests.join(', '));
  const [github, setGithub] = useState(currentUser.social_links.github || '');
  const [linkedin, setLinkedin] = useState(currentUser.social_links.linkedin || '');
  const [twitter, setTwitter] = useState(currentUser.social_links.twitter || '');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      bio,
      skills: skillsInput.split(',').map(s => s.trim()).filter(Boolean),
      interests: interestsInput.split(',').map(i => i.trim()).filter(Boolean),
      social_links: { github, linkedin, twitter }
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      
      {/* Profile Header Card */}
      <div className="rounded-3xl glass-card border border-slate-800 p-6 space-y-6 relative overflow-hidden">
        
        {/* Decorative Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img 
              src={currentUser.avatar_url} 
              alt={currentUser.full_name} 
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-emerald-500/30 shadow-xl" 
            />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-extrabold text-white">{currentUser.full_name}</h1>
                {currentUser.is_verified && <VerificationBadge size="md" />}
              </div>
              <p className="text-xs sm:text-sm text-emerald-400 font-medium mt-0.5">
                {currentUser.course} • {currentUser.branch}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                Year {currentUser.year_of_study} Student • Roll ID: <span className="font-mono text-slate-300">{currentUser.verification_student_id}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-200 flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <Edit3 className="w-4 h-4 text-emerald-400" />
            <span>{isEditing ? 'Cancel Edit' : 'Edit Profile'}</span>
          </button>
        </div>

        {/* Bio */}
        {!isEditing ? (
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal bg-slate-900/50 p-4 rounded-2xl border border-slate-800/80">
            "{currentUser.bio}"
          </p>
        ) : (
          <form onSubmit={handleSave} className="space-y-4 p-4 rounded-2xl bg-slate-900 border border-emerald-500/30">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Update Bio</label>
              <textarea
                rows={3}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Skills (comma separated)</label>
                <input
                  type="text"
                  value={skillsInput}
                  onChange={e => setSkillsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Interests (comma separated)</label>
                <input
                  type="text"
                  value={interestsInput}
                  onChange={e => setInterestsInput(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">GitHub URL</label>
                <input type="text" value={github} onChange={e => setGithub(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200" />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">LinkedIn URL</label>
                <input type="text" value={linkedin} onChange={e => setLinkedin(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200" />
              </div>
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Twitter URL</label>
                <input type="text" value={twitter} onChange={e => setTwitter(e.target.value)} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200" />
              </div>
            </div>

            <button type="submit" className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs">
              Save Profile Changes
            </button>
          </form>
        )}

        {/* "I'm Here For" Intents */}
        <div className="space-y-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">I'm Here For</span>
          <div className="flex flex-wrap gap-2">
            {currentUser.here_for.map((intent, idx) => (
              <span key={idx} className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 border border-emerald-500/30 text-emerald-300">
                {intent === 'friends' && '🤝 Friends'}
                {intent === 'networking' && '💼 Networking'}
                {intent === 'projects' && '💻 Project Teammates'}
                {intent === 'collaboration' && '⚡ Collaboration'}
                {intent === 'dating' && '❤️ Dating'}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Skills & Interests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Skills */}
        <div className="p-5 rounded-3xl glass-card border border-slate-800 space-y-3">
          <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
            <Code className="w-4 h-4 text-emerald-400" />
            Skills & Stack
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {currentUser.skills.map((sk, i) => (
              <span key={i} className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-200">
                {sk}
              </span>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="p-5 rounded-3xl glass-card border border-slate-800 space-y-3">
          <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            Achievements
          </h3>
          <div className="space-y-2">
            {currentUser.achievements.map((ach, i) => (
              <div key={i} className="p-2.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
                <span className="font-bold text-slate-200">{ach.title}</span>
                <span className="text-[10px] text-slate-500 block">{ach.year}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Projects */}
      <div className="p-5 rounded-3xl glass-card border border-slate-800 space-y-3">
        <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-indigo-400" />
          Featured Projects
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {currentUser.projects.map((proj, i) => (
            <div key={i} className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-1">
              <h4 className="font-bold text-xs text-emerald-300">{proj.title}</h4>
              <p className="text-xs text-slate-400">{proj.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
