import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/store';
import { Navbar } from '@/components/layout/Navbar';
import { Sidebar } from '@/components/layout/Sidebar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Toast } from '@/components/common/Toast';

export const metadata: Metadata = {
  title: 'PATKAAR VIBESS — Your Campus. Your People. Your Vibes.',
  description: 'A private, verified, student-only social ecosystem for networking, feed, marketplace, connections, student clubs, events, and optional dating.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-[#030712] bg-glass-grid text-slate-100 min-h-screen antialiased flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200 font-['Plus_Jakarta_Sans',sans-serif]">
        
        {/* Vibrant Glass Refraction Background Orbs */}
        <div className="fixed top-0 left-1/4 -translate-x-1/2 w-[700px] h-[450px] bg-emerald-500/15 rounded-full blur-[160px] pointer-events-none z-0" />
        <div className="fixed top-20 right-1/4 translate-x-1/2 w-[650px] h-[450px] bg-cyan-500/15 rounded-full blur-[160px] pointer-events-none z-0" />
        <div className="fixed bottom-20 left-1/3 w-[550px] h-[350px] bg-indigo-500/12 rounded-full blur-[170px] pointer-events-none z-0" />
        <div className="fixed bottom-0 right-1/4 w-[450px] h-[300px] bg-rose-500/10 rounded-full blur-[170px] pointer-events-none z-0" />
        
        <AppProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-1 max-w-7xl w-full mx-auto flex">
              <Sidebar />
              <main className="flex-1 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8 min-w-0">
                {children}
              </main>
            </div>
            <BottomNav />
            <Toast />
          </div>
        </AppProvider>

      </body>
    </html>
  );
}
