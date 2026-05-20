'use client';
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex items-center justify-center px-4 font-display">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-xl p-10 space-y-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-3xl text-blue-600">lock_reset</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white">Forgot password?</h1>
          <p className="text-slate-500 mt-2 text-sm">Enter your email and we&apos;ll send a reset link to your inbox.</p>
        </div>
        <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert('Reset email sent (mock)'); }}>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2" htmlFor="email">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <span className="material-symbols-outlined text-[20px]">mail</span>
              </div>
              <input id="email" type="email" required placeholder="e.g. student@ubuea.cm"
                className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 transition-all" />
            </div>
          </div>
          <Button type="submit" className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            Send Reset Link
          </Button>
        </form>
        <div className="text-center">
          <Link href="/login" className="text-sm text-blue-600 font-bold hover:underline flex items-center justify-center gap-1">
            <span className="material-symbols-outlined text-sm">arrow_back</span> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
