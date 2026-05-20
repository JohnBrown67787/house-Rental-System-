'use client';
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";

export default function LandlordDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  return (
    <div className="flex h-screen overflow-hidden bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Sidebar Navigation */}
      <aside className="w-64 flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-blue-600">
            <span className="material-symbols-outlined">apartment</span>
          </div>
          <div>
            <h1 className="text-base font-bold leading-tight">Buea Rentals</h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">Landlord Portal</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          <Link href="/landlord-dashboard" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary text-blue-600 font-medium">
            <span className="material-symbols-outlined">dashboard</span>
            <span>Dashboard</span>
          </Link>
          <Link href="/landlord-dashboard/add-property" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">add_box</span>
            <span>Add Property</span>
          </Link>
          <Link href="/landlord-dashboard/listings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">list_alt</span>
            <span>My Listings</span>
          </Link>
          <Link href="/landlord-dashboard/messages" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">chat_bubble</span>
            <span>Messages</span>
          </Link>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800">
            <Link href="/landlord-dashboard/profile" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined">person</span>
              <span>Profile</span>
            </Link>
            <Link href="/login" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
              <span className="material-symbols-outlined">logout</span>
              <span>Logout</span>
            </Link>
          </div>
        </nav>
        <div className="p-4 mt-auto">
          <div className="bg-primary/30 p-4 rounded-xl">
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Pro Support</p>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">Need help with listings?</p>
            <button className="mt-3 w-full bg-blue-600 text-white text-xs font-bold py-2 rounded-lg">Contact Agent</button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-4 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold">Property Management</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">search</span>
              <input className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-blue-600" placeholder="Search properties..." type="text" />
            </div>
            <button className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg relative">
              <span className="material-symbols-outlined">notifications</span>
              <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-primary relative">
              {user?.avatarUrl ? (
                <Image src={user.avatarUrl} alt={user?.name || "Profile"} fill className="object-cover" />
              ) : (
                <span className="material-symbols-outlined text-slate-400">person</span>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        {children}

        {/* Footer */}
        <footer className="mt-auto p-8 border-t border-slate-200 dark:border-slate-800 text-center text-slate-500 dark:text-slate-500 text-sm">
          <p>© 2024 Buea Rentals. All rights reserved.</p>
          <div className="mt-2 flex justify-center gap-4">
            <a className="hover:text-blue-600" href="#">Terms</a>
            <a className="hover:text-blue-600" href="#">Privacy</a>
            <a className="hover:text-blue-600" href="#">Support</a>
          </div>
        </footer>
      </main>
    </div>
  );
}
