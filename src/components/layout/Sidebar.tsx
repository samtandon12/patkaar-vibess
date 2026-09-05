// PATKAAR VIBESS - SIDEBAR LAYOUT COMPONENT (FROSTED GLASS SYSTEM)

'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { 
  Home, 
  Search, 
  Users, 
  ShoppingBag, 
  MessageSquare, 
  Radio, 
  Calendar, 
  Briefcase, 
  Heart, 
  ShieldAlert,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { currentUser, conversations } = useApp();

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + c.unread_count, 0);

  const mainNav = [
    { name: 'Campus Feed', href: '/feed', icon: Home },
    { name: 'Discover Students', href: '/discover', icon: Search },
    { name: 'Connections', href: '/connections', icon: Users },
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
    { name: 'Messages', href: '/messages', icon: MessageSquare, badge: totalUnreadMessages },
  ];

  const secondaryNav = [
    { name: 'Student Clubs', href: '/clubs', icon: Radio },
    { name: 'Campus Events', href: '/events', icon: Calendar },
    { name: 'Opportunities', href: '/opportunities', icon: Briefcase },
    { name: 'Student Dating', href: '/dating', icon: Heart, isDating: true },
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 shrink-0 p-4 sticky top-16 h-[calc(100vh-4rem)] border-r border-white/10 bg-slate-950/20 backdrop-blur-xl">
      
      {/* Student Badge Card */}
      <div className="p-3.5 rounded-3xl glass-card border border-white/10 shadow-lg mb-4 group hover:border-emerald-500/40 transition-all">
        <div className="flex items-center gap-3">
          <div className="p-[1.5px] rounded-xl bg-gradient-to-tr from-emerald-400 to-cyan-400 shrink-0">
            <img src={currentUser.avatar_url} alt={currentUser.full_name} className="w-10 h-10 rounded-[10px] object-cover" />
          </div>
          <div className="overflow-hidden">
            <h3 className="font-extrabold text-xs text-slate-100 truncate">{currentUser.full_name}</h3>
            <p className="text-[11px] text-slate-400 truncate">{currentUser.course} ({currentUser.branch})</p>
          </div>
        </div>
        <div className="mt-2.5 flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Verified Student
          </span>
          <span className="text-[10px] text-slate-400 font-semibold">Yr {currentUser.year_of_study}</span>
        </div>
      </div>

      {/* Primary Navigation Links */}
      <div className="space-y-1">
        <p className="px-3 text-[10px] font-black text-slate-500 tracking-widest uppercase mb-1">
          Campus Core
        </p>
        {mainNav.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-xs transition-all ${
                isActive 
                  ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 shadow-md backdrop-blur-md' 
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              {item.badge !== undefined && item.badge > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-400 text-slate-950 shadow-sm">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Secondary Navigation Links */}
      <div className="mt-6 space-y-1">
        <p className="px-3 text-[10px] font-black text-slate-500 tracking-widest uppercase mb-1">
          Ecosystem
        </p>
        {secondaryNav.map(item => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl font-bold text-xs transition-all ${
                isActive 
                  ? item.isDating 
                    ? 'bg-pink-950/50 border border-pink-500/40 text-pink-300 backdrop-blur-md' 
                    : 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 backdrop-blur-md'
                  : 'text-slate-300 hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${item.isDating ? 'text-pink-400' : isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.name}</span>
              </div>
              {item.isDating && currentUser.is_dating_enabled && (
                <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse shadow-sm"></span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Platform Moderation Tool */}
      {currentUser.is_moderator && (
        <div className="mt-auto pt-4 border-t border-white/10">
          <Link
            href="/moderation"
            className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-bold text-xs border transition-all ${
              pathname === '/moderation'
                ? 'bg-amber-950/60 border-amber-500/50 text-amber-300 backdrop-blur-md'
                : 'glass-pill border-amber-500/30 text-amber-400 hover:bg-amber-950/40'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Platform Moderation</span>
          </Link>
        </div>
      )}

      {/* Student Rules Disclaimer */}
      <div className="mt-4 p-3 rounded-2xl glass-card border border-white/10 text-[10px] text-slate-400 leading-tight space-y-1">
        <p className="font-bold text-slate-300">🔒 100% Student Protected</p>
        <span>Strict verification • Zero faculty access</span>
      </div>

    </aside>
  );
};
