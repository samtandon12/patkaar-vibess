// PATKAAR VIBESS - INITIAL DEMO DATA FOR VERIFIED STUDENT ECOSYSTEM

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
  NotificationItem
} from './types';

export const CURRENT_USER: StudentProfile = {
  id: 'usr_me',
  full_name: 'Aarav Sharma',
  email: 'aarav.sharma@patkaar.edu.in',
  avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400',
  course: 'B.Tech',
  branch: 'Computer Science & Engineering',
  year_of_study: 3,
  bio: 'Building AI tools by night & playing acoustic guitar by day. Looking for hackathon teammates & indie dev collabs! ⚡',
  interests: ['Artificial Intelligence', 'Cybersecurity', 'Web3', 'Indie Music', 'Photography'],
  skills: ['Next.js', 'TypeScript', 'Python', 'PyTorch', 'Tailwind CSS', 'Figma'],
  hobbies: ['Guitar', 'Chess', 'Anime', 'Badminton'],
  projects: [
    { title: 'CampusRide AI', description: 'Smart carpooling matcher for college commuters.', link: 'https://github.com' },
    { title: 'Patkaar Notes Hub', description: 'Peer-to-peer open note sharing archive.', link: 'https://github.com' }
  ],
  achievements: [
    { title: 'Winner - Smart India Hackathon 2025', year: '2025', description: '1st place in EdTech track.' },
    { title: 'Dean\'s Honor Roll', year: '2024' }
  ],
  social_links: {
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    twitter: 'https://twitter.com'
  },
  here_for: ['friends', 'networking', 'projects', 'collaboration'],
  is_verified: true,
  verification_student_id: 'PAT/2023/CS/042',
  is_dating_enabled: true,
  dating_bio: 'Looking for someone to grab iced matcha with and talk about sci-fi films ☕✨',
  dating_preferences: { min_age: 18, max_age: 24, gender_pref: 'all' },
  is_moderator: true, // Aarav is also a Student Moderator
  created_at: '2025-01-10T10:00:00Z'
};

export const MOCK_STUDENTS: StudentProfile[] = [
  CURRENT_USER,
  {
    id: 'usr_2',
    full_name: 'Ananya Verma',
    email: 'ananya.v@patkaar.edu.in',
    avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400',
    course: 'BA Journalism',
    branch: 'Mass Communication & Media',
    year_of_study: 2,
    bio: 'Campus Journalist & Podcast host 🎙️ Documenting student stories and local music scenes.',
    interests: ['Journalism', 'Podcasting', 'Film Making', 'Social Media Marketing'],
    skills: ['Video Editing', 'Premiere Pro', 'Content Strategy', 'Copywriting'],
    hobbies: ['Photography', 'Travel', 'Reading'],
    projects: [{ title: 'Patkaar Pulse Podcast', description: 'Weekly audio show interviewing campus builders.' }],
    achievements: [{ title: 'Best Campus Reporter 2024', year: '2024' }],
    social_links: { instagram: 'https://instagram.com', linkedin: 'https://linkedin.com' },
    here_for: ['friends', 'collaboration', 'dating'],
    is_verified: true,
    verification_student_id: 'PAT/2024/MC/118',
    is_dating_enabled: true,
    dating_bio: 'Let’s explore indie coffee spots near campus and talk photography 📸',
    created_at: '2025-01-12T14:30:00Z'
  },
  {
    id: 'usr_3',
    full_name: 'Rohan Mehta',
    email: 'rohan.m@patkaar.edu.in',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    course: 'B.Tech',
    branch: 'Electronics & Communication',
    year_of_study: 4,
    bio: 'Embedded Systems enthusiast | President of Robotics Club 🤖 Building autonomous drone swarms.',
    interests: ['Robotics', 'IoT', 'Hardware Design', 'Formula Student'],
    skills: ['Arduino', 'Raspberry Pi', 'C++', 'PCB Layout', 'ROS2'],
    hobbies: ['Robotics Combat', 'Gaming', 'Cycling'],
    projects: [{ title: 'AgriDrone', description: 'Autonomous crop health scanner built with ROS2.' }],
    achievements: [{ title: 'National Robotics Expo Gold Medalist', year: '2025' }],
    social_links: { github: 'https://github.com', linkedin: 'https://linkedin.com' },
    here_for: ['networking', 'projects', 'collaboration'],
    is_verified: true,
    verification_student_id: 'PAT/2022/EC/007',
    is_dating_enabled: false,
    created_at: '2024-09-01T09:15:00Z'
  },
  {
    id: 'usr_4',
    full_name: 'Diya Patel',
    email: 'diya.p@patkaar.edu.in',
    avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400',
    course: 'BBA',
    branch: 'Finance & Entrepreneurship',
    year_of_study: 3,
    bio: 'Founder @ CampusBites 🍔 | Passionate about fintech, startups & pitch competitions.',
    interests: ['Startups', 'Fintech', 'Venture Capital', 'Product Design'],
    skills: ['Pitching', 'Financial Modeling', 'Figma', 'Growth Hacking'],
    hobbies: ['Tennis', 'Public Speaking', 'Baking'],
    projects: [{ title: 'CampusBites', description: 'Late-night hostel food delivery app built by students.' }],
    achievements: [{ title: 'E-Cell Business Plan Winner', year: '2025' }],
    social_links: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' },
    here_for: ['networking', 'projects', 'collaboration'],
    is_verified: true,
    verification_student_id: 'PAT/2023/BB/089',
    is_dating_enabled: true,
    dating_bio: 'Looking for ambitious minds who can balance 2 AM pitch deck work with late-night food runs ⚡',
    created_at: '2025-01-05T16:00:00Z'
  },
  {
    id: 'usr_5',
    full_name: 'Kabir Singh',
    email: 'kabir.s@patkaar.edu.in',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
    course: 'B.Des',
    branch: 'User Experience & Industrial Design',
    year_of_study: 2,
    bio: 'Visual designer crafting clean UI/UX and 3D animations. Always up for UI feedback and design roasts! 🎨',
    interests: ['UI/UX Design', '3D Motion', 'Brand Identity', 'Typography'],
    skills: ['Figma', 'Blender', 'After Effects', 'Spline', 'CSS3'],
    hobbies: ['Digital Art', 'Skateboarding', 'Synthwave'],
    projects: [{ title: 'Patkaar UI Design System', description: 'Component library tailored for student apps.' }],
    achievements: [{ title: 'Behance Student Spotlight 2025', year: '2025' }],
    social_links: { github: 'https://github.com', instagram: 'https://instagram.com' },
    here_for: ['friends', 'projects', 'collaboration', 'dating'],
    is_verified: true,
    verification_student_id: 'PAT/2024/DES/014',
    is_dating_enabled: true,
    dating_bio: 'Tell me your favorite color palette or invite me to an art exhibition 🎨✨',
    created_at: '2025-01-20T11:20:00Z'
  }
];

export const MOCK_POSTS: PostItem[] = [
  {
    id: 'post_1',
    author: CURRENT_USER,
    content: '🚀 **BUILDING FOR HACKATHON NEXT WEEK!**\n\nLooking for 1 frontend wizard (React/Next.js) and 1 UI/UX designer to join our team for **Patkaar Hacks 2026**. We are building a smart AI study planner for students.\n\nDrop a comment or DM if interested!',
    post_type: 'opportunity',
    category: 'Opportunities',
    likes_count: 24,
    comments_count: 8,
    saves_count: 12,
    liked_by_me: true,
    saved_by_me: true,
    comments: [
      {
        id: 'c_1',
        post_id: 'post_1',
        author: MOCK_STUDENTS[4], // Kabir
        content: 'Hey Aarav! I would love to handle the UI/UX design & Figma mockups for this. Check out my profile!',
        created_at: '2026-09-04T18:30:00Z'
      },
      {
        id: 'c_2',
        post_id: 'post_1',
        author: MOCK_STUDENTS[1], // Ananya
        content: 'Sounds super cool! I can help craft the pitch presentation and landing page copy 🎙️',
        created_at: '2026-09-04T19:00:00Z'
      }
    ],
    created_at: '2026-09-04T17:00:00Z'
  },
  {
    id: 'post_2',
    author: MOCK_STUDENTS[2], // Rohan
    content: '🚨 **FOUND: Apple AirPods Pro (2nd Gen)**\n\nLeft behind on table 4 in the Main Central Library reading hall around 4:15 PM today. It has a blue silicone case with a small astronaut keychain.\n\nPlease comment or message with proof of ownership to claim it back! Let’s get it back to its owner.',
    post_type: 'lost_found',
    category: 'Lost & Found',
    media_urls: ['https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&q=80&w=800'],
    likes_count: 42,
    comments_count: 5,
    saves_count: 4,
    created_at: '2026-09-04T16:30:00Z'
  },
  {
    id: 'post_3',
    author: MOCK_STUDENTS[3], // Diya
    content: '📊 **POLL FOR ALL STUDENTS:**\n\nWhat time works best for late-night campus food delivery from CampusBites during mid-sem exam week?',
    post_type: 'poll',
    category: 'Campus Life',
    poll_data: {
      question: 'Best late-night food delivery window?',
      options: [
        { id: 'opt_1', text: '11:00 PM - 1:00 AM', votes: ['usr_me', 'usr_2'] },
        { id: 'opt_2', text: '1:00 AM - 3:00 AM (Exam Night Grind)', votes: ['usr_3', 'usr_4', 'usr_5'] },
        { id: 'opt_3', text: '3:00 AM - 5:00 AM (All-Nighter)', votes: [] }
      ]
    },
    likes_count: 56,
    comments_count: 14,
    saves_count: 3,
    created_at: '2026-09-04T14:15:00Z'
  },
  {
    id: 'post_4',
    author: MOCK_STUDENTS[1], // Ananya
    content: '🎉 Super proud to announce that Episode 12 of **Patkaar Pulse** is live! We sat down with student entrepreneurs on campus to discuss starting up while maintaining attendance. Link in my profile bio! 🎙️⚡',
    post_type: 'achievement',
    category: 'Achievements',
    media_urls: ['https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800'],
    likes_count: 88,
    comments_count: 11,
    saves_count: 15,
    created_at: '2026-09-04T10:00:00Z'
  }
];

export const MOCK_MARKETPLACE: MarketplaceListing[] = [
  {
    id: 'list_1',
    seller: MOCK_STUDENTS[2], // Rohan
    title: 'Raspberry Pi 4 Model B (8GB RAM) + Starter Kit',
    description: 'Barely used Raspberry Pi 4 with official power supply, 64GB MicroSD card, micro HDMI cable, and aluminum heatsink case. Perfect for IoT or Robotics projects!',
    price: 4500,
    category: 'electronics',
    condition: 'like_new',
    images: ['https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800'],
    is_sold: false,
    created_at: '2026-09-03T14:00:00Z'
  },
  {
    id: 'list_2',
    seller: MOCK_STUDENTS[3], // Diya
    title: 'Complete 3rd Year B.Tech CS Reference Textbooks Set',
    description: 'Set of 5 textbooks: Operating Systems (Silberschatz), Data Structures (Cormen), Computer Networks (Tanenbaum), DBMS (Korth), and AI (Russell & Norvig). Highlights included.',
    price: 1800,
    category: 'books',
    condition: 'good',
    images: ['https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800'],
    is_sold: false,
    created_at: '2026-09-02T11:20:00Z'
  },
  {
    id: 'list_3',
    seller: MOCK_STUDENTS[4], // Kabir
    title: 'Custom UI/UX & Web Design Services for Student Startups',
    description: 'Offering custom Figma prototypes, pitch deck design, and responsive Webflow/Next.js landing pages. Student-friendly rates!',
    price: 2500,
    category: 'services',
    condition: 'new',
    images: ['https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=800'],
    is_sold: false,
    created_at: '2026-09-01T09:45:00Z'
  },
  {
    id: 'list_4',
    seller: MOCK_STUDENTS[1], // Ananya
    title: 'Ergonomic Hostel Desk Chair (Mesh back)',
    description: 'Comfortable mesh office chair with lumbar support & pneumatic height adjustment. Selling because graduating this semester!',
    price: 2200,
    category: 'furniture',
    condition: 'good',
    images: ['https://images.unsplash.com/photo-1580481072645-022f9a6d1270?auto=format&fit=crop&q=80&w=800'],
    is_sold: true,
    created_at: '2026-08-28T16:10:00Z'
  }
];

export const MOCK_CLUBS: ClubItem[] = [
  {
    id: 'club_1',
    name: 'Patkaar AI & Developers Society',
    slug: 'ai-dev-society',
    tagline: 'Building intelligent student software & shipping open-source.',
    description: 'The premier student tech club focused on Machine Learning, Full-Stack Web Development, Hackathons, and Open-Source contributions.',
    category: 'Coding & AI',
    banner_url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800',
    logo_url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300',
    created_by: CURRENT_USER,
    members_count: 240,
    is_joined: true,
    created_at: '2024-08-15T00:00:00Z'
  },
  {
    id: 'club_2',
    name: 'E-Cell Patkaar',
    slug: 'ecell',
    tagline: 'Fostering student startup founders & venture creation.',
    description: 'Incubating student ideas, organizing pitch competitions, speaker sessions with successful alumni founders, and startup bootcamps.',
    category: 'Entrepreneurship',
    banner_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
    logo_url: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?auto=format&fit=crop&q=80&w=300',
    created_by: MOCK_STUDENTS[3], // Diya
    members_count: 185,
    is_joined: false,
    created_at: '2024-09-01T00:00:00Z'
  },
  {
    id: 'club_3',
    name: 'Acoustica Music & Performing Arts',
    slug: 'acoustica-music',
    tagline: 'Where campus melodies & live jam sessions happen.',
    description: 'For singers, instrumentalists, sound engineers, and music enthusiasts. We host weekly open mic sessions and annual battle of the bands.',
    category: 'Music & Arts',
    banner_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    logo_url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300',
    created_by: MOCK_STUDENTS[1], // Ananya
    members_count: 310,
    is_joined: true,
    created_at: '2024-07-10T00:00:00Z'
  }
];

export const MOCK_EVENTS: CampusEvent[] = [
  {
    id: 'evt_1',
    title: 'PATKAAR HACKS 2026: 36-Hour Hackathon',
    description: 'Build real-world solutions for Campus Life, Sustainability, and AI. ₹1,50,000 cash prize pool, free food, energy drinks, and mentor sessions!',
    category: 'hackathon',
    start_time: '2026-09-12T09:00:00Z',
    end_time: '2026-09-13T21:00:00Z',
    location: 'Auditorium Hall B & Innovation Center',
    organizer: 'Patkaar AI & Developers Society',
    club_name: 'Patkaar AI & Devs',
    image_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    registration_url: 'https://patkaar-hacks.dev',
    interested_count: 142,
    is_going: true,
    created_at: '2026-09-01T10:00:00Z'
  },
  {
    id: 'evt_2',
    title: 'UI/UX Design Masterclass: From Figma to Code',
    description: 'Hands-on workshop on component systems, micro-interactions, and responsive design systems taught by industrial design leads.',
    category: 'workshop',
    start_time: '2026-09-08T15:00:00Z',
    end_time: '2026-09-08T18:00:00Z',
    location: 'Design Studio Lab 3',
    organizer: 'Kabir Singh',
    image_url: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800',
    interested_count: 68,
    is_going: false,
    created_at: '2026-09-02T12:00:00Z'
  },
  {
    id: 'evt_3',
    title: 'Annual Campus Unplugged Acoustic Night',
    description: 'Under the campus lights: live vocal performances, acoustic guitars, beatboxing, and warm tea.',
    category: 'cultural',
    start_time: '2026-09-15T18:30:00Z',
    end_time: '2026-09-15T22:00:00Z',
    location: 'Amphitheatre Courtyard',
    organizer: 'Acoustica Club',
    image_url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    interested_count: 220,
    is_going: true,
    created_at: '2026-09-03T09:00:00Z'
  }
];

export const MOCK_OPPORTUNITIES: StudentOpportunity[] = [
  {
    id: 'opp_1',
    posted_by: MOCK_STUDENTS[3], // Diya
    title: 'Frontend Developer Intern (React / Next.js)',
    organization: 'CampusBites Tech Team',
    category: 'internship',
    location: 'On-Campus / Hybrid',
    type: '3 Months | ₹15,000 / month',
    description: 'Join CampusBites engineering team to optimize real-time order tracking and push notification delivery for 1000+ daily student orders.',
    stipend: '₹15,000 / month',
    deadline: '2026-09-15T23:59:00Z',
    created_at: '2026-09-03T10:00:00Z'
  },
  {
    id: 'opp_2',
    posted_by: CURRENT_USER,
    title: 'Graphic Designer & Video Editor',
    organization: 'Patkaar E-Cell',
    category: 'freelance',
    location: 'Remote',
    type: 'Project-based | Paid',
    description: 'Design motion poster graphics and recap reels for the upcoming Campus Startup Summit 2026.',
    stipend: '₹8,000 per event package',
    deadline: '2026-09-10T23:59:00Z',
    created_at: '2026-09-04T12:00:00Z'
  }
];

export const MOCK_CONNECTIONS: ConnectionRequest[] = [
  {
    id: 'conn_1',
    sender: MOCK_STUDENTS[4], // Kabir
    receiver: CURRENT_USER,
    intent: 'projects',
    note: 'Hey Aarav! Loved your post about the AI study planner. Would love to collaborate on the UI design!',
    status: 'pending',
    created_at: '2026-09-04T18:45:00Z'
  },
  {
    id: 'conn_2',
    sender: MOCK_STUDENTS[1], // Ananya
    receiver: CURRENT_USER,
    intent: 'friends',
    note: 'Hey! Saw you also play acoustic guitar. Let’s jam sometime at Amphitheatre!',
    status: 'accepted',
    created_at: '2026-09-03T11:00:00Z'
  }
];

export const MOCK_DATING_PROFILES: DatingProfile[] = [
  {
    id: 'date_1',
    student: MOCK_STUDENTS[1], // Ananya
    bio: 'Journalism student who loves warm chai, indie pop music, and long evening walks near campus ☕✨',
    photos: [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=800'
    ],
    prompts: [
      { question: 'My ideal sunday on campus...', answer: 'Acoustic jam at the quad followed by iced coffee.' },
      { question: 'Two truths and a lie...', answer: 'Host a campus podcast, have met 3 celebs, hates chocolate.' }
    ],
    distance: 'Same Campus • Central Block'
  },
  {
    id: 'date_2',
    student: MOCK_STUDENTS[4], // Kabir
    bio: 'Design nerd & vinyl collector. Looking for someone to share playlists and aesthetic coffee shops 🎨',
    photos: [
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800'
    ],
    prompts: [
      { question: 'The quickest way to my heart...', answer: 'Recommend me a hidden gems spotify playlist.' }
    ],
    distance: 'Same Campus • Hostel Block 4'
  }
];

export const MOCK_CONVERSATIONS: ConversationItem[] = [
  {
    id: 'conv_1',
    type: 'direct',
    participant: MOCK_STUDENTS[1], // Ananya
    related_title: 'Friendship & Jamming',
    last_message: {
      id: 'msg_1',
      conversation_id: 'conv_1',
      sender: MOCK_STUDENTS[1],
      content: 'Let’s meet at the Amphitheatre around 5:30 PM today! I’ll bring the song chord sheets 🎶',
      is_read: false,
      created_at: '2026-09-04T18:20:00Z'
    },
    unread_count: 1,
    updated_at: '2026-09-04T18:20:00Z'
  },
  {
    id: 'conv_2',
    type: 'marketplace',
    participant: MOCK_STUDENTS[2], // Rohan
    related_title: 'Raspberry Pi 4 Model B',
    related_item_id: 'list_1',
    last_message: {
      id: 'msg_2',
      conversation_id: 'conv_2',
      sender: CURRENT_USER,
      content: 'Hey Rohan! Is the Raspberry Pi 4 kit still available? Can meet at the Library cafeteria.',
      is_read: true,
      created_at: '2026-09-04T15:10:00Z'
    },
    unread_count: 0,
    updated_at: '2026-09-04T15:10:00Z'
  },
  {
    id: 'conv_3',
    type: 'match',
    participant: MOCK_STUDENTS[1], // Ananya (Dating match)
    related_title: 'Mutual Match ✨',
    last_message: {
      id: 'msg_3',
      conversation_id: 'conv_3',
      sender: MOCK_STUDENTS[1],
      content: 'It’s a match! Excited to grab coffee together after mid-sems 😊',
      is_read: true,
      created_at: '2026-09-04T12:00:00Z'
    },
    unread_count: 0,
    updated_at: '2026-09-04T12:00:00Z'
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    user_id: 'usr_me',
    actor: MOCK_STUDENTS[4], // Kabir
    type: 'connection_req',
    title: 'New Connection Request',
    content: 'Kabir Singh sent you a connection request for Projects 💻',
    link_url: '/connections',
    is_read: false,
    created_at: '2026-09-04T18:45:00Z'
  },
  {
    id: 'notif_2',
    user_id: 'usr_me',
    actor: MOCK_STUDENTS[1], // Ananya
    type: 'match',
    title: 'New Mutual Match! ✨',
    content: 'You and Ananya Verma liked each other! Start chatting in Dating Messages.',
    link_url: '/dating',
    is_read: false,
    created_at: '2026-09-04T12:00:00Z'
  },
  {
    id: 'notif_3',
    user_id: 'usr_me',
    actor: MOCK_STUDENTS[2], // Rohan
    type: 'like',
    title: 'Post Liked',
    content: 'Rohan Mehta liked your post: "BUILDING FOR HACKATHON NEXT WEEK!"',
    link_url: '/feed',
    is_read: true,
    created_at: '2026-09-04T17:30:00Z'
  }
];

export const MOCK_REPORTS: ModerationReport[] = [
  {
    id: 'rep_1',
    reporter: MOCK_STUDENTS[2],
    reported_user: MOCK_STUDENTS[4],
    target_type: 'post',
    target_id: 'post_99',
    reason: 'spam',
    details: 'User posted duplicate ticket reselling links 5 times in 10 minutes.',
    status: 'pending',
    created_at: '2026-09-04T14:00:00Z'
  }
];
