'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { propertyApi } from "@/services/api";
import type { Property } from "@/types";

export default function AdminDashboardPage() {
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifiedCount, setVerifiedCount] = useState(0);

  useEffect(() => {
    Promise.all([
      propertyApi.getAll(),
      fetch('/api/users').then(r => r.ok ? r.json() : []),
    ]).then(([props, usrs]) => {
      setAllProperties(props);
      setUsers(usrs);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const pendingProperties = allProperties.filter(p => p.status === 'pending');
  const students = users.filter(u => u.role === 'student');
  const landlords = users.filter(u => u.role === 'landlord');

  const handleApprove = async (id: string) => {
    try {
      await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'verified' }),
      });
      setAllProperties(prev => prev.map(p => p.id === id ? { ...p, status: 'verified' } : p));
      setVerifiedCount(v => v + 1);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await fetch(`/api/properties/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'rejected' }),
      });
      setAllProperties(prev => prev.map(p => p.id === id ? { ...p, status: 'rejected' } : p));
    } catch (err) {
      console.error(err);
    }
  };

  const stats = [
    { label: 'Total Properties', value: allProperties.length, icon: 'apartment', color: 'text-blue-600', bg: 'bg-primary/30' },
    { label: 'Students', value: students.length, icon: 'school', color: 'text-purple-600', bg: 'bg-purple-100' },
    { label: 'Landlords', value: landlords.length, icon: 'person', color: 'text-indigo-600', bg: 'bg-indigo-100' },
    { label: 'Pending Approvals', value: pendingProperties.length, icon: 'pending_actions', color: 'text-amber-600', bg: 'bg-amber-100' },
    { label: 'Available', value: allProperties.filter(p => p.isAvailable).length, icon: 'check_circle', color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Verified', value: allProperties.filter(p => p.status === 'verified').length, icon: 'verified', color: 'text-emerald-600', bg: 'bg-emerald-100' },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8">
      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Overview</h2>
        <p className="text-slate-500">Platform health and pending actions.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <span className="material-symbols-outlined text-4xl text-blue-600 animate-spin">progress_activity</span>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
            {stats.map(s => (
              <div key={s.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm">
                <div className={`${s.bg} w-10 h-10 rounded-xl flex items-center justify-center mb-3`}>
                  <span className={`material-symbols-outlined text-lg ${s.color}`}>{s.icon}</span>
                </div>
                <p className="text-xl font-black text-slate-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Pending Property Approvals */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white">Pending Approvals</h3>
                {pendingProperties.length > 0 && (
                  <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full">{pendingProperties.length} pending</span>
                )}
              </div>
              {pendingProperties.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm">
                  <span className="material-symbols-outlined text-3xl block mb-2">check_circle</span>
                  All caught up! No pending approvals.
                </div>
              ) : (
                <div className="divide-y divide-slate-50 dark:divide-slate-800">
                  {pendingProperties.map(p => (
                    <div key={p.id} className="px-6 py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-200 overflow-hidden relative shrink-0">
                        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${p.images[0]}')` }} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{p.title}</p>
                        <p className="text-xs text-slate-500">{p.location} · By {p.landlordName}</p>
                      </div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => handleApprove(p.id)} className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors">Approve</button>
                        <button onClick={() => handleReject(p.id)} className="px-3 py-1.5 bg-red-100 text-red-600 text-xs font-bold rounded-lg hover:bg-red-200 transition-colors">Reject</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Users */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white">Recent Users</h3>
              </div>
              {users.filter(u => u.role !== 'admin').length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-sm">
                  <span className="material-symbols-outlined text-3xl block mb-2">group</span>
                  No users registered yet.
                </div>
              ) : (
                <div className="divide-y divide-slate-50 dark:divide-slate-800">
                  {users.filter(u => u.role !== 'admin').slice(0, 6).map(user => (
                    <div key={user._id || user.id} className="px-6 py-4 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-blue-700 font-black text-sm shrink-0">
                        {user.name[0]}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-slate-900 dark:text-white">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.email}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.role === 'student' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                        {user.role}
                      </span>
                    </div>
                  ))}
                </div>
              )}
              <div className="px-6 py-3 border-t border-slate-50 dark:border-slate-800">
                <Link href="/admin-dashboard/users" className="text-sm text-blue-600 font-bold hover:underline">Manage all users →</Link>
              </div>
            </div>
          </div>
        </>
      )}

      {verifiedCount > 0 && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-5 py-3 rounded-2xl shadow-xl font-bold text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-sm">check_circle</span>
          {verifiedCount} propert{verifiedCount > 1 ? 'ies' : 'y'} approved!
        </div>
      )}
    </div>
  );
}
