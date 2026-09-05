// PATKAAR VIBESS - PUBLIC LANDING PAGE (LUXURY SLEEK SYSTEM)

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  ShieldCheck, 
  Sparkles, 
  Users, 
  ShoppingBag, 
  Heart, 
  MessageSquare, 
  Radio, 
  Calendar, 
  Lock,
  ArrowRight,
  CheckCircle2,
  Flame,
  Zap,
  Globe
} from 'lucide-react';
import { MOCK_POSTS, MOCK_MARKETPLACE, MOCK_CLUBS, MOCK_EVENTS } from '@/lib/mockData';

export default function LandingPage() {
  const [activeTabPreview, setActiveTabPreview] = useState<'feed' | 'discover' | 'market' | 'dating'>('feed');

  return (
    <div className="space-y-16 py-6 sm:py-10">
      
      {/* HERO SECTION */}
      <section className="relative text-center space-y-6 max-w-4xl mx-auto pt-4">
        
        {/* Verified Badge Tag */}
        <div className="inline-flex items-center gap-2 px-4.5 py-1.5 rounded-full bg-gradient-to-r from-amber-950/60 via-slate-950 to-emerald-950/60 border border-amber-500/40 text-amber-300 text-xs sm:text-sm font-extrabold shadow-xl shadow-amber-950/40 animate-pulse-subtle">
          <ShieldCheck className="w-4.5 h-4.5 text-amber-400" />
          <span>Strictly Verified Students Only • Zero Faculty Access</span>
        </div>

        {/* Hero Title & Tagline */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white leading-none">
            PATKAAR <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-indigo-300 bg-clip-text text-transparent">VIBESS</span>
          </h1>
          <p className="text-xl sm:text-3xl font-black text-slate-200 tracking-wide">
            Your Campus. Your People. Your Vibes.
          </p>
        </div>

        {/* Description */}
        <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
          A private, verified student-only ecosystem to connect with peers, buy & sell textbooks, find hackathon teammates, join student societies, and experience authentic college life.
        </p>

        {/* Primary Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/auth/signup"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/25 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Sparkles className="w-5 h-5 fill-slate-950" />
            Join PATKAAR VIBESS
          </Link>
          <Link
            href="/feed"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 font-bold text-base border border-slate-700 hover:border-slate-500 transition-all flex items-center justify-center gap-2 shadow-lg"
          >
            Explore Campus Feed
            <ArrowRight className="w-5 h-5 text-emerald-400" />
          </Link>
        </div>

        {/* Feature Highlights Bar */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-slate-400 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Instant Student ID Verification</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
            <span>Intent-Based Networking</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Student Marketplace</span>
          </div>
        </div>

      </section>

      {/* ECOSYSTEM CARDS GRID WITH LUXURY TOP GLOW LINES */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Built Exclusively for Campus Life
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Everything you need for networking, buying, selling, and collaborating.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Card 1: Campus Feed */}
          <div className="p-6 rounded-3xl premium-card premium-card-hover glow-top-edge space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Campus Social Feed</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Post text updates, campus memes, lost & found alerts, live polls, and achievements. Keep up with what's trending across departments.
            </p>
          </div>

          {/* Card 2: Student Discovery */}
          <div className="p-6 rounded-3xl premium-card premium-card-hover glow-top-edge space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Discover Teammates & Friends</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Search students by course, branch, year, skills, or interests. Connect specifically for hackathons, study groups, or campus networking.
            </p>
          </div>

          {/* Card 3: Student Marketplace */}
          <div className="p-6 rounded-3xl premium-card premium-card-hover glow-top-edge space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Student-to-Student Market</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Buy and sell engineering books, Raspberry Pis, hostel furniture, or offer freelance tutoring directly to verified peers.
            </p>
          </div>

          {/* Card 4: Real-time Chat */}
          <div className="p-6 rounded-3xl premium-card premium-card-hover glow-top-edge space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Direct & Marketplace Messaging</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Chat 1-on-1 with sellers, project partners, or connection matches with integrated safety, reporting, and online indicators.
            </p>
          </div>

          {/* Card 5: Student Clubs & Events */}
          <div className="p-6 rounded-3xl premium-card premium-card-hover glow-top-edge space-y-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Student-Run Clubs & Fests</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Discover student tech societies, music clubs, and hackathons. RSVP for upcoming campus events and join member rosters.
            </p>
          </div>

          {/* Card 6: Optional Dating */}
          <div className="p-6 rounded-3xl premium-card premium-card-hover glow-top-edge space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-100">Optional 18+ Student Dating</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explicit opt-in only. Discover fellow single students on campus with mutual matching, private match chat, and strict privacy controls.
            </p>
          </div>

        </div>
      </section>

      {/* INTERACTIVE FEATURE PREVIEW TAB */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Experience the Ecosystem Live
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Click through the interactive previews of student modules.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center justify-center gap-2 p-1.5 rounded-2xl premium-card border border-slate-800 max-w-md mx-auto overflow-x-auto no-scrollbar">
          {[
            { id: 'feed', label: '🔥 Feed' },
            { id: 'discover', label: '👥 Discovery' },
            { id: 'market', label: '🛒 Market' },
            { id: 'dating', label: '❤️ Dating' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTabPreview(tab.id as any)}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                activeTabPreview === tab.id
                  ? 'bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Preview Container */}
        <div className="p-6 rounded-3xl premium-card border border-slate-800 shadow-2xl min-h-[220px]">
          {activeTabPreview === 'feed' && (
            <div className="space-y-4 animate-in fade-in">
              <div className="flex items-center gap-3">
                <img src={MOCK_POSTS[0].author.avatar_url} alt="Author" className="w-10 h-10 rounded-xl object-cover" />
                <div>
                  <h4 className="font-bold text-sm text-slate-100">{MOCK_POSTS[0].author.full_name}</h4>
                  <p className="text-xs text-slate-400">{MOCK_POSTS[0].author.course} • Yr {MOCK_POSTS[0].author.year_of_study}</p>
                </div>
                <span className="ml-auto px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950 border border-emerald-500/30 text-emerald-400">
                  {MOCK_POSTS[0].category}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {MOCK_POSTS[0].content}
              </p>
            </div>
          )}

          {activeTabPreview === 'discover' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in">
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h4 className="font-bold text-sm text-slate-100">Ananya Verma</h4>
                <p className="text-xs text-indigo-400 font-semibold">BA Journalism • Year 2</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Video Editing</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Podcasting</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
                <h4 className="font-bold text-sm text-slate-100">Rohan Mehta</h4>
                <p className="text-xs text-emerald-400 font-semibold">B.Tech EC • Year 4</p>
                <div className="flex flex-wrap gap-1 pt-1">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Robotics</span>
                  <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300">Arduino</span>
                </div>
              </div>
            </div>
          )}

          {activeTabPreview === 'market' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in">
              {MOCK_MARKETPLACE.slice(0, 2).map(m => (
                <div key={m.id} className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
                  <img src={m.images[0]} alt={m.title} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div>
                    <h4 className="font-bold text-xs text-slate-100 line-clamp-1">{m.title}</h4>
                    <p className="text-xs font-black text-emerald-400 mt-0.5">₹{m.price}</p>
                    <span className="text-[10px] text-slate-400 block mt-0.5">Seller: {m.seller.full_name.split(' ')[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTabPreview === 'dating' && (
            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 text-center space-y-3 animate-in fade-in">
              <div className="w-10 h-10 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <Heart className="w-5 h-5 fill-rose-500" />
              </div>
              <h4 className="font-extrabold text-sm text-slate-100">Strictly 18+ Optional Student Dating</h4>
              <p className="text-xs text-slate-300 max-w-md mx-auto">
                Isolated from public profile views. Requires explicit consent & mutual match before dating chat opens!
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ZERO FACULTY GUARANTEE BANNER */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-950 via-emerald-950/40 to-slate-950 border border-emerald-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-extrabold tracking-wider text-emerald-400 uppercase">
            <Lock className="w-4 h-4 text-emerald-400" />
            Absolute Privacy Guarantee
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            100% Student-Only Access
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
            No professors, administrators, corporate recruiters, parents, or outside accounts allowed. PATKAAR VIBESS is built exclusively for authentic student-to-student interaction.
          </p>
        </div>
        <Link
          href="/auth/verify"
          className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-emerald-500/40 text-emerald-300 text-xs sm:text-sm font-bold whitespace-nowrap transition-all shadow-md"
        >
          Verify Student Credentials →
        </Link>
      </section>

      {/* FINAL CTA FOOTER */}
      <section className="text-center py-12 px-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h2 className="text-2xl sm:text-4xl font-black text-white">
          Ready to experience your campus life?
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Join thousands of verified students on PATKAAR VIBESS today.
        </p>
        <div className="pt-2">
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/25 hover:scale-105 transition-all"
          >
            Get Started Now
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </Link>
        </div>
      </section>

    </div>
  );
}
