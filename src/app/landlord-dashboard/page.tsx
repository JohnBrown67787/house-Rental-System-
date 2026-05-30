'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { bookingApi, propertyApi } from "@/services/api";
import type { Booking, BookingStatus, Property } from "@/types";

export default function LandlordDashboardPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    bookingApi.getByLandlordId(user.id).then(setBookings).catch(console.error);
    propertyApi.getAll()
      .then(allProps => setProperties(allProps.filter(p => p.landlordId === user.id)))
      .catch(console.error);
  }, [user]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const updateStatus = async (id: string, status: BookingStatus) => {
    setUpdatingId(id);
    try {
      await bookingApi.updateStatus(id, status);
      setBookings(prev => prev.map(b => b.id === id ? { ...b, status } : b));
      showToast(status === 'confirmed' ? '✅ Booking approved!' : '❌ Booking rejected.');
    } catch (err) {
      console.error(err);
      showToast('Failed to update booking.');
    } finally {
      setUpdatingId(null);
    }
  };

  const pendingBookings = bookings.filter(b => b.status === 'pending');
  const totalListings = properties.length;
  const availableListings = properties.filter(p => p.isAvailable).length;

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-8">
      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        {[
          { label: 'Total Listings', value: totalListings, icon: 'apartment', color: 'text-blue-600', bg: 'bg-primary/30' },
          { label: 'Available Now', value: availableListings, icon: 'check_circle', color: 'text-green-600', bg: 'bg-green-100' },
          { label: 'Pending Requests', value: pendingBookings.length, icon: 'pending_actions', color: 'text-amber-600', bg: 'bg-amber-100' },
        ].map(s => (
          <div key={s.label} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm flex items-center gap-4">
            <div className={`${s.bg} w-12 h-12 rounded-xl flex items-center justify-center`}>
              <span className={`material-symbols-outlined ${s.color}`}>{s.icon}</span>
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{s.value}</p>
              <p className="text-sm text-slate-500">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/landlord-dashboard/add-property" className="flex items-center gap-2 px-5 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors text-sm">
          <span className="material-symbols-outlined text-sm">add</span> Add New Property
        </Link>
        <Link href="/landlord-dashboard/listings" className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors text-sm">
          <span className="material-symbols-outlined text-sm">list_alt</span> View All Listings
        </Link>
        <Link href="/landlord-dashboard/messages" className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors text-sm">
          <span className="material-symbols-outlined text-sm">chat</span> Messages
        </Link>
      </div>

      {/* Booking Requests */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-slate-900 dark:text-white">Booking Requests</h3>
          {pendingBookings.length > 0 && (
            <span className="bg-amber-100 text-amber-700 text-xs font-bold px-2 py-1 rounded-full animate-pulse">
              {pendingBookings.length} pending
            </span>
          )}
        </div>

        {bookings.length === 0 ? (
          <div className="text-center py-12 text-slate-400">
            <span className="material-symbols-outlined text-4xl mb-2 block">inbox</span>
            <p className="text-sm">No booking requests yet.</p>
            <p className="text-xs mt-1 text-slate-400">When students request to book your properties, they'll appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-50 dark:divide-slate-800">
            {bookings.map(booking => (
              <div key={booking.id} className="px-6 py-5 flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-blue-700 font-black shrink-0 text-sm">
                      {booking.studentName[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-900 dark:text-white text-sm">{booking.studentName}</p>
                        <StatusBadge status={booking.status} />
                      </div>
                      <p className="text-xs text-blue-600">{booking.propertyTitle}</p>
                    </div>
                  </div>

                  {/* Student contact info */}
                  {(booking.studentEmail || booking.studentPhone) && (
                    <div className="flex flex-wrap gap-3 mb-2 ml-13 pl-1">
                      {booking.studentEmail && (
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <span className="material-symbols-outlined text-xs">mail</span>
                          {booking.studentEmail}
                        </span>
                      )}
                      {booking.studentPhone && (
                        <span className="flex items-center gap-1 text-xs text-slate-500">
                          <span className="material-symbols-outlined text-xs">phone</span>
                          {booking.studentPhone}
                        </span>
                      )}
                    </div>
                  )}

                  <p className="text-sm text-slate-600 dark:text-slate-400 mb-2 pl-1 line-clamp-2 italic">"{booking.message}"</p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pl-1">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">calendar_today</span>
                      Move-in: <strong className="text-slate-700 dark:text-slate-300 ml-1">{booking.moveInDate}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      <strong className="text-slate-700 dark:text-slate-300">{booking.duration === 'academic-year' ? 'Academic Year' : 'Monthly'}</strong>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">payments</span>
                      <strong className="text-slate-700 dark:text-slate-300">{booking.totalAmount?.toLocaleString()} FCFA</strong>
                    </span>
                  </div>
                </div>

                {booking.status === 'pending' && (
                  <div className="flex flex-col gap-2 shrink-0">
                    <button
                      disabled={updatingId === booking.id}
                      onClick={() => updateStatus(booking.id, 'confirmed')}
                      className="px-4 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      {updatingId === booking.id
                        ? <span className="material-symbols-outlined text-xs animate-spin">progress_activity</span>
                        : <span className="material-symbols-outlined text-xs">check</span>
                      }
                      Approve
                    </button>
                    <button
                      disabled={updatingId === booking.id}
                      onClick={() => updateStatus(booking.id, 'rejected')}
                      className="px-4 py-1.5 bg-red-100 text-red-600 text-xs font-bold rounded-lg hover:bg-red-200 transition-colors disabled:opacity-50 flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">close</span>
                      Reject
                    </button>
                    <Link
                      href={`/landlord-dashboard/messages`}
                      className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">chat</span>
                      Message
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recent Listings Preview */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900 dark:text-white">Your Properties</h3>
          <Link href="/landlord-dashboard/listings" className="text-sm text-blue-600 font-bold hover:underline">Manage all →</Link>
        </div>
        {properties.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">
            <span className="material-symbols-outlined text-3xl block mb-2">apartment</span>
            No properties yet. <Link href="/landlord-dashboard/add-property" className="text-blue-600 font-bold hover:underline">Add your first listing →</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.slice(0, 3).map(p => {
              const propertyBookings = bookings.filter(b => b.propertyId === p.id && b.status === 'pending');
              return (
                <div key={p.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl relative">
                  <div className="w-12 h-12 rounded-lg overflow-hidden relative bg-slate-200 shrink-0">
                    <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${p.images[0]}')` }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-slate-900 dark:text-white truncate">{p.title}</p>
                    <p className="text-xs text-slate-500">{p.pricePerMonth.toLocaleString()} FCFA/mo</p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`w-2 h-2 rounded-full ${p.isAvailable ? 'bg-green-500' : 'bg-red-400'}`} />
                    {propertyBookings.length > 0 && (
                      <span className="bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        {propertyBookings.length}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-xl font-bold text-sm flex items-center gap-2 z-50">
          {toast}
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-green-100 text-green-700',
    rejected: 'bg-red-100 text-red-700',
    cancelled: 'bg-slate-100 text-slate-600',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${styles[status] ?? styles.pending}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}
