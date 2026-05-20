'use client';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/types";

export default function SignupPage() {
  const { signup } = useAuth();
  const [role, setRole] = useState<UserRole>('student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) { setError('Please fill in all fields.'); return; }
    setError('');
    setLoading(true);
    try { await signup(name, email, password, role); }
    catch { setError('Sign up failed. Please try again.'); setLoading(false); }
  };

  return (
    <div className="flex min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      {/* Left Side: Visual Anchor (Split Screen) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary/20 dark:bg-primary/10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/40 to-white dark:from-background-dark dark:via-primary/20 dark:to-background-dark opacity-60"></div>
          <Image 
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop" 
            alt="Modern apartment building" 
            fill
            className="object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-20 space-y-8 w-full">
          <div className="flex items-center gap-3 text-slate-900 dark:text-slate-100">
            <div className="bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 p-2 rounded-lg">
              <span className="material-symbols-outlined text-3xl">domain</span>
            </div>
            <Link href="/" className="text-3xl font-extrabold tracking-tight">Buea Rentals</Link>
          </div>
          <div className="space-y-4 max-w-md">
            <h2 className="text-5xl font-black leading-tight text-slate-900 dark:text-slate-100">
              Find your perfect stay in the city.
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Whether you are a student looking for a hostel or a landlord managing properties, we make the process seamless.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="material-symbols-outlined text-blue-600">verified_user</span>
              <span className="text-sm font-semibold">Verified Listings</span>
            </div>
            <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="material-symbols-outlined text-blue-600">support_agent</span>
              <span className="text-sm font-semibold">24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side: Signup Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 py-12 bg-white dark:bg-background-dark">
        <div className="w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center lg:text-left">
            <div className="lg:hidden flex justify-center mb-6">
              <Link href="/" className="flex items-center gap-2">
                <span className="material-symbols-outlined text-4xl text-blue-600">domain</span>
                <span className="text-2xl font-bold">Buea Rentals</span>
              </Link>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">Join Buea Rentals</h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">Find your perfect stay or manage your properties with ease.</p>
          </div>

          {/* Registration Role Selection */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Register as</label>
            <div className="grid grid-cols-2 gap-4">
              {/* Student Card */}
              <label className="relative group cursor-pointer" onClick={() => setRole('student')}>
                <input className="peer sr-only" name="role" type="radio" value="student" checked={role === 'student'} onChange={() => {}} />
                <div className="p-4 border-2 border-slate-100 dark:border-slate-800 rounded-xl transition-all group-hover:border-primary peer-checked:border-blue-500 peer-checked:bg-primary/30 dark:peer-checked:bg-blue-900/20">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <span className="material-symbols-outlined text-3xl text-slate-400 peer-checked:text-blue-600 group-hover:text-blue-500">school</span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">Student</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Finding a home</p>
                    </div>
                  </div>
                </div>
              </label>

              {/* Landlord Card */}
              <label className="relative group cursor-pointer" onClick={() => setRole('landlord')}>
                <input className="peer sr-only" name="role" type="radio" value="landlord" checked={role === 'landlord'} onChange={() => {}} />
                <div className="p-4 border-2 border-slate-100 dark:border-slate-800 rounded-xl transition-all group-hover:border-primary peer-checked:border-blue-500 peer-checked:bg-primary/30 dark:peer-checked:bg-blue-900/20">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <span className="material-symbols-outlined text-3xl text-slate-400 peer-checked:text-blue-600 group-hover:text-blue-500">real_estate_agent</span>
                    <div>
                      <p className="font-bold text-slate-900 dark:text-slate-100">Landlord</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Listing properties</p>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="full-name">Full Name</label>
                <div className="mt-1">
                  <input className="block w-full px-4 py-3 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" id="full-name" name="full-name" placeholder="John Doe" required type="text" value={name} onChange={e => setName(e.target.value)} />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="email">Email Address</label>
                <div className="mt-1">
                  <input autoComplete="email" className="block w-full px-4 py-3 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" id="email" name="email" placeholder="john@example.com" required type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="password">Password</label>
                  <div className="mt-1 relative">
                    <input className="block w-full px-4 py-3 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" id="password" name="password" placeholder="••••••••" required type="password" value={password} onChange={e => setPassword(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300" htmlFor="confirm-password">Confirm Password</label>
                  <div className="mt-1 relative">
                    <input className="block w-full px-4 py-3 rounded-lg border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors" id="confirm-password" name="confirm-password" placeholder="••••••••" required type="password" />
                  </div>
                </div>
              </div>
            </div>

            {error && <p className="text-sm text-red-600 bg-red-50 px-4 py-2 rounded-lg">{error}</p>}

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 dark:border-slate-700 rounded bg-slate-50 dark:bg-slate-800" id="terms" name="terms" required type="checkbox" />
              </div>
              <div className="ml-3 text-sm">
                <label className="text-slate-500 dark:text-slate-400" htmlFor="terms">
                  I agree to the <a className="font-medium text-blue-600 hover:text-blue-500 underline decoration-2 underline-offset-4" href="#">Terms of Service</a> and <a className="font-medium text-blue-600 hover:text-blue-500 underline decoration-2 underline-offset-4" href="#">Privacy Policy</a>.
                </label>
              </div>
            </div>

            <div>
              <Button disabled={loading} type="submit" className="w-full flex justify-center items-center gap-2 py-6 border border-transparent rounded-lg shadow-sm text-sm font-bold text-slate-900 bg-primary hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all transform active:scale-[0.98] disabled:opacity-60">
                <span className="material-symbols-outlined">{loading ? 'progress_activity' : 'person_add'}</span>
                {loading ? 'Creating Account...' : 'Create Account'}
              </Button>
            </div>
          </form>

          <div className="pt-6 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Already have an account?{' '}
              <Link className="font-bold text-blue-600 hover:text-blue-500 transition-colors" href="/login">Login</Link>
            </p>
          </div>

          {/* Footer Support */}
          <div className="flex justify-center gap-6 pt-4">
            <a className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" href="#">Help Center</a>
            <a className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" href="#">Contact Us</a>
            <a className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200" href="#">Legal</a>
          </div>
        </div>
      </div>
    </div>
  );
}
