// PATKAAR VIBESS - TYPE DEFINITIONS

export type ConnectionIntent = 'friends' | 'networking' | 'projects' | 'collaboration' | 'dating';

export type PostType = 'text' | 'image' | 'poll' | 'question' | 'achievement' | 'meme' | 'event' | 'opportunity' | 'lost_found';

export type MarketplaceCategory = 
  | 'books' 
  | 'electronics' 
  | 'furniture' 
  | 'clothes' 
  | 'accessories' 
  | 'gaming' 
  | 'notes' 
  | 'tutoring' 
  | 'design' 
  | 'coding' 
  | 'services' 
  | 'other';

export type ReportReason = 
  | 'harassment' 
  | 'spam' 
  | 'fake_profile' 
  | 'scam' 
  | 'inappropriate_content' 
  | 'marketplace_fraud' 
  | 'abuse' 
  | 'other';

export interface StudentProfile {
  id: string;
  full_name: string;
  email: string;
  avatar_url: string;
  course: string;
  branch: string;
  year_of_study: number;
  bio: string;
  interests: string[];
  skills: string[];
  hobbies: string[];
  projects: { title: string; description: string; link?: string }[];
  achievements: { title: string; year: string; description?: string }[];
  social_links: { github?: string; linkedin?: string; instagram?: string; twitter?: string };
  here_for: ConnectionIntent[];
  is_verified: boolean;
  verification_student_id?: string;
  is_dating_enabled: boolean;
  dating_bio?: string;
  dating_preferences?: {
    min_age: number;
    max_age: number;
    gender_pref: 'all' | 'men' | 'women';
  };
  is_moderator?: boolean;
  is_suspended?: boolean;
  is_banned?: boolean;
  created_at: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: string[]; // array of user IDs
}

export interface CommentItem {
  id: string;
  post_id: string;
  author: StudentProfile;
  content: string;
  created_at: string;
}

export interface PostItem {
  id: string;
  author: StudentProfile;
  content: string;
  post_type: PostType;
  media_urls?: string[];
  poll_data?: {
    question: string;
    options: PollOption[];
  };
  category: string;
  likes_count: number;
  comments_count: number;
  saves_count: number;
  liked_by_me?: boolean;
  saved_by_me?: boolean;
  comments?: CommentItem[];
  created_at: string;
}

export interface MarketplaceListing {
  id: string;
  seller: StudentProfile;
  title: string;
  description: string;
  price: number;
  category: MarketplaceCategory;
  condition: 'new' | 'like_new' | 'good' | 'fair';
  images: string[];
  is_sold: boolean;
  created_at: string;
}

export interface ConnectionRequest {
  id: string;
  sender: StudentProfile;
  receiver: StudentProfile;
  intent: ConnectionIntent;
  note?: string;
  status: 'pending' | 'accepted' | 'declined';
  created_at: string;
}

export interface DatingProfile {
  id: string;
  student: StudentProfile;
  bio: string;
  photos: string[];
  prompts: { question: string; answer: string }[];
  distance: string;
}

export interface DatingMatch {
  id: string;
  user1: StudentProfile;
  user2: StudentProfile;
  created_at: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender: StudentProfile;
  content: string;
  media_url?: string;
  is_read: boolean;
  created_at: string;
}

export interface ConversationItem {
  id: string;
  type: 'direct' | 'marketplace' | 'connection' | 'match';
  participant: StudentProfile;
  related_title?: string;
  related_item_id?: string;
  last_message?: ChatMessage;
  unread_count: number;
  updated_at: string;
}

export interface ClubItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  category: string;
  banner_url: string;
  logo_url: string;
  created_by: StudentProfile;
  members_count: number;
  is_joined?: boolean;
  created_at: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  description: string;
  category: 'hackathon' | 'workshop' | 'cultural' | 'sports' | 'seminar' | 'fest';
  start_time: string;
  end_time?: string;
  location: string;
  organizer: string;
  club_name?: string;
  image_url: string;
  registration_url?: string;
  interested_count: number;
  is_going?: boolean;
  created_at: string;
}

export interface StudentOpportunity {
  id: string;
  posted_by: StudentProfile;
  title: string;
  organization: string;
  category: 'internship' | 'hackathon' | 'competition' | 'freelance' | 'project' | 'scholarship';
  location: string;
  type: string;
  description: string;
  stipend?: string;
  apply_link?: string;
  deadline: string;
  created_at: string;
}

export interface NotificationItem {
  id: string;
  user_id: string;
  actor: StudentProfile;
  type: 'connection_req' | 'match' | 'message' | 'marketplace' | 'like' | 'comment' | 'event_reminder' | 'club_update';
  title: string;
  content: string;
  link_url: string;
  is_read: boolean;
  created_at: string;
}

export interface ModerationReport {
  id: string;
  reporter: StudentProfile;
  reported_user?: StudentProfile;
  target_type: 'user' | 'post' | 'listing' | 'message' | 'dating_profile';
  target_id: string;
  reason: ReportReason;
  details?: string;
  status: 'pending' | 'resolved' | 'dismissed';
  created_at: string;
}
