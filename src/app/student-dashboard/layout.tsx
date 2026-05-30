'use client';
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary p-2 rounded-lg text-blue-600">
            <span className="material-symbols-outlined text-3xl">home_pin</span>
          </div>
          <div>
            <h1 className="font-bold text-lg leading-none tracking-tight">Buea Rentals</h1>
            <span className="text-xs text-slate-500 font-medium uppercase tracking-wider">Student Housing</span>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          <Link href="/student-dashboard" className="bg-primary text-blue-600 flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all group">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link href="/browse" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/30 dark:hover:bg-primary/10 hover:text-blue-600 rounded-xl font-medium transition-all group">
            <span className="material-symbols-outlined">search</span>
            <span>Browse Houses</span>
          </Link>
          <Link href="/student-dashboard/saved" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/30 dark:hover:bg-primary/10 hover:text-blue-600 rounded-xl font-medium transition-all group">
            <span className="material-symbols-outlined">favorite</span>
            <span>Saved Properties</span>
          </Link>
          <Link href="/student-dashboard/messages" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/30 dark:hover:bg-primary/10 hover:text-blue-600 rounded-xl font-medium transition-all group">
            <span className="material-symbols-outlined">chat_bubble</span>
            <span>Messages</span>
            <span className="ml-auto bg-blue-600 text-white text-[10px] px-1.5 py-0.5 rounded-full">2</span>
          </Link>
          <Link href="/student-dashboard/reviews" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/30 dark:hover:bg-primary/10 hover:text-blue-600 rounded-xl font-medium transition-all group">
            <span className="material-symbols-outlined">star</span>
            <span>Reviews</span>
          </Link>

          <div className="pt-8 pb-2 px-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Account</span>
          </div>
          
          <Link href="/student-dashboard/profile" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/30 dark:hover:bg-primary/10 hover:text-blue-600 rounded-xl font-medium transition-all group">
            <span className="material-symbols-outlined">person</span>
            <span>Profile</span>
          </Link>
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl font-medium transition-all group">
            <span className="material-symbols-outlined">logout</span>
            <span>Logout</span>
          </button>
        </nav>
        
        <div className="p-4 m-4 bg-primary/20 dark:bg-primary/5 rounded-2xl border border-primary/40">
          <p className="text-xs font-semibold text-blue-600 mb-1">Need Help?</p>
          <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">Contact our student support for house viewing assistance.</p>
          <button className="w-full py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:shadow-lg hover:shadow-blue-600/20 transition-all">Support Center</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto bg-background-light dark:bg-background-dark">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-8 py-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-xl font-bold">Welcome back, {user?.name?.split(' ')[0] || 'Student'}</h2>
            <p className="text-sm text-slate-500">Find your next home in Buea today.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-slate-200 dark:border-slate-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold leading-none">{user?.name || 'Student'}</p>
                <p className="text-[11px] text-slate-500">UB Student</p>
              </div>
              <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm relative">
                {user?.avatarUrl ? (
                  <Image 
                    src={user.avatarUrl} 
                    alt={user.name || "Student Avatar"} 
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="material-symbols-outlined text-slate-400">person</span>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        {children}
        
      </main>
    </div>
  );
}
