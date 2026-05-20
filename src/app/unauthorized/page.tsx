import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center text-center px-4 font-display">
      <div className="w-24 h-24 bg-red-100 rounded-3xl flex items-center justify-center mb-8">
        <span className="material-symbols-outlined text-5xl text-red-500">lock</span>
      </div>
      <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Access Denied</h1>
      <p className="text-slate-500 max-w-md mb-10 leading-relaxed">
        You don&apos;t have permission to view this page. Please log in with an account that has the appropriate role.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link href="/login" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined">login</span> Login
        </Link>
        <Link href="/" className="px-8 py-3 border border-slate-300 rounded-xl font-bold hover:bg-slate-50 transition-colors flex items-center gap-2">
          <span className="material-symbols-outlined">home</span> Home
        </Link>
      </div>
    </div>
  );
}
