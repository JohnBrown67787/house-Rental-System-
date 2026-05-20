import Image from "next/image";
import Link from "next/link";
import { MOCK_PROPERTIES } from "@/data/mock";

export default function AdminPropertiesPage() {
  const properties = MOCK_PROPERTIES;

  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Property Approvals</h2>
          <p className="text-slate-500">Review and moderate property listings on the platform.</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none">
            <option>All Status</option>
            <option>Pending</option>
            <option>Verified</option>
          </select>
        </div>
      </div>

      {/* Pending approvals alert */}
      {properties.some(p => p.status === 'pending') && (
        <div className="flex items-center gap-3 px-5 py-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl">
          <span className="material-symbols-outlined text-amber-500">warning</span>
          <p className="text-sm font-medium text-amber-800 dark:text-amber-400">
            {properties.filter(p => p.status === 'pending').length} properties are awaiting your review.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {properties.map((property) => (
          <div key={property.id} className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-5 shadow-sm">
            <div className="flex gap-5">
              <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0 bg-slate-200">
                <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{property.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{property.location} · By {property.landlordName}</p>
                  </div>
                  <span className={`shrink-0 px-2.5 py-1 rounded-full text-xs font-bold ${
                    property.status === 'verified' ? 'bg-green-100 text-green-700' :
                    property.status === 'pending' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-500">
                  <span>{property.roomType} · {property.pricePerMonth.toLocaleString()} FCFA/mo</span>
                  <span>Listed: {new Date(property.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </div>
              </div>
              <div className="shrink-0 flex items-center gap-2">
                <Link href={`/property/${property.id}`} className="p-2 text-slate-500 hover:text-blue-600 hover:bg-primary/30 rounded-lg transition-colors" title="Preview">
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </Link>
                {property.status === 'pending' && (
                  <>
                    <button className="px-3 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition-colors">Approve</button>
                    <button className="px-3 py-1.5 bg-red-100 text-red-600 text-xs font-bold rounded-lg hover:bg-red-200 transition-colors">Reject</button>
                  </>
                )}
                {property.status === 'verified' && (
                  <button className="px-3 py-1.5 bg-red-100 text-red-600 text-xs font-bold rounded-lg hover:bg-red-200 transition-colors">Remove</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
