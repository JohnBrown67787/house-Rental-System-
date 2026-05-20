'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { propertyApi } from "@/services/api";
import type { Property } from "@/types";

export default function StudentDashboardPage() {
  const [search, setSearch] = useState('');
  const [allProperties, setAllProperties] = useState<Property[]>([]);

  useEffect(() => {
    propertyApi.getAll().then(setAllProperties).catch(console.error);
  }, []);

  const properties = allProperties.filter(p => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.neighborhood.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8">
      {/* Search and Filters */}
      <div className="mb-8 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">search</span>
          <input value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-white dark:bg-slate-900 border-none rounded-xl focus:ring-2 focus:ring-blue-600/50 shadow-sm text-sm" placeholder="Search by neighborhood (Molyko, Bonduma, Dirty South...)" type="text" />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 md:pb-0">
          <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-transparent hover:border-blue-600/30 transition-all text-sm font-medium whitespace-nowrap">
            <span className="material-symbols-outlined text-lg text-slate-400">payments</span>
            Price Range
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-transparent hover:border-blue-600/30 transition-all text-sm font-medium whitespace-nowrap">
            <span className="material-symbols-outlined text-lg text-slate-400">bed</span>
            Room Count
            <span className="material-symbols-outlined text-lg">expand_more</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-primary text-blue-600 rounded-xl shadow-sm border border-blue-600/20 text-sm font-bold whitespace-nowrap">
            <span className="material-symbols-outlined text-lg">filter_alt</span>
            More Filters
          </button>
        </div>
      </div>

      {/* Section Title */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold flex items-center gap-2">
          Available Properties in Buea
          <span className="bg-primary/50 text-blue-600 text-xs px-2 py-0.5 rounded-full">{properties.length} found</span>
        </h3>
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 p-1 rounded-lg shadow-sm border border-slate-100 dark:border-slate-800">
          <button className="p-1.5 bg-primary text-blue-600 rounded-md transition-colors">
            <span className="material-symbols-outlined text-sm">grid_view</span>
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded-md transition-colors">
            <span className="material-symbols-outlined text-sm">list</span>
          </button>
        </div>
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {properties.map(property => (
          <div key={property.id} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-slate-100 dark:border-slate-800 flex flex-col">
            <div className="relative h-48 overflow-hidden shrink-0">
              <Image 
                src={property.images[0]} 
                alt={property.title} 
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {property.status === 'verified' && (
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">Verified</span>
                </div>
              )}
              <button className="absolute top-3 right-3 p-2 bg-white/30 backdrop-blur-md rounded-full text-white hover:bg-white hover:text-red-500 transition-all">
                <span className="material-symbols-outlined text-lg">favorite</span>
              </button>
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-lg text-blue-800 font-bold text-sm">
                {property.pricePerMonth.toLocaleString()} FCFA <span className="text-[10px] font-normal text-slate-500">/mo</span>
              </div>
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-1 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-1">
                <span className="material-symbols-outlined text-[12px]">location_on</span> {property.location}
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 truncate">{property.title}</h4>
              <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-xs mb-4">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">bed</span> {property.bedsCount} Room
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">bathtub</span> {property.bathType === 'private' ? 'Private' : 'Shared'}
                </div>
              </div>
              <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                <div className="flex gap-2">
                  {property.amenities.slice(0, 3).map((a, i) => (
                    <div key={i} className="size-7 rounded-lg bg-primary/40 flex items-center justify-center text-blue-600" title={a}>
                      <span className="material-symbols-outlined text-sm">check</span>
                    </div>
                  ))}
                </div>
                <Link href={`/property/${property.id}`} className="px-4 py-2 h-auto bg-primary dark:bg-slate-800 hover:bg-blue-600 hover:text-white text-blue-600 dark:text-slate-300 text-xs font-bold rounded-lg transition-all inline-flex items-center justify-center">View Details</Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map View Teaser */}
      <div className="mt-12 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-4">Explore Property Map</h3>
          <p className="text-slate-500 mb-6 leading-relaxed">Visualize all available properties in relation to the University of Buea campus and major landmarks. Save time by choosing a location that suits your commute.</p>
          <Button className="px-8 py-6 h-auto bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-all flex items-center gap-2">
            <span className="material-symbols-outlined">map</span>
            Open Map View
          </Button>
        </div>
        <div className="w-full md:w-1/2 h-64 rounded-2xl overflow-hidden relative group cursor-pointer shadow-inner bg-slate-200">
          <Image 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop" 
            alt="Map view" 
            fill
            className="object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-4 rounded-2xl border border-white/50 dark:border-slate-700/50 flex flex-col items-center">
              <span className="material-symbols-outlined text-blue-600 text-3xl mb-1">location_searching</span>
              <span className="text-xs font-bold text-slate-800 dark:text-white">Click to Explore</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer/Bottom Info */}
      <footer className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 pb-8">
        <p className="text-sm text-slate-400">© 2024 Buea Rentals System. Built for Students.</p>
        <div className="flex gap-6">
          <a className="text-xs font-medium text-slate-500 hover:text-blue-600" href="#">Privacy Policy</a>
          <a className="text-xs font-medium text-slate-500 hover:text-blue-600" href="#">Terms of Service</a>
          <a className="text-xs font-medium text-slate-500 hover:text-blue-600" href="#">Guidelines</a>
        </div>
      </footer>
    </div>
  );
}
