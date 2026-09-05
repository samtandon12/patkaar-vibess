// PATKAAR VIBESS - REAL-TIME STUDENT CHAT CENTER

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { 
  MessageSquare, 
  Send, 
  ShoppingBag, 
  Heart, 
  Users, 
  MoreVertical, 
  Flag, 
  Trash2, 
  CheckCheck,
  Search,
  ArrowLeft
} from 'lucide-react';

export default function ChatMessagesPage() {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    getConversationMessages, 
    sendMessage, 
    currentUser,
    submitReport,
    showToast 
  } = useApp();

  const [messageInput, setMessageInput] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showMobileChat, setShowMobileChat] = useState(false);

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const messages = activeConv ? getConversationMessages(activeConv.id) : [];

  const filteredConversations = conversations.filter(c => {
    if (filterType === 'all') return true;
    return c.type === filterType;
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConv || !messageInput.trim()) return;
    sendMessage(activeConv.id, messageInput);
    setMessageInput('');
  };

  return (
    <div className="h-[calc(100vh-6rem)] max-w-5xl mx-auto flex rounded-3xl glass-card border border-slate-800 overflow-hidden">
      
      {/* LEFT SIDEBAR: Conversation Threads List */}
      <div className={`w-full md:w-80 shrink-0 border-r border-slate-800 flex flex-col ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
        
        {/* Header */}
        <div className="p-4 border-b border-slate-800 space-y-3">
          <h2 className="font-extrabold text-base text-white flex items-center gap-2">
            Messages & Inquiries
            <MessageSquare className="w-4 h-4 text-emerald-400" />
          </h2>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
            {[
              { id: 'all', label: 'All' },
              { id: 'direct', label: 'Direct' },
              { id: 'marketplace', label: 'Market' },
              { id: 'match', label: 'Dating Match' }
            ].map(f => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-colors ${
                  filterType === f.id ? 'bg-emerald-500 text-slate-950' : 'bg-slate-900 text-slate-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Thread Stream */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredConversations.length === 0 ? (
            <p className="text-xs text-slate-500 text-center py-10">No active chat threads.</p>
          ) : (
            filteredConversations.map(conv => {
              const isActive = conv.id === activeConv?.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => {
                    setActiveConversationId(conv.id);
                    setShowMobileChat(true);
                  }}
                  className={`p-3 rounded-2xl cursor-pointer transition-all flex items-center gap-3 ${
                    isActive 
                      ? 'bg-slate-900 border border-emerald-500/40 shadow-sm' 
                      : 'hover:bg-slate-900/50 border border-transparent'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img src={conv.participant.avatar_url} alt={conv.participant.full_name} className="w-10 h-10 rounded-xl object-cover" />
                    {conv.type === 'marketplace' && (
                      <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-teal-500 text-slate-950">
                        <ShoppingBag className="w-3 h-3" />
                      </span>
                    )}
                    {conv.type === 'match' && (
                      <span className="absolute -bottom-1 -right-1 p-0.5 rounded-full bg-pink-500 text-white">
                        <Heart className="w-3 h-3 fill-white" />
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-xs text-slate-200 truncate">{conv.participant.full_name}</h4>
                      <span className="text-[10px] text-slate-500">
                        {conv.last_message ? new Date(conv.last_message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}
                      </span>
                    </div>
                    
                    <p className="text-[11px] text-slate-400 truncate mt-0.5">
                      {conv.last_message ? conv.last_message.content : conv.related_title}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>

      {/* RIGHT SIDEBAR: Chat Thread View */}
      {activeConv ? (
        <div className={`flex-1 flex-col ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
          
          {/* Active Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/40">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowMobileChat(false)} 
                className="md:hidden p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <img src={activeConv.participant.avatar_url} alt={activeConv.participant.full_name} className="w-10 h-10 rounded-xl object-cover" />
              
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-slate-100">{activeConv.participant.full_name}</h3>
                  {activeConv.participant.is_verified && <VerificationBadge size="sm" showText={false} />}
                </div>
                <p className="text-[11px] text-slate-400">
                  {activeConv.related_title || activeConv.participant.course}
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <button
              onClick={() => {
                submitReport('user', activeConv.participant.id, 'harassment', 'Reported via Chat', activeConv.participant);
              }}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 transition-colors text-xs flex items-center gap-1"
              title="Report User"
            >
              <Flag className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Report</span>
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-950/30">
            {messages.length === 0 ? (
              <div className="text-center py-12 text-xs text-slate-500">
                Say hello to {activeConv.participant.full_name.split(' ')[0]}!
              </div>
            ) : (
              messages.map(msg => {
                const isMe = msg.sender.id === currentUser.id;
                return (
                  <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <div 
                      className={`max-w-xs sm:max-w-md px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                        isMe 
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-medium shadow-md' 
                          : 'bg-slate-900 border border-slate-800 text-slate-200'
                      }`}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[9px] text-slate-500 mt-1 px-1">
                      {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })
            )}
          </div>

          {/* Send Input Footer */}
          <form onSubmit={handleSend} className="p-3 border-t border-slate-800 flex items-center gap-2 bg-slate-900/60">
            <input
              type="text"
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              placeholder={`Message ${activeConv.participant.full_name.split(' ')[0]}...`}
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all"
            >
              <Send className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-500 text-xs">
          Select a chat thread to view conversation.
        </div>
      )}

    </div>
  );
}
