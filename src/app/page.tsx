import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
                #1 Student Housing Platform
              </div>
              <h1 className="text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight">
                Find Affordable Student Housing in <span className="text-blue-600 dark:text-blue-400">Buea</span>
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-lg">
                Connecting students and landlords for the best off-campus living experience. Secure, verified, and close to UB.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/browse">
                  <Button className="px-8 py-6 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:scale-105 transition-transform text-lg">
                    Start Searching
                  </Button>
                </Link>
                <Link href="/signup">
                  <Button variant="outline" className="px-8 py-6 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors text-lg">
                    List Your Property
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/30 rounded-3xl blur-2xl group-hover:bg-primary/40 transition-all"></div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-slate-200" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAUgrCnYy0fuO1Ku-h-hNPJnKfYaNnzMeh0k_3UQExGih8_SqXsfroQs1wa7tizCTgkKtMOTUxzr6XPdIx1vXR1Ra-MnzfBSfLm-GIl_6j-pAgH3ALKwSikt8lBHn4Ci5cq6DTBaKSKRyirVdKh9Pw_PAF6a8UjsojC9szI0YkjT1JPDRiQdflvAEGyIMiBSKc3-A1_13wv-c1mnyZgCbKTvOpB3UV8YnCRYutQuWKxK6He9GCgPdYcI3hfD9XEXiyXtak4gJWuFQEd')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-12 relative z-10 w-full">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Location</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">location_on</span>
                <select className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-accent transition-all appearance-none">
                  <option>Molyko</option>
                  <option>Mile 17</option>
                  <option>Bonduma</option>
                  <option>Great Soppo</option>
                  <option>Dirty South</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Price Range</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">payments</span>
                <select className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-accent transition-all appearance-none">
                  <option>Below 30,000 FCFA</option>
                  <option>30k - 50k FCFA</option>
                  <option>50k - 80k FCFA</option>
                  <option>Above 80,000 FCFA</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Rooms</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">bed</span>
                <select className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-accent transition-all appearance-none">
                  <option>Single Room</option>
                  <option>Studio</option>
                  <option>Modern Studio</option>
                  <option>2 Bedroom Flat</option>
                </select>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase ml-1">Amenities</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-3 text-slate-400">star</span>
                <select className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-accent transition-all appearance-none">
                  <option>Internal Toilet</option>
                  <option>Security Guard</option>
                  <option>Constant Water</option>
                  <option>WiFi Available</option>
                </select>
              </div>
            </div>
            <div className="flex items-end">
              <Button className="w-full py-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-800 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined">search</span>
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Featured Properties</h2>
            <p className="text-slate-500 mt-2">Top rated housing near the University of Buea.</p>
          </div>
          <Link href="/browse" className="text-accent font-semibold flex items-center gap-1 hover:underline cursor-pointer">
            View all <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Property 1 */}
          <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800">
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur rounded-lg px-3 py-1 text-xs font-bold text-accent">Molyko</div>
              <div className="absolute top-4 right-4 z-10 bg-green-500 text-white rounded-lg px-3 py-1 text-xs font-bold">Verified</div>
              <div className="w-full h-full bg-slate-200 transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCzZlSHUlmZmCoErMtUEYHZhCyT1uMZW2bOYtU2KBSihYJqnQ27MeNdaJkKaFPXwp1MkiPkehCt_8289-egIokjQJbpZYEmdC4YW6o4nOP530JaGPulDhH975pj0Gj1R_d7LtKCCfFyQraG83yaVia2MY_4EpVXuZQ379epYUelHWDUV0sgpJngmVq3A3uitpyB8QoB9kZRuVZYB6ZI_4hinzgZ_6Ake27uJvrrzcqW--4f37zpl5BIH8t601FBmpwoJNW7IgjxlOr3')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors">Sunshine Residence</h3>
                <div className="flex items-center gap-1 text-amber-500">
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="text-sm font-bold">4.8</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">bed</span> 1 Room</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">shower</span> Internal</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">shield</span> Secure</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-4">
                <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                  45,000 <span className="text-sm font-medium text-slate-500">FCFA/mo</span>
                </div>
                <Link href="/property/123" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors cursor-pointer shadow-sm">Details</Link>
              </div>
            </div>
          </div>
          {/* Property 2 */}
          <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800">
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur rounded-lg px-3 py-1 text-xs font-bold text-accent">Bonduma</div>
              <div className="w-full h-full bg-slate-200 transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB13pZm_7k22xoononqmdBLtb3JVP1uJoegO_vmAN4VfCvo2Hj4RawJJ1mA2iSEJl2W7kg6kO-j9YDKezYVxmlsvwI262SZj0XhXH-8NPguu7e_vrLNvUuLyMJF-cmNfHacFEm7DIkqrGFtzsDcTKfe8Aq7BGQF3NSHHADRL35pqSkHpKy60Op0j8PwaP5XaB2Ns1QyneLZp7Uz2KU_vLcVdxnLaYMbwWqI5NyQt3mJFnXY3iq466Q4yWYvgWUUbCIGGbJ-L568-BLv')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors">Blue Heights Studio</h3>
                <div className="flex items-center gap-1 text-amber-500">
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="text-sm font-bold">4.6</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">chair</span> Furnished</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">wifi</span> WiFi</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">bolt</span> Included</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-4">
                <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                  65,000 <span className="text-sm font-medium text-slate-500">FCFA/mo</span>
                </div>
                <Link href="/property/123" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors cursor-pointer shadow-sm">Details</Link>
              </div>
            </div>
          </div>
          {/* Property 3 */}
          <div className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-slate-100 dark:border-slate-800">
            <div className="relative aspect-[4/3] overflow-hidden">
              <div className="absolute top-4 left-4 z-10 bg-white/90 backdrop-blur rounded-lg px-3 py-1 text-xs font-bold text-accent">Mile 17</div>
              <div className="absolute top-4 right-4 z-10 bg-blue-500 text-white rounded-lg px-3 py-1 text-xs font-bold">New</div>
              <div className="w-full h-full bg-slate-200 transition-transform duration-500 group-hover:scale-110" 
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC6C28D3zNSct6Zak9h5LLbEBlryvF69OzbQkolZd1Y2JBq2a6qZwkl9x3AybxBLdQs0Xo6bO0_ugqKfsZmfGMonGenJBzGgb-GH7-3WjKroNMCslTC3P-rpXe2vzce4SYyWBwKDQfsThiLha8qJzgLJ9eYi4Kcy-rqGPhtEZgmC8roDa9e2rxaFgvt6FRmJQi_0qlhUc5ngNH9TgZtLlibAl5ofQBhoou9XnxcqYQqdw7TKKVtBqRrX9e0SOBTDH8cJfj2h7Xt4qiQ')", backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold group-hover:text-accent transition-colors">Unity Hostel</h3>
                <div className="flex items-center gap-1 text-amber-500">
                  <span className="material-symbols-outlined text-sm">star</span>
                  <span className="text-sm font-bold">4.5</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-slate-500 text-sm mb-6">
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">group</span> Shared</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">water_drop</span> Water</span>
                <span className="flex items-center gap-1"><span className="material-symbols-outlined text-xs">directions_walk</span> Near Road</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-800 pt-4">
                <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                  25,000 <span className="text-sm font-medium text-slate-500">FCFA/mo</span>
                </div>
                <Link href="/property/123" className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors cursor-pointer shadow-sm">Details</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">How It Works</h2>
          <p className="text-slate-500 max-w-2xl mx-auto mb-16">Three simple steps to finding your next home in the town of legendary hospitality.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Step 1 */}
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#eef6fc] dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-white dark:border-blue-800/50 rotate-3 group-hover:rotate-0 transition-transform">
                <span className="material-symbols-outlined text-3xl font-light">troubleshoot</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Search</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Filter by neighborhood, budget, and amenities to find the rooms that fit your needs.</p>
            </div>
            {/* Step 2 */}
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#eef6fc] dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-white dark:border-blue-800/50 -rotate-3 transition-transform">
                <span className="material-symbols-outlined text-3xl font-light">chat_bubble</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Contact</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Chat directly with verified landlords and schedule a physical visit to the property.</p>
            </div>
            {/* Step 3 */}
            <div className="relative z-10">
              <div className="w-16 h-16 bg-[#eef6fc] dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-white dark:border-blue-800/50 rotate-6 transition-transform">
                <span className="material-symbols-outlined text-3xl font-light">key</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Move In</h3>
              <p className="text-slate-500 text-sm leading-relaxed">Secure your room with a deposit and move in. Focus on your studies while we handle the rest.</p>
            </div>
            {/* Connector Line (Desktop Only) */}
            <div className="hidden md:block absolute top-8 left-1/2 -translate-x-1/2 w-2/3 h-px border-t-2 border-dashed border-slate-200 dark:border-slate-700"></div>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
