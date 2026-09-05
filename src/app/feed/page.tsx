// PATKAAR VIBESS - CAMPUS FEED MODULE (UPGRADED UI/UX)

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { PostType, ReportReason } from '@/lib/types';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { 
  Sparkles, 
  Flame, 
  MessageSquare, 
  Heart, 
  Bookmark, 
  Share2, 
  Flag, 
  Plus, 
  Send, 
  Image as ImageIcon, 
  BarChart2, 
  Search, 
  X,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

export default function CampusFeedPage() {
  const { 
    currentUser, 
    posts, 
    addPost, 
    toggleLikePost, 
    toggleSavePost, 
    addComment, 
    votePoll, 
    submitReport, 
    showToast 
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [openCommentsPostId, setOpenCommentsPostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');
  
  // Post Creation State
  const [newPostContent, setNewPostContent] = useState('');
  const [newPostType, setNewPostType] = useState<PostType>('text');
  const [newPostCategory, setNewPostCategory] = useState('General');
  const [mediaUrlInput, setMediaUrlInput] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']);

  // Report Modal State
  const [reportModalPost, setReportModalPost] = useState<any | null>(null);
  const [reportReason, setReportReason] = useState<ReportReason>('inappropriate_content');
  const [reportDetails, setReportDetails] = useState('');

  const categories = ['All', 'Trending', 'Opportunities', 'Lost & Found', 'Polls', 'Memes', 'Achievements'];

  const filteredPosts = posts.filter(p => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Trending') return p.likes_count > 20;
    if (activeCategory === 'Lost & Found') return p.post_type === 'lost_found';
    if (activeCategory === 'Polls') return p.post_type === 'poll';
    if (activeCategory === 'Memes') return p.category === 'Memes' || p.post_type === 'meme';
    if (activeCategory === 'Achievements') return p.post_type === 'achievement';
    return p.category === activeCategory;
  });

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const media = mediaUrlInput.trim() ? [mediaUrlInput.trim()] : undefined;
    const polls = newPostType === 'poll' ? pollOptions.filter(o => o.trim().length > 0) : undefined;

    addPost(newPostContent, newPostType, newPostCategory, media, polls);
    setNewPostContent('');
    setMediaUrlInput('');
    setPollOptions(['', '']);
    setShowCreateModal(false);
  };

  const handleSendComment = (postId: string) => {
    if (!commentInput.trim()) return;
    addComment(postId, commentInput);
    setCommentInput('');
  };

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportModalPost) return;
    submitReport('post', reportModalPost.id, reportReason, reportDetails, reportModalPost.author);
    setReportModalPost(null);
    setReportDetails('');
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      
      {/* Header Banner */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            Campus Feed
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </h1>
          <p className="text-xs text-slate-400">
            Real-time updates, polls, memes & lost items across campus.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Post</span>
        </button>
      </div>

      {/* Quick Composer Box */}
      <div 
        onClick={() => setShowCreateModal(true)}
        className="p-4 rounded-3xl glass-card border border-slate-800/80 hover:border-emerald-500/40 cursor-pointer transition-all flex items-center gap-3 shadow-md group"
      >
        <img 
          src={currentUser.avatar_url} 
          alt={currentUser.full_name} 
          className="w-10 h-10 rounded-xl object-cover shrink-0 ring-2 ring-emerald-500/30 group-hover:scale-105 transition-transform" 
        />
        <div className="flex-1 bg-slate-900/90 px-4 py-2.5 rounded-2xl text-xs text-slate-400 border border-slate-800">
          What's happening on campus, {currentUser.full_name.split(' ')[0]}?
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <ImageIcon className="w-4 h-4 text-emerald-400" />
          <BarChart2 className="w-4 h-4 text-indigo-400" />
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 border-emerald-300 shadow-md scale-105'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
          >
            {cat === 'Trending' && <Flame className="w-3.5 h-3.5 inline mr-1 text-amber-400 fill-amber-400" />}
            {cat}
          </button>
        ))}
      </div>

      {/* Feed Posts Stream */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center rounded-3xl glass-card border border-slate-800 text-slate-400 text-xs">
            No posts found in this category. Be the first to share something!
          </div>
        ) : (
          filteredPosts.map(post => {
            const isLiked = post.liked_by_me;
            const isSaved = post.saved_by_me;
            const isCommentsOpen = openCommentsPostId === post.id;

            return (
              <article 
                key={post.id} 
                className="p-5 rounded-3xl glass-card glass-card-hover border border-slate-800/80 space-y-4"
              >
                
                {/* Post Author Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.author.avatar_url} 
                      alt={post.author.full_name} 
                      className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-500/30 shadow-sm" 
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-sm text-slate-100">{post.author.full_name}</h3>
                        {post.author.is_verified && <VerificationBadge size="sm" showText={false} />}
                      </div>
                      <p className="text-[11px] text-slate-400">
                        {post.author.course} • Yr {post.author.year_of_study}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-slate-900 border border-slate-800 text-emerald-400 uppercase tracking-wider shadow-inner">
                      {post.category}
                    </span>
                    <button 
                      onClick={() => setReportModalPost(post)}
                      className="p-1.5 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                      title="Report Post"
                    >
                      <Flag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Post Body Content */}
                <div className="text-xs sm:text-sm text-slate-200 leading-relaxed whitespace-pre-line font-normal">
                  {post.content}
                </div>

                {/* Post Media Images */}
                {post.media_urls && post.media_urls.length > 0 && (
                  <div className="rounded-2xl overflow-hidden border border-slate-800 max-h-96 shadow-lg">
                    <img src={post.media_urls[0]} alt="Post attachment" className="w-full h-full object-cover" />
                  </div>
                )}

                {/* Poll Interactive UI */}
                {post.post_type === 'poll' && post.poll_data && (
                  <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <p className="text-xs font-bold text-slate-200">{post.poll_data.question}</p>
                    <div className="space-y-2">
                      {post.poll_data.options.map((opt) => {
                        const totalVotes = post.poll_data!.options.reduce((acc, o) => acc + o.votes.length, 0);
                        const optVotes = opt.votes.length;
                        const pct = totalVotes > 0 ? Math.round((optVotes / totalVotes) * 100) : 0;
                        const hasVoted = opt.votes.includes(currentUser.id);

                        return (
                          <button
                            key={opt.id}
                            onClick={() => votePoll(post.id, opt.id)}
                            className={`w-full relative p-3 rounded-xl border text-left overflow-hidden transition-all ${
                              hasVoted 
                                ? 'border-emerald-500/60 bg-emerald-950/30 shadow-md' 
                                : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                            }`}
                          >
                            <div 
                              className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 transition-all duration-500" 
                              style={{ width: `${pct}%` }} 
                            />
                            <div className="relative flex items-center justify-between text-xs font-bold text-slate-200">
                              <span>{opt.text}</span>
                              <span className="text-[11px] text-emerald-400 font-mono">{pct}% ({optVotes})</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Post Footer Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-slate-400 text-xs">
                  <div className="flex items-center gap-4">
                    
                    {/* Like Button */}
                    <button 
                      onClick={() => toggleLikePost(post.id)}
                      className={`flex items-center gap-1.5 transition-all ${
                        isLiked ? 'text-rose-500 font-extrabold scale-105' : 'hover:text-rose-400'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 animate-heart-beat' : ''}`} />
                      <span>{post.likes_count}</span>
                    </button>

                    {/* Comment Drawer Toggle */}
                    <button 
                      onClick={() => setOpenCommentsPostId(isCommentsOpen ? null : post.id)}
                      className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.comments_count}</span>
                    </button>

                    {/* Share Link */}
                    <button 
                      onClick={() => {
                        navigator.clipboard?.writeText?.(window.location.href);
                        showToast('Link copied to clipboard!');
                      }}
                      className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
                    >
                      <Share2 className="w-4 h-4" />
                      <span className="hidden sm:inline">Share</span>
                    </button>

                  </div>

                  {/* Bookmark Save */}
                  <button 
                    onClick={() => toggleSavePost(post.id)}
                    className={`transition-colors ${isSaved ? 'text-emerald-400' : 'hover:text-emerald-400'}`}
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-emerald-400' : ''}`} />
                  </button>
                </div>

                {/* Collapsible Comments Section */}
                {isCommentsOpen && (
                  <div className="pt-3 border-t border-slate-800/80 space-y-3 animate-in fade-in">
                    <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                      {(!post.comments || post.comments.length === 0) ? (
                        <p className="text-xs text-slate-500 italic">No comments yet. Start the conversation!</p>
                      ) : (
                        post.comments.map(c => (
                          <div key={c.id} className="flex items-start gap-2.5 p-3 rounded-2xl bg-slate-900/60 border border-slate-800">
                            <img src={c.author.avatar_url} alt={c.author.full_name} className="w-7 h-7 rounded-lg object-cover shrink-0 mt-0.5" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-slate-200">{c.author.full_name}</span>
                                <span className="text-[10px] text-slate-500">
                                  {new Date(c.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 mt-0.5">{c.content}</p>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    {/* Write Comment Bar */}
                    <div className="flex items-center gap-2 pt-1">
                      <input 
                        type="text"
                        value={commentInput}
                        onChange={e => setCommentInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSendComment(post.id)}
                        placeholder="Write a reply to fellow student..."
                        className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                      <button 
                        onClick={() => handleSendComment(post.id)}
                        className="p-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-md"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

              </article>
            );
          })
        )}
      </div>

      {/* CREATE POST MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl glass-modal border border-slate-800 p-6 space-y-4 animate-in zoom-in-95 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="font-bold text-base text-slate-100 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                Create Campus Post
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 rounded-full text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              
              {/* Type Selectors */}
              <div className="flex flex-wrap gap-2">
                {[
                  { type: 'text', label: '💬 Text Post' },
                  { type: 'image', label: '📷 Image' },
                  { type: 'poll', label: '📊 Poll' },
                  { type: 'lost_found', label: '🚨 Lost & Found' },
                  { type: 'opportunity', label: '💼 Opportunity' }
                ].map(item => (
                  <button
                    type="button"
                    key={item.type}
                    onClick={() => setNewPostType(item.type as PostType)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      newPostType === item.type 
                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold' 
                        : 'bg-slate-900 border-slate-800 text-slate-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Main Content Textarea */}
              <textarea
                rows={4}
                required
                value={newPostContent}
                onChange={e => setNewPostContent(e.target.value)}
                placeholder="What's happening on campus? Write your text or question here..."
                className="w-full p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 resize-none"
              />

              {/* Optional Image URL Input */}
              <div>
                <input
                  type="url"
                  value={mediaUrlInput}
                  onChange={e => setMediaUrlInput(e.target.value)}
                  placeholder="Optional Image URL (https://...)"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
                />
              </div>

              {/* Optional Poll Options */}
              {newPostType === 'poll' && (
                <div className="space-y-2 p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800">
                  <span className="text-xs font-bold text-slate-300">Poll Options:</span>
                  {pollOptions.map((opt, i) => (
                    <input
                      key={i}
                      type="text"
                      value={opt}
                      onChange={e => {
                        const copy = [...pollOptions];
                        copy[i] = e.target.value;
                        setPollOptions(copy);
                      }}
                      placeholder={`Option ${i + 1}`}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                    />
                  ))}
                  <button
                    type="button"
                    onClick={() => setPollOptions([...pollOptions, ''])}
                    className="text-[11px] text-emerald-400 font-semibold hover:underline"
                  >
                    + Add Option
                  </button>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 hover:scale-[1.01] transition-all"
              >
                Publish to Campus Feed
              </button>
            </form>
          </div>
        </div>
      )}

      {/* REPORT MODAL */}
      {reportModalPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="w-full max-w-md rounded-3xl glass-modal border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-sm text-rose-400 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" />
                Report Content to Moderator Queue
              </h3>
              <button onClick={() => setReportModalPost(null)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleReportSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Reason for Report</label>
                <select
                  value={reportReason}
                  onChange={e => setReportReason(e.target.value as ReportReason)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none"
                >
                  <option value="inappropriate_content">Inappropriate Content</option>
                  <option value="harassment">Harassment or Bullying</option>
                  <option value="spam">Spam or Misleading Info</option>
                  <option value="scam">Scam / Fraud</option>
                  <option value="fake_profile">Fake Profile</option>
                  <option value="other">Other Violation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Details (Optional)</label>
                <textarea
                  rows={2}
                  value={reportDetails}
                  onChange={e => setReportDetails(e.target.value)}
                  placeholder="Provide context for student moderators..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 focus:outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs transition-colors"
              >
                Submit Incident Report
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
