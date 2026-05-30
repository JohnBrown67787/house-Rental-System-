'use client';
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display antialiased">
      {/* Sidebar Navigation */}
      <aside className="w-72 bg-white dark:bg-background-dark border-r border-primary/30 flex flex-col shrink-0">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary/50 p-2 rounded-lg">
            <span className="material-symbols-outlined text-blue-600 text-2xl">home_work</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-none">Buea Rental</h1>
            <p className="text-xs text-slate-500 font-medium">Student Admin Panel</p>
          </div>
        </div>
        <nav className="flex-1 px-4 space-y-1">
          <Link href="/admin-dashboard" className="flex items-center gap-3 px-4 py-3 bg-primary text-blue-700 rounded-lg font-medium">
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </Link>
          <Link href="/admin-dashboard/users" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/20 rounded-lg font-medium transition-colors">
            <span className="material-symbols-outlined">group</span>
            User Management
          </Link>
          <Link href="/admin-dashboard/properties" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/20 rounded-lg font-medium transition-colors">
            <span className="material-symbols-outlined">fact_check</span>
            Property Approvals
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/20 rounded-lg font-medium transition-colors">
            <span className="material-symbols-outlined">analytics</span>
            Reports
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-slate-600 dark:text-slate-400 hover:bg-primary/20 rounded-lg font-medium transition-colors">
            <span className="material-symbols-outlined">settings</span>
            Settings
          </Link>
        </nav>
        <div className="p-4 mt-auto">
          <div className="bg-primary/10 rounded-xl p-4 mb-4">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Support</p>
            <p className="text-sm text-slate-700 dark:text-slate-300">Need help with the platform?</p>
            <button className="mt-3 w-full py-2 bg-white dark:bg-slate-800 text-xs font-bold rounded-lg border border-primary/50 shadow-sm">Contact Dev</button>
          </div>
          <button onClick={logout} className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-lg font-medium transition-colors">
            <span className="material-symbols-outlined">logout</span>
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-background-dark border-b border-primary/30 px-8 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 w-1/3">
            <div className="relative w-full">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
              <input className="w-full bg-background-light dark:bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-primary" placeholder="Search for users or listings..." type="text" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:bg-primary/20 rounded-lg transition-colors">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-primary/50 mx-2"></div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold">Admin User</p>
                <p className="text-xs text-slate-500">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full border border-primary relative overflow-hidden">
                <Image src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1974&auto=format&fit=crop" alt="Admin Avatar" fill className="object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {children}
        
      </main>
    </div>
  );
}
