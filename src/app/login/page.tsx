'use client';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types";

export default function LoginPage() {
  const { login } = useAuth();
  const [role, setRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError('Please enter your email and password.'); return; }
    setError('');
    setLoading(true);
    try { await login(email, password, role); }
    catch { setError('Login failed. Please try again.'); setLoading(false); }
  };

  const quickLogin = (r: UserRole) => {
    const creds: Record<UserRole, { email: string; password: string }> = {
      student: { email: 'student@ubuea.cm', password: 'password123' },
      landlord: { email: 'landlord@buea.cm', password: 'password123' },
      admin: { email: 'admin@gmail.com', password: 'admin1234' },
    };
    setRole(r); setEmail(creds[r].email); setPassword(creds[r].password);
  };

  return (
    <div className="flex min-h-screen w-full bg-background-light font-display">
      <div className="hidden lg:flex lg:w-3/5 relative overflow-hidden">
        <Image src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070&auto=format&fit=crop" alt="Apartment" fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-blue-900/40 flex flex-col justify-end p-16 text-white">
          <div className="max-w-md">
            <h2 className="text-4xl font-bold mb-4 drop-shadow-lg">Find your perfect student home in Buea</h2>
            <p className="text-lg opacity-90 drop-shadow-md">Join thousands of students and landlords on the most trusted housing platform.</p>
          </div>
        </div>
        <div className="absolute top-10 left-10 flex items-center gap-3 bg-white/90 backdrop-blur px-6 py-3 rounded-xl shadow-lg">
          <span className="material-symbols-outlined text-blue-800">apartment</span>
          <span className="font-bold text-slate-900">Buea Rentals</span>
        </div>
      </div>

      <div className="w-full lg:w-2/5 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-md space-y-6">
          <div className="lg:hidden flex justify-center">
            <Link href="/" className="flex items-center gap-2 text-blue-800">
              <span className="material-symbols-outlined text-3xl">apartment</span>
              <h1 className="text-2xl font-black">Buea Rentals</h1>
            </Link>
          </div>

          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Welcome back</h2>
            <p className="mt-2 text-slate-500 font-medium">Enter your details to sign in.</p>
          </div>

          {/* Quick Demo */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-xs font-bold text-blue-700 mb-3 uppercase tracking-wider">⚡ Quick Demo Login</p>
            <div className="flex gap-2">
              {(['student', 'landlord', 'admin'] as UserRole[]).map((r) => (
                <button key={r} onClick={() => quickLogin(r)} className="px-3 py-1.5 bg-white border border-blue-200 rounded-lg text-xs font-bold text-blue-700 hover:bg-blue-600 hover:text-white transition-all capitalize">
                  {r}
                </button>
              ))}
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Role Selector */}
            <div>
              <p className="text-sm font-semibold text-slate-700 mb-2">I am a...</p>
              <div className="flex h-11 w-full items-center rounded-xl bg-slate-100 p-1">
                {(['student', 'landlord', 'admin'] as UserRole[]).map((r) => (
                  <label key={r} className={`flex cursor-pointer h-full grow items-center justify-center rounded-lg px-2 text-sm font-bold transition-all ${role === r ? 'bg-white shadow-sm text-blue-800' : 'text-slate-500'}`}>
                    <span className="capitalize">{r}</span>
                    <input className="hidden" type="radio" name="role" value={r} checked={role === r} onChange={() => setRole(r)} />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">Email Address</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">mail</span>
                <input id="email" type="email" required autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 transition-all"
                  placeholder="e.g. student@ubuea.cm" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="password">Password</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-[20px]">lock</span>
                <input id="password" type={showPassword ? 'text' : 'password'} required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800/20 focus:border-blue-800 transition-all"
                  placeholder="••••••••" />
                <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400" type="button" onClick={() => setShowPassword(!showPassword)}>
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input className="h-4 w-4 rounded border-slate-300 text-blue-800" id="remember-me" type="checkbox" />
                <label className="text-sm font-medium text-slate-600" htmlFor="remember-me">Remember me</label>
              </div>
              <Link className="text-sm font-bold text-blue-800 hover:underline" href="/forgot-password">Forgot password?</Link>
            </div>

            <Button disabled={loading} type="submit" className="w-full h-auto py-4 rounded-xl bg-blue-800 text-white font-bold hover:bg-blue-900 shadow-lg shadow-blue-800/20 transition-all disabled:opacity-60">
              {loading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link className="font-bold text-blue-800 hover:underline" href="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
