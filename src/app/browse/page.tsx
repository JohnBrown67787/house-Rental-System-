'use client';
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { propertyApi } from "@/services/api";
import type { Property, RoomType } from "@/types";

const PRICE_RANGES = [
  { label: 'Any Price', min: 0, max: Infinity },
  { label: 'Under 30k', min: 0, max: 30000 },
  { label: '30k – 60k', min: 30000, max: 60000 },
  { label: '60k – 100k', min: 60000, max: 100000 },
  { label: '100k+', min: 100000, max: Infinity },
];

const ROOM_TYPES: { label: string; value: RoomType | 'all' }[] = [
  { label: 'Any Type', value: 'all' },
  { label: 'Studio', value: 'studio' },
  { label: 'Single Room', value: 'single' },
  { label: 'Shared', value: 'shared' },
  { label: '2 Bedroom', value: 'two-bedroom' },
];

const AMENITY_FILTERS = ['WiFi', 'Water', 'Security', 'Parking', 'Furnished'];

export default function BrowseHouses() {
  const [search, setSearch] = useState('');
  const [priceRange, setPriceRange] = useState(0); // index into PRICE_RANGES
  const [roomType, setRoomType] = useState<RoomType | 'all'>('all');
  const [amenityFilters, setAmenityFilters] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<Set<string>>(new Set());
  const [allProperties, setAllProperties] = useState<Property[]>([]);

  useEffect(() => {
    propertyApi.getAll().then(setAllProperties).catch(console.error);
  }, []);

  const toggleAmenity = (a: string) =>
    setAmenityFilters(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const toggleSave = (id: string) =>
    setSavedIds(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const filtered = useMemo(() => {
    const { min, max } = PRICE_RANGES[priceRange];
    return allProperties.filter(p => {
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.neighborhood.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
      const matchPrice = p.pricePerMonth >= min && p.pricePerMonth <= max;
      const matchRoom = roomType === 'all' || p.roomType === roomType;
      const matchAmenities = amenityFilters.length === 0 || amenityFilters.every(a => p.amenities.includes(a));
      const notRejected = p.status !== 'rejected';
      return matchSearch && matchPrice && matchRoom && matchAmenities && notRejected;
    });
  }, [search, priceRange, roomType, amenityFilters, allProperties]);

  return (
    <main className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Header />
      <div className="flex-1 px-6 lg:px-20 py-6 max-w-[1440px] mx-auto w-full">
        <nav className="flex items-center gap-2 mb-6 text-sm">
          <Link href="/" className="text-slate-500 hover:text-slate-900">Home</Link>
          <span className="material-symbols-outlined text-xs text-slate-400">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-100 font-medium">Browse Houses</span>
        </nav>

        {/* Filter Bar */}
        <section className="bg-white dark:bg-slate-900 p-4 lg:p-6 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="lg:col-span-2 relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-slate-400">search</span>
              <input value={search} onChange={e => setSearch(e.target.value)}
                className="w-full h-12 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-600/30 focus:outline-none"
                placeholder="Search Molyko, Mile 17, Bonduma..." type="text" />
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-slate-400">payments</span>
              <select value={priceRange} onChange={e => setPriceRange(Number(e.target.value))}
                className="w-full h-12 pl-10 pr-8 appearance-none rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-600/30 focus:outline-none">
                {PRICE_RANGES.map((r, i) => <option key={i} value={i}>{r.label}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-3 pointer-events-none text-slate-400">expand_more</span>
            </div>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-slate-400">bed</span>
              <select value={roomType} onChange={e => setRoomType(e.target.value as RoomType | 'all')}
                className="w-full h-12 pl-10 pr-8 appearance-none rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-blue-600/30 focus:outline-none">
                {ROOM_TYPES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
              </select>
              <span className="material-symbols-outlined absolute right-3 pointer-events-none text-slate-400">expand_more</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-500 self-center mr-1">Amenities:</span>
            {AMENITY_FILTERS.map(a => (
              <button key={a} onClick={() => toggleAmenity(a)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${amenityFilters.includes(a) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 hover:border-blue-400'}`}>
                {a}
              </button>
            ))}
            {(search || priceRange > 0 || roomType !== 'all' || amenityFilters.length > 0) && (
              <button onClick={() => { setSearch(''); setPriceRange(0); setRoomType('all'); setAmenityFilters([]); }}
                className="px-3 py-1.5 rounded-full text-xs font-bold text-red-500 border border-red-200 hover:bg-red-50 transition-all ml-auto">
                Clear all ✕
              </button>
            )}
          </div>
        </section>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Properties in Buea <span className="text-slate-400 font-normal text-base ml-2">({filtered.length} result{filtered.length !== 1 ? 's' : ''})</span>
          </h3>
        </div>

        {/* Property Grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="material-symbols-outlined text-5xl text-slate-300 mb-4">search_off</span>
            <h3 className="text-lg font-bold text-slate-700 mb-2">No properties found</h3>
            <p className="text-slate-500">Try adjusting your filters or clearing the search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(property => (
              <PropertyCard key={property.id} property={property} isSaved={savedIds.has(property.id)} onToggleSave={() => toggleSave(property.id)} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

function PropertyCard({ property, isSaved, onToggleSave }: { property: Property; isSaved: boolean; onToggleSave: () => void }) {
  return (
    <div className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800">
      <div className="relative aspect-[4/3] overflow-hidden">
        {property.status === 'verified' && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">Verified</span>
          </div>
        )}
        <button onClick={onToggleSave} className="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm p-1.5 rounded-full transition-colors hover:scale-110">
          <span className="material-symbols-outlined text-xl" style={{ color: isSaved ? '#ef4444' : '#94a3b8', fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
        </button>
        <div className="w-full h-full bg-center bg-cover transition-transform duration-500 group-hover:scale-110"
          style={{ backgroundImage: `url('${property.images[0]}')` }} />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-slate-900 dark:text-slate-100 truncate flex-1">{property.title}</h4>
          <div className="text-right shrink-0 ml-2">
            <span className="block font-bold text-slate-900 dark:text-slate-100 text-sm">{property.pricePerMonth.toLocaleString()} FCFA</span>
            <span className="text-[10px] text-slate-400 uppercase font-bold">per month</span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-slate-500 text-sm mb-3">
          <span className="material-symbols-outlined text-sm">location_on</span>
          <span>{property.location}</span>
        </div>
        <div className="flex items-center gap-3 py-2 border-y border-slate-100 dark:border-slate-800 mb-3 text-xs text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">bed</span>{property.bedsCount} Room</div>
          <div className="flex items-center gap-1"><span className="material-symbols-outlined text-base">shower</span>{property.bathType === 'private' ? 'Private' : 'Shared'}</div>
          <div className="flex items-center gap-1 ml-auto"><span className="material-symbols-outlined text-sm text-amber-400">star</span><span>{property.rating}</span></div>
        </div>
        <Link href={`/property/${property.id}`} className="block w-full py-2.5 bg-primary hover:bg-primary/80 text-blue-700 font-bold text-sm rounded-lg transition-colors text-center">
          View Details →
        </Link>
      </div>
    </div>
  );
}
