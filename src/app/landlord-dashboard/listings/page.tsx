'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { propertyApi } from "@/services/api";
import type { Property } from "@/types";

export default function LandlordListingsPage() {
  const [listings, setListings] = useState<Property[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    propertyApi.getAll()
      .then(all => setListings(all.filter(p => p.landlordId === user.id)))
      .catch(console.error);
  }, [user]);

  const deleteListing = async (id: string) => {
    try {
      await propertyApi.delete(id);
      setListings(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  const statusBadge = (status: string, isAvailable: boolean) => {
    if (status === 'pending') return <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-bold">Pending Review</span>;
    if (!isAvailable) return <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">Occupied</span>;
    return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Available</span>;
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Listings</h2>
          <p className="text-slate-500">{listings.length} properties in your portfolio.</p>
        </div>
        <Link href="/landlord-dashboard/add-property" className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors">
          <span className="material-symbols-outlined text-sm">add</span>
          Add Property
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">home_work</span>
          <h3 className="text-xl font-bold text-slate-700 mb-2">No properties listed yet</h3>
          <p className="text-slate-500 mb-6">Create your first property listing to start receiving booking requests.</p>
          <Link href="/landlord-dashboard/add-property" className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            <span className="material-symbols-outlined text-sm">add</span> Add Property
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((property) => (
            <div key={property.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex flex-col md:flex-row gap-5">
                <div className="relative w-full md:w-40 h-32 md:h-28 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                  <Image src={property.images[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=400'} alt={property.title} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h4 className="font-bold text-slate-900 dark:text-white truncate text-lg">{property.title}</h4>
                      <div className="flex items-center gap-1 text-slate-500 text-sm mt-0.5">
                        <span className="material-symbols-outlined text-sm">location_on</span>
                        {property.location}
                      </div>
                    </div>
                    {statusBadge(property.status, property.isAvailable)}
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-6 text-sm text-slate-600 dark:text-slate-400 border-t border-slate-50 dark:border-slate-800 pt-3">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-blue-500">payments</span>
                      <strong className="text-slate-900 dark:text-white">{property.pricePerMonth.toLocaleString()} FCFA</strong>/mo
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-blue-500">bed</span>
                      <span className="capitalize">{property.roomType}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                      {property.rating} ({property.reviewCount})
                    </span>
                  </div>
                </div>
                <div className="flex md:flex-col items-center justify-end gap-2 shrink-0 border-t md:border-t-0 md:border-l border-slate-50 dark:border-slate-800 pt-3 md:pt-0 md:pl-4">
                  <Link href={`/property/${property.id}`} className="w-full md:w-auto p-2 text-slate-500 hover:text-blue-600 hover:bg-primary/30 rounded-lg transition-colors text-center" title="View listing">
                    <span className="material-symbols-outlined">open_in_new</span>
                  </Link>
                  <Link href={`/landlord-dashboard/edit-property/${property.id}`} className="w-full md:w-auto p-2 text-slate-500 hover:text-blue-600 hover:bg-primary/30 rounded-lg transition-colors text-center" title="Edit listing">
                    <span className="material-symbols-outlined">edit</span>
                  </Link>
                  <button onClick={() => deleteListing(property.id)} className="w-full md:w-auto p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors text-center" title="Delete listing">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
