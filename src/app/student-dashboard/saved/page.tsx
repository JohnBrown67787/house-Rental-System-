import Image from "next/image";
import Link from "next/link";
import { MOCK_SAVED } from "@/data/mock";

export default function SavedPropertiesPage() {
  const savedList = MOCK_SAVED;

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Saved Properties</h2>
          <p className="text-slate-500">{savedList.length} properties saved to your list.</p>
        </div>
        <Link href="/browse" className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 transition-colors">
          <span className="material-symbols-outlined text-sm">search</span>
          Browse More
        </Link>
      </div>

      {savedList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl text-blue-600">favorite</span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">No saved properties yet</h3>
          <p className="text-slate-500 max-w-sm">Start browsing and save properties you like to compare them later.</p>
          <Link href="/browse" className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
            Browse Houses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedList.map(({ property, savedAt }) => (
            <div key={property.id} className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800">
              <div className="relative aspect-[4/3] overflow-hidden">
                <div className="absolute top-3 left-3 z-10 bg-white/90 backdrop-blur rounded-lg px-2 py-1 text-xs font-bold text-blue-600">{property.neighborhood}</div>
                {property.status === 'verified' && (
                  <div className="absolute top-3 right-3 z-10 bg-green-500 text-white rounded-lg px-2 py-1 text-xs font-bold">Verified</div>
                )}
                <button className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur rounded-full p-1.5 text-red-500 hover:bg-red-50 transition-colors" title="Remove from saved">
                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>favorite</span>
                </button>
                <div
                  className="w-full h-full bg-slate-200 transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url('${property.images[0]}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 text-blue-600 text-[10px] font-bold uppercase tracking-widest mb-1">
                  <span className="material-symbols-outlined text-[12px]">location_on</span> {property.location}
                </div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 truncate group-hover:text-blue-600 transition-colors">{property.title}</h4>
                <div className="flex items-center gap-4 text-slate-500 dark:text-slate-400 text-xs mb-4">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">bed</span> {property.bedsCount} Room
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">shower</span> {property.bathType === 'private' ? 'Private Bath' : 'Shared Bath'}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-50 dark:border-slate-800">
                  <div>
                    <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                      {property.pricePerMonth.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500"> FCFA/mo</span>
                  </div>
                  <Link href={`/property/${property.id}`} className="text-blue-600 font-bold text-sm hover:underline">Details</Link>
                </div>
                <p className="text-[10px] text-slate-400 mt-2">Saved on {new Date(savedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
