// PATKAAR VIBESS - STUDENT MARKETPLACE MODULE

'use client';

import React, { useState } from 'react';
import { useApp } from '@/lib/store';
import { MarketplaceCategory, MarketplaceListing } from '@/lib/types';
import { VerificationBadge } from '@/components/common/VerificationBadge';
import { 
  ShoppingBag, 
  Plus, 
  Search, 
  Tag, 
  MessageSquare, 
  CheckCircle, 
  X, 
  BookOpen, 
  Laptop, 
  Info,
  DollarSign
} from 'lucide-react';

export default function MarketplacePage() {
  const { listings, currentUser, addListing, markListingAsSold, startOrOpenConversation, showToast } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedListingDetail, setSelectedListingDetail] = useState<MarketplaceListing | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [category, setCategory] = useState<MarketplaceCategory>('electronics');
  const [condition, setCondition] = useState<'new' | 'like_new' | 'good' | 'fair'>('good');
  const [imageUrl, setImageUrl] = useState('');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'books', label: '📚 Books & Notes' },
    { id: 'electronics', label: '💻 Electronics' },
    { id: 'furniture', label: '🪑 Hostel Furniture' },
    { id: 'clothes', label: '👕 Clothes & Accessories' },
    { id: 'tutoring', label: '🎓 Tutoring & Services' },
    { id: 'gaming', label: '🎮 Gaming' }
  ];

  const filteredListings = listings.filter(l => {
    const matchesCat = activeCategory === 'all' || l.category === activeCategory;
    const matchesQuery = 
      l.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || price === '') return;
    addListing(
      title,
      description,
      Number(price),
      category,
      condition,
      imageUrl ? [imageUrl] : []
    );
    setTitle('');
    setDescription('');
    setPrice('');
    setImageUrl('');
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            Campus Marketplace
            <ShoppingBag className="w-5 h-5 text-teal-400" />
          </h1>
          <p className="text-xs text-slate-400">
            Student-to-student buy, sell & tutoring services within campus.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-teal-400 to-emerald-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-teal-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>Post Listing</span>
        </button>
      </div>

      {/* Offline Safety Notice */}
      <div className="p-3.5 rounded-2xl bg-teal-950/30 border border-teal-500/30 text-xs text-teal-300 flex items-center gap-3">
        <Info className="w-4 h-4 text-teal-400 shrink-0" />
        <span>
          <strong>Campus Flow:</strong> Discover Item → Chat with Verified Seller → Inspect & Complete Transaction Offline. No platform fees!
        </span>
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-3xl glass-card border border-slate-800 space-y-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search textbooks, Raspberry Pi, hostel chairs, notes, or tutors..."
            className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-teal-500/60"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                activeCategory === cat.id 
                  ? 'bg-teal-500 text-slate-950 border-teal-400 font-extrabold shadow-sm' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Marketplace Listings Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredListings.length === 0 ? (
          <div className="col-span-full p-12 text-center rounded-3xl glass-card border border-slate-800 text-slate-400 text-xs">
            No marketplace listings found. Post the first item!
          </div>
        ) : (
          filteredListings.map(item => {
            const isOwner = item.seller.id === currentUser.id;

            return (
              <div 
                key={item.id} 
                className={`p-4 rounded-3xl glass-card border space-y-3 flex flex-col justify-between transition-all ${
                  item.is_sold ? 'opacity-60 border-slate-800' : 'border-slate-800 hover:border-teal-500/50'
                }`}
              >
                <div className="space-y-3">
                  {/* Image Header */}
                  <div className="relative rounded-2xl overflow-hidden bg-slate-900 h-44 border border-slate-800 group">
                    <img 
                      src={item.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800'} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform" 
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-slate-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                      ₹{item.price.toLocaleString('en-IN')}
                    </div>
                    {item.is_sold && (
                      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
                        <span className="px-4 py-1.5 rounded-full text-xs font-black bg-rose-600 text-white tracking-widest uppercase shadow-xl">
                          SOLD OUT
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title & Seller */}
                  <div>
                    <h3 className="font-bold text-sm text-slate-100 line-clamp-1">{item.title}</h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 line-clamp-2">{item.description}</p>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <img src={item.seller.avatar_url} alt={item.seller.full_name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-[11px] font-medium text-slate-300 truncate">{item.seller.full_name}</span>
                    {item.seller.is_verified && <VerificationBadge size="sm" showText={false} />}
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-900 text-slate-400 uppercase">
                    {item.condition}
                  </span>

                  {isOwner ? (
                    !item.is_sold && (
                      <button
                        onClick={() => markListingAsSold(item.id)}
                        className="px-3 py-1.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-bold hover:bg-rose-900/80 transition-colors"
                      >
                        Mark as Sold
                      </button>
                    )
                  ) : (
                    <button
                      disabled={item.is_sold}
                      onClick={() => startOrOpenConversation(item.seller, 'marketplace', item.title, item.id)}
                      className="px-3.5 py-1.5 rounded-xl bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-slate-950 font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Chat Seller</span>
                    </button>
                  )}
                </div>

              </div>
            );
          })
        )}
      </div>

      {/* CREATE LISTING MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl glass-modal border border-slate-800 p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-teal-400" />
                List Item on Marketplace
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Item Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. Operating Systems Textbook / Raspberry Pi 4"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={price}
                    onChange={e => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    placeholder="e.g. 500"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as MarketplaceCategory)}
                    className="w-full px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
                  >
                    <option value="books">Books & Notes</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                    <option value="clothes">Clothes</option>
                    <option value="tutoring">Tutoring / Services</option>
                    <option value="gaming">Gaming</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description & Details</label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Describe condition, edition, specs or pick-up spot on campus..."
                  className="w-full p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none focus:border-teal-500 resize-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Photo Image URL (Optional)</label>
                <input
                  type="url"
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-extrabold text-xs transition-all"
              >
                Publish Marketplace Listing
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
