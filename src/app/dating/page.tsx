// PATKAAR VIBESS - OPTIONAL STUDENT DATING MODULE (18+ Opt-In Only)

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import confetti from 'canvas-confetti';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  X, 
  Check, 
  MessageSquare, 
  Lock, 
  AlertTriangle, 
  SlidersHorizontal,
  Flame,
  UserCheck
} from 'lucide-react';

export default function StudentDatingPage() {
  const { currentUser, datingProfiles, toggleDatingOptIn, swipeDating, startOrOpenConversation, submitReport, showToast } = useApp();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [datingBioInput, setDatingBioInput] = useState(currentUser.dating_bio || '');
  const [confirm18, setConfirm18] = useState(false);
  const [showMatchModal, setShowMatchModal] = useState<any | null>(null);

  const activeCard = datingProfiles[currentIndex];

  const handleOptIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirm18) {
      showToast('⚠️ You must confirm you are 18+ to enable Student Dating.');
      return;
    }
    toggleDatingOptIn(true, datingBioInput);
  };

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // fallback
    }
  };

  const handleSwipe = (isLike: boolean) => {
    if (!activeCard) return;
    const isMatch = swipeDating(activeCard.student.id, isLike);
    if (isMatch) {
      fireConfetti();
      setShowMatchModal(activeCard.student);
    } else if (isLike) {
      showToast(`Liked ${activeCard.student.full_name.split(' ')[0]}'s profile!`);
    }
    if (currentIndex < datingProfiles.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(datingProfiles.length);
    }
  };

  // If user has NOT enabled dating yet, show explicit Opt-In Guard!
  if (!currentUser.is_dating_enabled) {
    return (
      <div className="max-w-xl mx-auto py-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-950/80 border border-pink-500/40 text-pink-300 text-xs font-bold shadow-lg shadow-pink-950/40">
            <Heart className="w-4 h-4 text-pink-400 fill-pink-500/20" />
            <span>Optional 18+ Student Dating</span>
          </div>
          <h1 className="text-3xl font-black text-white">Campus Dating Opt-In</h1>
          <p className="text-xs text-slate-400">
            PATKAAR VIBESS keeps dating completely optional and isolated from your public student profile.
          </p>
        </div>

        <form onSubmit={handleOptIn} className="p-6 sm:p-8 rounded-3xl glass-card border border-pink-500/30 space-y-5 shadow-2xl">
          <div className="p-4 rounded-2xl bg-pink-950/30 border border-pink-500/30 text-xs text-pink-200 space-y-2">
            <p className="font-bold">🔒 Privacy & Consent Protocol</p>
            <ul className="list-disc list-inside space-y-1 text-slate-300 text-[11px]">
              <li>Your profile will NEVER display "User is dating" on public feeds.</li>
              <li>Only other 18+ verified students who also opted-in can see your dating card.</li>
              <li>Mutual match required before dating chat opens.</li>
            </ul>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Dating Bio / Intro</label>
            <textarea
              rows={3}
              value={datingBioInput}
              onChange={e => setDatingBioInput(e.target.value)}
              placeholder="e.g. Looking for iced matcha coffee dates, acoustic jams or exploring local food spots around campus..."
              className="w-full p-3 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-pink-500 resize-none"
            />
          </div>

          {/* 18+ Checkbox Confirmation */}
          <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 cursor-pointer">
            <input
              type="checkbox"
              checked={confirm18}
              onChange={e => setConfirm18(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-pink-500 focus:ring-pink-500 bg-slate-950 border-slate-800"
            />
            <span className="text-xs text-slate-300">
              I confirm I am <strong>18 years of age or older</strong> and explicitly consent to activate my student dating profile.
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black text-sm shadow-xl shadow-pink-500/25 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <Heart className="w-4 h-4 fill-white" />
            Enable Dating & Discover Matches
          </button>
        </form>
      </div>
    );
  }

  // When Dating is Active: Show Swipe Deck UI
  return (
    <div className="max-w-md mx-auto space-y-6">
      
      {/* Title & Privacy Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            Campus Dating
            <Heart className="w-5 h-5 text-pink-400 fill-pink-500" />
          </h1>
          <p className="text-xs text-slate-400">
            Verified student matches • Mutual likes only
          </p>
        </div>

        <button
          onClick={() => toggleDatingOptIn(false)}
          className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-400 hover:text-rose-400 transition-colors"
        >
          Disable Dating
        </button>
      </div>

      {/* Profile Card Deck */}
      {!activeCard || currentIndex >= datingProfiles.length ? (
        <div className="p-12 text-center rounded-3xl glass-card border border-slate-800 space-y-3 shadow-xl">
          <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-base text-slate-200">That's everyone for today!</h3>
          <p className="text-xs text-slate-400">
            Check back later as more students opt-in to campus dating.
          </p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-pink-300 hover:bg-slate-800"
          >
            Rewind Deck
          </button>
        </div>
      ) : (
        <div className="relative rounded-3xl overflow-hidden glass-card border border-pink-500/40 shadow-2xl space-y-4 pb-5 animate-in fade-in">
          
          {/* Main Photo Banner */}
          <div className="relative h-96 bg-slate-900">
            <img 
              src={activeCard.photos[0] || activeCard.student.avatar_url} 
              alt={activeCard.student.full_name} 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-end p-5">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-black text-white">{activeCard.student.full_name.split(' ')[0]}</h2>
                <VerificationBadge size="sm" showText={false} />
              </div>
              <p className="text-xs text-pink-300 font-bold">{activeCard.student.course} ({activeCard.student.branch})</p>
              <p className="text-[10px] text-slate-400 mt-0.5">{activeCard.distance}</p>
            </div>
          </div>

          {/* Bio & Prompts */}
          <div className="px-5 space-y-3">
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              "{activeCard.bio}"
            </p>

            {activeCard.prompts && activeCard.prompts.map((p, i) => (
              <div key={i} className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs space-y-1 shadow-inner">
                <span className="text-[10px] font-bold text-pink-400 block">{p.question}</span>
                <p className="text-slate-300 font-medium">{p.answer}</p>
              </div>
            ))}
          </div>

          {/* Swipe Buttons (Pass & Like) */}
          <div className="px-5 pt-2 flex items-center justify-center gap-6">
            <button
              onClick={() => handleSwipe(false)}
              className="w-14 h-14 rounded-full bg-slate-900 border border-slate-800 hover:border-rose-500/50 text-slate-400 hover:text-rose-400 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all"
              aria-label="Pass"
            >
              <X className="w-6 h-6 stroke-[3]" />
            </button>

            <button
              onClick={() => handleSwipe(true)}
              className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-pink-500/30 hover:scale-110 active:scale-95 transition-all"
              aria-label="Like"
            >
              <Heart className="w-7 h-7 fill-white stroke-[2]" />
            </button>
          </div>

        </div>
      )}

      {/* MUTUAL MATCH CELEBRATION MODAL */}
      {showMatchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in zoom-in-95">
          <div className="w-full max-w-sm rounded-3xl glass-modal border border-pink-500/50 p-6 text-center space-y-5 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto ring-4 ring-pink-500/30 animate-bounce">
              <Sparkles className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                IT'S A MUTUAL MATCH!
              </h2>
              <p className="text-xs text-slate-300">
                You and <strong>{showMatchModal.full_name}</strong> liked each other!
              </p>
            </div>

            <div className="flex items-center justify-center -space-x-3 py-2">
              <img src={currentUser.avatar_url} alt={currentUser.full_name} className="w-16 h-16 rounded-full object-cover ring-4 ring-slate-950" />
              <img src={showMatchModal.avatar_url} alt={showMatchModal.full_name} className="w-16 h-16 rounded-full object-cover ring-4 ring-slate-950" />
            </div>

            <div className="space-y-2">
              <button
                onClick={() => {
                  const convId = startOrOpenConversation(showMatchModal, 'match', 'Mutual Dating Match');
                  setShowMatchModal(null);
                  window.location.href = '/messages';
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-xs shadow-lg shadow-pink-500/30"
              >
                Send Dating Message Now
              </button>

              <button
                onClick={() => setShowMatchModal(null)}
                className="w-full py-2.5 rounded-2xl bg-slate-900 text-slate-400 font-semibold text-xs hover:text-white"
              >
                Keep Swiping
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
