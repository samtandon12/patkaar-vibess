// PATKAAR VIBESS - CENTRAL APPLICATION STATE STORE & CONTEXT

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StudentProfile, 
  PostItem, 
  MarketplaceListing, 
  ClubItem, 
  CampusEvent, 
  StudentOpportunity, 
  ConnectionRequest, 
  ConversationItem, 
  ChatMessage, 
  DatingProfile, 
  ModerationReport,
  NotificationItem,
  ConnectionIntent,
  MarketplaceCategory,
  PostType,
  ReportReason
} from './types';
import { 
  CURRENT_USER, 
  MOCK_STUDENTS, 
  MOCK_POSTS, 
  MOCK_MARKETPLACE, 
  MOCK_CLUBS, 
  MOCK_EVENTS, 
  MOCK_OPPORTUNITIES, 
  MOCK_CONNECTIONS, 
  MOCK_DATING_PROFILES, 
  MOCK_CONVERSATIONS, 
  MOCK_NOTIFICATIONS, 
  MOCK_REPORTS 
} from './mockData';

interface AppContextType {
  currentUser: StudentProfile;
  updateProfile: (data: Partial<StudentProfile>) => void;
  verifyStudent: (studentId: string) => void;
  toggleDatingOptIn: (enabled: boolean, datingBio?: string) => void;
  
  // Feed
  posts: PostItem[];
  addPost: (content: string, post_type: PostType, category: string, media_urls?: string[], poll_options?: string[]) => void;
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  votePoll: (postId: string, optionId: string) => void;
  
  // Discover & Connections
  students: StudentProfile[];
  connections: ConnectionRequest[];
  sendConnectionRequest: (targetStudentId: string, intent: ConnectionIntent, note?: string) => void;
  respondConnectionRequest: (requestId: string, accept: boolean) => void;
  
  // Marketplace
  listings: MarketplaceListing[];
  addListing: (title: string, description: string, price: number, category: MarketplaceCategory, condition: 'new' | 'like_new' | 'good' | 'fair', images: string[]) => void;
  markListingAsSold: (listingId: string) => void;
  
  // Dating
  datingProfiles: DatingProfile[];
  swipeDating: (targetStudentId: string, isLike: boolean) => boolean; // returns true if match
  
  // Messaging
  conversations: ConversationItem[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;
  getConversationMessages: (convId: string) => ChatMessage[];
  sendMessage: (convId: string, text: string) => void;
  startOrOpenConversation: (participant: StudentProfile, type: 'direct' | 'marketplace' | 'connection' | 'match', title?: string, relatedItemId?: string) => string;
  
  // Clubs & Events & Opportunities
  clubs: ClubItem[];
  toggleJoinClub: (clubId: string) => void;
  addClub: (name: string, tagline: string, description: string, category: string) => void;
  events: CampusEvent[];
  toggleRSVPEvent: (eventId: string) => void;
  addEvent: (title: string, description: string, category: 'hackathon' | 'workshop' | 'cultural' | 'sports' | 'seminar' | 'fest', startTime: string, location: string) => void;
  opportunities: StudentOpportunity[];
  addOpportunity: (title: string, organization: string, category: 'internship' | 'hackathon' | 'competition' | 'freelance' | 'project' | 'scholarship', location: string, description: string, stipend?: string) => void;
  
  // Safety & Moderation
  notifications: NotificationItem[];
  markNotificationRead: (notifId: string) => void;
  reports: ModerationReport[];
  submitReport: (targetType: 'user' | 'post' | 'listing' | 'message' | 'dating_profile', targetId: string, reason: ReportReason, details?: string, reportedUser?: StudentProfile) => void;
  resolveReport: (reportId: string, dismiss?: boolean) => void;
  suspendUser: (userId: string) => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<StudentProfile>(CURRENT_USER);
  const [posts, setPosts] = useState<PostItem[]>(MOCK_POSTS);
  const [students, setStudents] = useState<StudentProfile[]>(MOCK_STUDENTS);
  const [connections, setConnections] = useState<ConnectionRequest[]>(MOCK_CONNECTIONS);
  const [listings, setListings] = useState<MarketplaceListing[]>(MOCK_MARKETPLACE);
  const [datingProfiles, setDatingProfiles] = useState<DatingProfile[]>(MOCK_DATING_PROFILES);
  const [clubs, setClubs] = useState<ClubItem[]>(MOCK_CLUBS);
  const [events, setEvents] = useState<CampusEvent[]>(MOCK_EVENTS);
  const [opportunities, setOpportunities] = useState<StudentOpportunity[]>(MOCK_OPPORTUNITIES);
  const [conversations, setConversations] = useState<ConversationItem[]>(MOCK_CONVERSATIONS);
  const [messagesMap, setMessagesMap] = useState<{ [convId: string]: ChatMessage[] }>({
    conv_1: [
      { id: 'm1', conversation_id: 'conv_1', sender: MOCK_STUDENTS[1], content: 'Hey Aarav! Up for guitar jamming?', is_read: true, created_at: '2026-09-04T18:00:00Z' },
      { id: 'm2', conversation_id: 'conv_1', sender: CURRENT_USER, content: 'Hey Ananya! Definitely! I’ll be near the Amphitheatre.', is_read: true, created_at: '2026-09-04T18:10:00Z' },
      { id: 'm3', conversation_id: 'conv_1', sender: MOCK_STUDENTS[1], content: 'Let’s meet at the Amphitheatre around 5:30 PM today! I’ll bring the song chord sheets 🎶', is_read: false, created_at: '2026-09-04T18:20:00Z' }
    ],
    conv_2: [
      { id: 'm4', conversation_id: 'conv_2', sender: CURRENT_USER, content: 'Hey Rohan! Is the Raspberry Pi 4 kit still available? Can meet at the Library cafeteria.', is_read: true, created_at: '2026-09-04T15:10:00Z' }
    ],
    conv_3: [
      { id: 'm5', conversation_id: 'conv_3', sender: MOCK_STUDENTS[1], content: 'It’s a match! Excited to grab coffee together after mid-sems 😊', is_read: true, created_at: '2026-09-04T12:00:00Z' }
    ]
  });
  const [activeConversationId, setActiveConversationId] = useState<string | null>('conv_1');
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [reports, setReports] = useState<ModerationReport[]>(MOCK_REPORTS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const updateProfile = (data: Partial<StudentProfile>) => {
    setCurrentUser(prev => ({ ...prev, ...data }));
    showToast('Profile updated successfully!');
  };

  const verifyStudent = (studentId: string) => {
    setCurrentUser(prev => ({
      ...prev,
      is_verified: true,
      verification_student_id: studentId || 'PAT/2026/VERIFIED'
    }));
    showToast('✓ Verified Student badge granted!');
  };

  const toggleDatingOptIn = (enabled: boolean, datingBio?: string) => {
    setCurrentUser(prev => ({
      ...prev,
      is_dating_enabled: enabled,
      dating_bio: datingBio || prev.dating_bio
    }));
    if (enabled) {
      showToast('Student Dating profile activated (18+ opt-in)!');
    } else {
      showToast('Dating profile disabled.');
    }
  };

  // Feed Actions
  const addPost = (content: string, post_type: PostType, category: string, media_urls?: string[], poll_options?: string[]) => {
    const newPost: PostItem = {
      id: `post_${Date.now()}`,
      author: currentUser,
      content,
      post_type,
      category: category || 'General',
      media_urls,
      poll_data: poll_options && poll_options.length > 0 ? {
        question: content.split('\n')[0] || 'Poll Question',
        options: poll_options.map((opt, i) => ({ id: `opt_${i}`, text: opt, votes: [] }))
      } : undefined,
      likes_count: 0,
      comments_count: 0,
      saves_count: 0,
      comments: [],
      created_at: new Date().toISOString()
    };
    setPosts(prev => [newPost, ...prev]);
    showToast('Post published to Campus Feed!');
  };

  const toggleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const liked = !p.liked_by_me;
        return {
          ...p,
          liked_by_me: liked,
          likes_count: liked ? p.likes_count + 1 : p.likes_count - 1
        };
      }
      return p;
    }));
  };

  const toggleSavePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const saved = !p.saved_by_me;
        if (saved) showToast('Post saved to your bookmarks!');
        return {
          ...p,
          saved_by_me: saved,
          saves_count: saved ? p.saves_count + 1 : p.saves_count - 1
        };
      }
      return p;
    }));
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      post_id: postId,
      author: currentUser,
      content: text.trim(),
      created_at: new Date().toISOString()
    };
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments_count: p.comments_count + 1,
          comments: [...(p.comments || []), newComment]
        };
      }
      return p;
    }));
  };

  const votePoll = (postId: string, optionId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId && p.poll_data) {
        const updatedOptions = p.poll_data.options.map(opt => {
          const hasVoted = opt.votes.includes(currentUser.id);
          if (opt.id === optionId) {
            return hasVoted ? opt : { ...opt, votes: [...opt.votes, currentUser.id] };
          } else {
            return { ...opt, votes: opt.votes.filter(id => id !== currentUser.id) };
          }
        });
        return {
          ...p,
          poll_data: { ...p.poll_data, options: updatedOptions }
        };
      }
      return p;
    }));
  };

  // Connections
  const sendConnectionRequest = (targetId: string, intent: ConnectionIntent, note?: string) => {
    const target = students.find(s => s.id === targetId);
    if (!target) return;
    const newReq: ConnectionRequest = {
      id: `conn_${Date.now()}`,
      sender: currentUser,
      receiver: target,
      intent,
      note,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    setConnections(prev => [newReq, ...prev]);
    showToast(`Connection request sent to ${target.full_name} for ${intent.toUpperCase()}!`);
  };

  const respondConnectionRequest = (requestId: string, accept: boolean) => {
    setConnections(prev => prev.map(c => {
      if (c.id === requestId) {
        return { ...c, status: accept ? 'accepted' : 'declined' };
      }
      return c;
    }));
    showToast(accept ? 'Connection accepted! You can now chat.' : 'Connection request declined.');
  };

  // Marketplace
  const addListing = (title: string, description: string, price: number, category: MarketplaceCategory, condition: 'new' | 'like_new' | 'good' | 'fair', images: string[]) => {
    const newListing: MarketplaceListing = {
      id: `list_${Date.now()}`,
      seller: currentUser,
      title,
      description,
      price,
      category,
      condition,
      images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800'],
      is_sold: false,
      created_at: new Date().toISOString()
    };
    setListings(prev => [newListing, ...prev]);
    showToast('Item listed on Campus Marketplace!');
  };

  const markListingAsSold = (listingId: string) => {
    setListings(prev => prev.map(l => l.id === listingId ? { ...l, is_sold: true } : l));
    showToast('Listing marked as SOLD!');
  };

  // Dating Swipe & Mutual Match
  const swipeDating = (targetId: string, isLike: boolean): boolean => {
    setDatingProfiles(prev => prev.filter(p => p.student.id !== targetId));
    if (isLike) {
      // Simulate mutual match check
      const targetStudent = students.find(s => s.id === targetId);
      if (targetStudent) {
        showToast(`🎉 IT'S A MATCH! You and ${targetStudent.full_name} liked each other!`);
        startOrOpenConversation(targetStudent, 'match', 'Mutual Dating Match');
        return true;
      }
    }
    return false;
  };

  // Messaging
  const getConversationMessages = (convId: string) => {
    return messagesMap[convId] || [];
  };

  const sendMessage = (convId: string, text: string) => {
    if (!text.trim()) return;
    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      conversation_id: convId,
      sender: currentUser,
      content: text.trim(),
      is_read: true,
      created_at: new Date().toISOString()
    };
    setMessagesMap(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMsg]
    }));
    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          last_message: newMsg,
          updated_at: new Date().toISOString()
        };
      }
      return c;
    }));
  };

  const startOrOpenConversation = (participant: StudentProfile, type: 'direct' | 'marketplace' | 'connection' | 'match', title?: string, relatedItemId?: string): string => {
    const existing = conversations.find(c => c.participant.id === participant.id && c.type === type);
    if (existing) {
      setActiveConversationId(existing.id);
      return existing.id;
    }
    const newConvId = `conv_${Date.now()}`;
    const newConv: ConversationItem = {
      id: newConvId,
      type,
      participant,
      related_title: title || 'Direct Chat',
      related_item_id: relatedItemId,
      unread_count: 0,
      updated_at: new Date().toISOString()
    };
    setConversations(prev => [newConv, ...prev]);
    setMessagesMap(prev => ({ ...prev, [newConvId]: [] }));
    setActiveConversationId(newConvId);
    return newConvId;
  };

  // Clubs & Events & Opportunities
  const toggleJoinClub = (clubId: string) => {
    setClubs(prev => prev.map(c => {
      if (c.id === clubId) {
        const joined = !c.is_joined;
        showToast(joined ? `Joined ${c.name}!` : `Left ${c.name}`);
        return {
          ...c,
          is_joined: joined,
          members_count: joined ? c.members_count + 1 : c.members_count - 1
        };
      }
      return c;
    }));
  };

  const addClub = (name: string, tagline: string, description: string, category: string) => {
    const newClub: ClubItem = {
      id: `club_${Date.now()}`,
      name,
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      tagline,
      description,
      category,
      banner_url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
      logo_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=300',
      created_by: currentUser,
      members_count: 1,
      is_joined: true,
      created_at: new Date().toISOString()
    };
    setClubs(prev => [newClub, ...prev]);
    showToast(`Club "${name}" created!`);
  };

  const toggleRSVPEvent = (eventId: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id === eventId) {
        const going = !e.is_going;
        showToast(going ? `RSVP confirmed for "${e.title}"!` : 'RSVP cancelled.');
        return {
          ...e,
          is_going: going,
          interested_count: going ? e.interested_count + 1 : e.interested_count - 1
        };
      }
      return e;
    }));
  };

  const addEvent = (title: string, description: string, category: 'hackathon' | 'workshop' | 'cultural' | 'sports' | 'seminar' | 'fest', startTime: string, location: string) => {
    const newEvt: CampusEvent = {
      id: `evt_${Date.now()}`,
      title,
      description,
      category,
      start_time: startTime,
      location,
      organizer: currentUser.full_name,
      image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800',
      interested_count: 1,
      is_going: true,
      created_at: new Date().toISOString()
    };
    setEvents(prev => [newEvt, ...prev]);
    showToast(`Campus Event "${title}" published!`);
  };

  const addOpportunity = (title: string, organization: string, category: 'internship' | 'hackathon' | 'competition' | 'freelance' | 'project' | 'scholarship', location: string, description: string, stipend?: string) => {
    const newOpp: StudentOpportunity = {
      id: `opp_${Date.now()}`,
      posted_by: currentUser,
      title,
      organization,
      category,
      location,
      type: 'Student Opportunity',
      description,
      stipend,
      deadline: new Date(Date.now() + 14 * 86400000).toISOString(),
      created_at: new Date().toISOString()
    };
    setOpportunities(prev => [newOpp, ...prev]);
    showToast(`Opportunity "${title}" posted to Student Board!`);
  };

  // Moderation & Safety
  const markNotificationRead = (notifId: string) => {
    setNotifications(prev => prev.map(n => n.id === notifId ? { ...n, is_read: true } : n));
  };

  const submitReport = (targetType: 'user' | 'post' | 'listing' | 'message' | 'dating_profile', targetId: string, reason: ReportReason, details?: string, reportedUser?: StudentProfile) => {
    const newReport: ModerationReport = {
      id: `rep_${Date.now()}`,
      reporter: currentUser,
      reported_user: reportedUser,
      target_type: targetType,
      target_id: targetId,
      reason,
      details,
      status: 'pending',
      created_at: new Date().toISOString()
    };
    setReports(prev => [newReport, ...prev]);
    showToast('Report submitted. Platform moderators will review it immediately.');
  };

  const resolveReport = (reportId: string, dismiss: boolean = false) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: dismiss ? 'dismissed' : 'resolved' } : r));
    showToast(dismiss ? 'Report dismissed.' : 'Report resolved & action taken.');
  };

  const suspendUser = (userId: string) => {
    setStudents(prev => prev.map(s => s.id === userId ? { ...s, is_suspended: true } : s));
    showToast('User account suspended by Platform Moderator.');
  };

  return (
    <AppContext.Provider value={{
      currentUser,
      updateProfile,
      verifyStudent,
      toggleDatingOptIn,
      posts,
      addPost,
      toggleLikePost,
      toggleSavePost,
      addComment,
      votePoll,
      students,
      connections,
      sendConnectionRequest,
      respondConnectionRequest,
      listings,
      addListing,
      markListingAsSold,
      datingProfiles,
      swipeDating,
      conversations,
      activeConversationId,
      setActiveConversationId,
      getConversationMessages,
      sendMessage,
      startOrOpenConversation,
      clubs,
      toggleJoinClub,
      addClub,
      events,
      toggleRSVPEvent,
      addEvent,
      opportunities,
      addOpportunity,
      notifications,
      markNotificationRead,
      reports,
      submitReport,
      resolveReport,
      suspendUser,
      toastMessage,
      showToast
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
