# ⚡ PATKAAR VIBESS

> **Your Campus. Your People. Your Vibes.**

PATKAAR VIBESS is a modern, private, verified, student-only digital social ecosystem designed exclusively for authentic college life. It combines a campus social feed, student-to-student marketplace, intent-based networking, student-run clubs, event discovery, opportunity boards, real-time messaging, and optional 18+ student dating into a single consumer social application.

---

## 🔒 Absolute User Restriction Protocol

**PATKAAR VIBESS IS STRICTLY FOR VERIFIED STUDENTS.**

There are **NO** accounts or dashboards for:
- ❌ Faculty / Teachers / Professors
- ❌ College Staff & Administrators
- ❌ Corporate Recruiters & Businesses
- ❌ Parents & General Public / Outsiders

### Verification Guarantee
- **College Email Domain Check**: Verifies official `.edu` / `.ac.in` email credentials.
- **Student ID Card Upload**: Instant verification badge issuance (`✓ Verified Student`).
- **Platform Moderation**: Internal student moderators handle safety, harassment reports, and content moderation.

---

## ✨ Core Modules & Features

### 💬 1. Campus Social Feed
- **Post Types**: Share Text, Media Images, Live Polls (with real-time vote percentage bars), Questions, Achievements, Memes, Events, and Lost & Found alerts.
- **Filtering**: Filter feed by *Trending*, *Campus Updates*, *Lost & Found*, *Polls*, *Memes*, and *Achievements*.
- **Interactions**: Like button with heart beat animation, bookmarking, collapsible comment drawers with real-time replies, share link copying, and incident reporting.

### 👥 2. Student Discovery & Intent Network
- **Peer Finder**: Search fellow students across departments by Name, Course, Branch, Year, Skills (e.g. *React, Python, Figma*), or Interests.
- **"I'm Here For" Intent Badges**:
  - 🤝 Friends
  - 💼 Networking
  - 💻 Project Teammates
  - ⚡ Collaboration
  - ❤️ Dating (18+ Opt-In)
- **AI Overlap Match Scores**: Calculates shared skills and interest overlap to display match percentage badges (*e.g., "95% Match"*).
- **Intent Connection Requests**: Select specific purpose (Projects, Friendship, Networking) before sending connection requests.

### 🛒 3. Student-to-Student Marketplace
- **Categories**: Books & Notes, Electronics (Raspberry Pi, Laptops), Hostel Furniture, Clothes, Gaming, Tutoring & Freelance Services.
- **Item Listings**: Upload title, description, price, condition (*New, Like New, Good, Fair*), category, and photo URLs.
- **Campus Workflow**: *Discover Item → Chat with Verified Seller → Complete Transaction Offline on Campus*.
- **Owner Controls**: Mark items as **SOLD OUT** with a single click.

### ❤️ 4. Optional 18+ Student Dating
- **Strict Explicit Opt-In Guard**: Dating is hidden by default and requires explicit 18+ age consent before activation.
- **Zero Public Badges**: Never exposes "User is dating" on public student feeds or profiles.
- **Tinder-Style Swipe Deck**: Swipe pass or like student dating cards with floating prompt badges.
- **Mutual Match Celebration**: Triggers celebratory confetti bursts (`canvas-confetti`) upon mutual match and routes directly to private **Dating Matches** chat.

### 🎙️ 5. Student-Run Clubs & Fests
- **Clubs Directory**: Student societies for *Coding & AI*, *Entrepreneurship (E-Cell)*, *Music & Arts*, *Sports & Gaming*, and *Photography*.
- **Club Features**: Member rosters, Join/Leave toggles, club announcements, and club creation.
- **Campus Events**: Discover Hackathons, Workshops, Music Nights, and Cultural Fests with RSVP attendance counters.

### 💼 6. Student Opportunity Board
- Discover and post internships, hackathons, freelance gigs, startup roles, and scholarships with stipend details and application deadlines.

### 💬 7. Real-Time Chat Center
- Unified messenger inbox with category tabs for *Direct Messages*, *Marketplace Inquiries*, *Connections*, and *Dating Matches*.
- Timestamps, read state indicators, inline media previews, and user reporting/blocking controls.

### 🛡️ 8. Internal Platform Moderation Queue
- Accessible strictly by internal Student Moderator roles.
- Review reported posts, marketplace listings, messages, or users.
- Moderator actions: *Resolve Report*, *Dismiss Report*, *Remove Content*, *Suspend User Account*.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS (v4) + Vanilla Glassmorphic CSS Design System |
| **Typography** | Google Fonts (*Plus Jakarta Sans*) |
| **Icons** | Lucide React |
| **Animations** | Canvas Confetti, Custom Keyframes |
| **Database & Auth** | Supabase (PostgreSQL, Realtime, Storage, RLS) |
| **Hosting** | Vercel |

---

## 🗄️ Database Architecture & Schema

The platform relies on a production-ready PostgreSQL schema with Row Level Security (RLS) policies located at [`supabase/schema.sql`](supabase/schema.sql).

### Core Tables (18 Tables)
1. `profiles`: Student details, verification status (`is_verified`), branch, year, skills, interests, "here_for" intents, dating opt-in flag.
2. `posts`: Campus social feed posts, polls, lost & found, memes, achievements.
3. `comments`: Post comments & replies.
4. `post_likes` & `post_saves`: Post interaction join tables.
5. `listings`: Student marketplace items & services.
6. `connections`: Intent-based student network requests.
7. `dating_swipes` & `matches`: Student dating swipes and mutual matches.
8. `conversations` & `messages`: Direct, Marketplace, Connection, and Match chat threads.
9. `clubs` & `club_members`: Student-run clubs and member rosters.
10. `events` & `event_registrations`: Campus events and RSVP attendance.
11. `opportunities`: Student internships, freelance gigs, and hackathons.
12. `notifications`: Real-time activity notifications.
13. `reports` & `admin_actions`: Internal moderation queue for platform moderators.

---

## 📂 Project Directory Structure

```text
patkaar-vibess/
├── public/                     # Static assets & SVG graphics
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── auth/               # Login, Signup & Verification Hub pages
│   │   ├── clubs/              # Student Clubs page
│   │   ├── connections/        # Connection Requests & Peers page
│   │   ├── dating/             # Optional 18+ Student Dating page
│   │   ├── discover/           # Student Finder & Match Score page
│   │   ├── events/             # Campus Events & Fests page
│   │   ├── feed/               # Campus Social Feed page
│   │   ├── marketplace/        # Student-to-Student Marketplace page
│   │   ├── messages/           # Real-Time Chat Center page
│   │   ├── moderation/         # Internal Platform Moderation Queue page
│   │   ├── opportunities/      # Student Opportunity Board page
│   │   ├── profile/            # Student Profile & Settings page
│   │   ├── globals.css         # Custom Glassmorphism & Cyber-Emerald theme
│   │   ├── layout.tsx          # Root layout with fonts, providers & navigation
│   │   └── page.tsx            # Public Landing Page with interactive preview tabs
│   ├── components/
│   │   ├── common/             # VerificationBadge & Toast notification components
│   │   └── layout/             # Navbar, Sidebar, and BottomNav components
│   └── lib/
│       ├── mockData.ts         # Hydrated initial student dataset
│       ├── store.tsx           # Application state store & context provider
│       ├── supabase.ts         # Supabase client setup
│       └── types.ts            # TypeScript domain interfaces
├── supabase/
│   └── schema.sql              # Complete PostgreSQL schema & RLS policies
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚡ Getting Started Locally

### Prerequisites
- Node.js 18.x or later
- npm / pnpm / yarn

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/samtandon12/patkaar-vibess.git
   cd patkaar-vibess
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the local development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) (or your active dev port).

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 🔒 Security & Privacy Practices

- **Row Level Security (RLS)**: Enforces student ownership checks at the database layer.
- **Data Protection**: Sensitive student verification documents and roll numbers are isolated from public profile endpoints.
- **Reporting & Safety**: Every user, post, listing, and message thread includes direct moderation report actions.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more details.

---

<p center>
  <strong>PATKAAR VIBESS</strong> — <em>Your Campus. Your People. Your Vibes.</em>
</p>
