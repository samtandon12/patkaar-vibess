// PATKAAR VIBESS - BOTTOM NAVIGATION BAR FOR MOBILE DEVICIES

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/lib/store';
import { 
  Home, 
  Search, 
  Plus, 
  ShoppingBag, 
  MessageSquare, 
  User, 
  X,
  FileText,
  Tag,
  Radio,
  Calendar
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { conversations } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const totalUnreadMessages = conversations.reduce((acc, c) => acc + c.unread_count, 0);

  const navItems = [
    { name: 'Feed', href: '/feed', icon: Home },
    { name: 'Discover', href: '/discover', icon: Search },
    { name: 'Create', href: '#', isAction: true },
    { name: 'Market', href: '/marketplace', icon: ShoppingBag },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 glass-nav border-t border-slate-800/80 px-2 py-2">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {navItems.map((item, idx) => {
            if (item.isAction) {
              return (
                <button
                  key="create_fab"
                  onClick={() => setShowCreateModal(true)}
                  className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-500 to-indigo-600 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-500/30 font-bold -mt-5 hover:scale-105 active:scale-95 transition-transform"
                  aria-label="Create Post or Listing"
                >
                  <Plus className="w-6 h-6 text-slate-950 stroke-[3]" />
                </button>
              );
            }

            const Icon = item.icon;
            const isActive = pathname === item.href;
            if (!Icon) return null;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition-colors ${
                  isActive ? 'text-emerald-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.href === '/messages' && totalUnreadMessages > 0 && (
                    <span className="absolute -top-1 -right-1.5 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[9px] font-extrabold flex items-center justify-center">
                      {totalUnreadMessages}
                    </span>
                  )}
                </div>
                <span className="text-[10px]">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick Action Modal Triggered by FAB */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl glass-modal border border-slate-800 p-5 space-y-4 animate-in slide-in-from-bottom-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-extrabold text-base text-slate-100">Create Something New</h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/feed"
                onClick={() => setShowCreateModal(false)}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-950/30 flex flex-col items-start gap-2 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-200">Campus Post</h4>
                  <p className="text-[10px] text-slate-400">Share updates, polls, memes or lost & found.</p>
                </div>
              </Link>

              <Link
                href="/marketplace"
                onClick={() => setShowCreateModal(false)}
                className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 hover:bg-indigo-950/30 flex flex-col items-start gap-2 transition-all group"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-200">Marketplace Listing</h4>
                  <p className="text-[10px] text-slate-400">Sell books, tech, gadgets or offer tutoring.</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
