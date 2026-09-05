// PATKAAR VIBESS - TOP NAVBAR LAYOUT COMPONENT (FROSTED GLASS SYSTEM)

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/lib/store';
import { VerificationBadge } from '../common/VerificationBadge';
import { 
  Bell, 
  Search, 
  Sparkles, 
  Shield, 
  User, 
  LogOut, 
  Heart,
  ChevronDown,
  CheckCircle,
  Zap
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, notifications, markNotificationRead } = useApp();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <header className="sticky top-0 z-40 w-full glass-nav transition-all border-b border-white/10">
      
      {/* Top Glass Ticker */}
      <div className="bg-slate-950/40 backdrop-blur-md border-b border-white/5 py-1 px-4 text-[11px] text-slate-300 flex items-center justify-between font-medium">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-extrabold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              1,420 Verified Students Active
            </span>
            <span className="hidden md:inline text-slate-700">•</span>
            <span className="hidden md:inline text-slate-300">
              🔥 Trending: <strong className="text-amber-300">PATKAAR HACKS 2026</strong> (Registration Open)
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px]">
            <span className="glass-pill px-2.5 py-0.5 rounded-full text-emerald-300 font-extrabold shadow-sm">
              ✓ 100% Student Protected Space
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand Emblem */}
        <div className="flex items-center gap-3">
          <Link href="/feed" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-400 via-teal-300 to-indigo-500 p-0.5 shadow-lg shadow-emerald-500/30 group-hover:scale-105 transition-all">
              <div className="w-full h-full bg-[#030712]/90 rounded-[14px] flex items-center justify-center backdrop-blur-md">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
            </div>
            <div>
              <h1 className="font-black text-lg tracking-wider bg-gradient-to-r from-emerald-300 via-teal-200 to-indigo-300 bg-clip-text text-transparent">
                PATKAAR VIBESS
              </h1>
              <p className="text-[9px] text-slate-400 tracking-widest font-black uppercase hidden sm:block">
                YOUR CAMPUS. YOUR PEOPLE. YOUR VIBES.
              </p>
            </div>
          </Link>
        </div>

        {/* Global Search Glass Input */}
        <div className="hidden lg:flex items-center flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search students, skills, courses, notes or clubs..." 
              className="w-full pl-10 pr-4 py-2 rounded-2xl glass-input text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-emerald-400/60 focus:bg-slate-950/70 transition-all shadow-inner"
            />
          </div>
        </div>

        {/* Right Nav Actions */}
        <div className="flex items-center gap-2.5">
          
          {/* Notifications Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-2xl glass-pill hover:bg-white/10 text-slate-300 hover:text-white transition-all shadow-sm"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px] flex items-center justify-center shadow-md animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 rounded-3xl glass-modal shadow-2xl p-4 z-50 text-slate-200 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h3 className="font-bold text-sm">Notifications</h3>
                  <span className="text-xs text-emerald-400 font-extrabold">{unreadCount} unread</span>
                </div>

                <div className="mt-3 space-y-2 max-h-80 overflow-y-auto pr-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-6">No notifications yet.</p>
                  ) : (
                    notifications.map(n => (
                      <div 
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className={`p-3 rounded-2xl transition-all cursor-pointer flex gap-3 ${
                          n.is_read 
                            ? 'bg-white/5 hover:bg-white/10' 
                            : 'bg-emerald-950/40 border border-emerald-500/40 hover:bg-emerald-950/60'
                        }`}
                      >
                        <img src={n.actor.avatar_url} alt={n.actor.full_name} className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5 border border-white/10" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-200 truncate">{n.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{n.content}</p>
                          <span className="text-[9px] text-slate-500 mt-1 block">
                            {new Date(n.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Chip */}
          <div className="relative">
            <button 
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center gap-2.5 p-1.5 pl-2 pr-3 rounded-2xl glass-pill hover:bg-white/10 transition-all shadow-sm group"
            >
              <div className="p-[1.5px] rounded-xl bg-gradient-to-tr from-amber-400 via-emerald-400 to-indigo-500 shadow-sm">
                <img 
                  src={currentUser.avatar_url} 
                  alt={currentUser.full_name} 
                  className="w-7 h-7 rounded-[10px] object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="hidden sm:block text-left">
                <div className="flex items-center gap-1">
                  <span className="text-xs font-extrabold text-slate-100">{currentUser.full_name.split(' ')[0]}</span>
                  {currentUser.is_verified && <CheckCircle className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20" />}
                </div>
                <span className="text-[10px] text-slate-400 block -mt-0.5 font-medium">{currentUser.branch.substring(0, 14)}...</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-3 w-64 rounded-3xl glass-modal shadow-2xl p-2.5 z-50 text-slate-200 animate-in fade-in slide-in-from-top-2">
                <div className="p-3 border-b border-white/10">
                  <p className="font-bold text-sm text-slate-100">{currentUser.full_name}</p>
                  <p className="text-xs text-slate-400 truncate">{currentUser.email}</p>
                  <div className="mt-2">
                    <VerificationBadge size="sm" />
                  </div>
                </div>

                <div className="py-1.5 space-y-0.5">
                  <Link 
                    href="/profile" 
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <User className="w-4 h-4 text-emerald-400" />
                    My Student Profile
                  </Link>

                  <Link 
                    href="/dating" 
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <Heart className="w-4 h-4 text-pink-400" />
                    Dating Preferences {currentUser.is_dating_enabled ? '(Active)' : '(Opt-In)'}
                  </Link>

                  {currentUser.is_moderator && (
                    <Link 
                      href="/moderation" 
                      onClick={() => setShowUserDropdown(false)}
                      className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-amber-300 hover:bg-amber-950/40 rounded-xl transition-colors"
                    >
                      <Shield className="w-4 h-4 text-amber-400" />
                      Platform Moderation Queue
                    </Link>
                  )}
                </div>

                <div className="pt-1.5 border-t border-white/10">
                  <Link 
                    href="/auth/login" 
                    onClick={() => setShowUserDropdown(false)}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-bold text-rose-400 hover:bg-rose-950/30 rounded-xl transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Link>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
