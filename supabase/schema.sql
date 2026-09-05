-- PATKAAR VIBESS DATABASE SCHEMA
-- PostgreSQL / Supabase Schema for Verified Student Ecosystem

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. ENUMS
CREATE TYPE connection_intent AS ENUM ('friends', 'networking', 'projects', 'collaboration', 'dating');
CREATE TYPE marketplace_category AS ENUM ('books', 'electronics', 'furniture', 'clothes', 'accessories', 'gaming', 'notes', 'tutoring', 'design', 'coding', 'services', 'other');
CREATE TYPE report_reason AS ENUM ('harassment', 'spam', 'fake_profile', 'scam', 'inappropriate_content', 'marketplace_fraud', 'abuse', 'other');
CREATE TYPE report_status AS ENUM ('pending', 'under_review', 'resolved', 'dismissed');

-- 3. PROFILES TABLE (Verified Students)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    avatar_url TEXT,
    course TEXT NOT NULL,       -- e.g. "B.Tech", "BCA", "BA Journalism"
    branch TEXT NOT NULL,       -- e.g. "Computer Science", "Mass Comm"
    year_of_study INT NOT NULL CHECK (year_of_study BETWEEN 1 AND 5),
    bio TEXT,
    interests TEXT[] DEFAULT '{}',
    skills TEXT[] DEFAULT '{}',
    hobbies TEXT[] DEFAULT '{}',
    projects JSONB DEFAULT '[]',
    achievements JSONB DEFAULT '[]',
    social_links JSONB DEFAULT '{}',
    here_for connection_intent[] DEFAULT '{friends, networking}',
    is_verified BOOLEAN DEFAULT FALSE,
    verification_student_id TEXT,
    verification_document_url TEXT,
    is_dating_enabled BOOLEAN DEFAULT FALSE,
    dating_bio TEXT,
    dating_preferences JSONB DEFAULT '{"min_age": 18, "max_age": 25, "gender_pref": "all"}',
    is_moderator BOOLEAN DEFAULT FALSE,
    is_suspended BOOLEAN DEFAULT FALSE,
    is_banned BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CAMPUS POSTS
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    post_type TEXT NOT NULL DEFAULT 'text', -- 'text', 'image', 'poll', 'question', 'achievement', 'meme', 'event', 'opportunity', 'lost_found'
    media_urls TEXT[] DEFAULT '{}',
    poll_data JSONB, -- { options: [{id, text, votes: [user_id]}] }
    category TEXT DEFAULT 'general',
    likes_count INT DEFAULT 0,
    comments_count INT DEFAULT 0,
    saves_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. COMMENTS
CREATE TABLE IF NOT EXISTS public.comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
    author_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. POST LIKES
CREATE TABLE IF NOT EXISTS public.post_likes (
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (post_id, user_id)
);

-- 7. POST SAVES
CREATE TABLE IF NOT EXISTS public.post_saves (
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (post_id, user_id)
);

-- 8. MARKETPLACE LISTINGS
CREATE TABLE IF NOT EXISTS public.listings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    seller_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    category marketplace_category NOT NULL,
    condition TEXT DEFAULT 'good', -- 'new', 'like_new', 'good', 'fair'
    images TEXT[] DEFAULT '{}',
    is_sold BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. CONNECTIONS SYSTEM
CREATE TABLE IF NOT EXISTS public.connections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    intent connection_intent NOT NULL,
    note TEXT,
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'accepted', 'declined', 'blocked'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (sender_id, receiver_id)
);

-- 10. DATING MATCHES
CREATE TABLE IF NOT EXISTS public.dating_swipes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    swiper_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    is_like BOOLEAN NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (swiper_id, target_id)
);

CREATE TABLE IF NOT EXISTS public.matches (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user1_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    user2_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (user1_id, user2_id)
);

-- 11. MESSAGING (CHAT)
CREATE TABLE IF NOT EXISTS public.conversations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    type TEXT NOT NULL DEFAULT 'direct', -- 'direct', 'marketplace', 'connection', 'match'
    related_item_id UUID, -- e.g. listing_id or match_id
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.conversation_participants (
    conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (conversation_id, user_id)
);

CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    conversation_id UUID NOT NULL REFERENCES public.conversations(id) ON DELETE CASCADE,
    sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    media_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. STUDENT CLUBS
CREATE TABLE IF NOT EXISTS public.clubs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    tagline TEXT,
    description TEXT NOT NULL,
    category TEXT NOT NULL, -- 'Coding', 'AI', 'Music', 'Drama', 'Sports', 'Photography', 'Entrepreneurship'
    banner_url TEXT,
    logo_url TEXT,
    created_by UUID NOT NULL REFERENCES public.profiles(id),
    members_count INT DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.club_members (
    club_id UUID REFERENCES public.clubs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT DEFAULT 'member', -- 'lead', 'core', 'member'
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (club_id, user_id)
);

-- 13. CAMPUS EVENTS
CREATE TABLE IF NOT EXISTS public.events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL, -- 'hackathon', 'workshop', 'cultural', 'sports', 'seminar', 'fest'
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ,
    location TEXT NOT NULL,
    organizer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    club_id UUID REFERENCES public.clubs(id) ON DELETE SET NULL,
    image_url TEXT,
    registration_url TEXT,
    interested_count INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.event_registrations (
    event_id UUID REFERENCES public.events(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'going', -- 'going', 'interested'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (event_id, user_id)
);

-- 14. OPPORTUNITIES
CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    posted_by UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    organization TEXT NOT NULL,
    category TEXT NOT NULL, -- 'internship', 'hackathon', 'competition', 'freelance', 'project', 'scholarship'
    location TEXT DEFAULT 'Remote / On-Campus',
    type TEXT DEFAULT 'Part-time / Stipend',
    description TEXT NOT NULL,
    apply_link TEXT,
    stipend TEXT,
    deadline TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 15. NOTIFICATIONS
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    actor_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL, -- 'connection_req', 'match', 'message', 'marketplace', 'like', 'comment', 'event_reminder'
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    link_url TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 16. REPORTS (Internal Platform Moderation)
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reporter_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reported_user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    target_type TEXT NOT NULL, -- 'user', 'post', 'listing', 'message', 'dating_profile'
    target_id UUID NOT NULL,
    reason report_reason NOT NULL,
    details TEXT,
    status report_status DEFAULT 'pending',
    assigned_moderator_id UUID REFERENCES public.profiles(id),
    resolution_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 17. ADMIN / MODERATOR ACTIONS
CREATE TABLE IF NOT EXISTS public.admin_actions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    moderator_id UUID NOT NULL REFERENCES public.profiles(id),
    action_type TEXT NOT NULL, -- 'suspend_user', 'ban_user', 'remove_post', 'remove_listing', 'dismiss_report'
    target_user_id UUID REFERENCES public.profiles(id),
    reason TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 18. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dating_swipes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone authenticated can read verified student profiles; users can update own profile
CREATE POLICY "Public profile reading for authenticated students" ON public.profiles FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Posts: Authenticated students can read posts, create posts, update own posts
CREATE POLICY "Students can read posts" ON public.posts FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Students can create posts" ON public.posts FOR INSERT WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Students can delete own posts" ON public.posts FOR DELETE USING (auth.uid() = author_id);

-- Listings: Authenticated students can view & manage listings
CREATE POLICY "Students can view listings" ON public.listings FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY "Sellers can manage listings" ON public.listings FOR ALL USING (auth.uid() = seller_id);
