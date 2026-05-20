'use client';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { propertyApi, bookingApi } from "@/services/api";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import type { Property } from "@/types";

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [property, setProperty] = useState<Property | undefined>(undefined);

  useEffect(() => {
    propertyApi.getById(params.id).then(found => {
      if (found) {
        setProperty(found);
      } else {
        // Fallback mock property so the UI can be viewed even if DB is empty or ID doesn't exist
        setProperty({
          id: params.id,
          title: "Sunshine Residence - Premium Studio",
          description: "A beautiful, fully furnished apartment perfect for students. Located just 5 minutes from the university campus with 24/7 security and constant water supply. The area is quiet and conducive for studying, featuring modern finishing and spacious rooms.",
          location: "Molyko, Buea",
          pricePerMonth: 45000,
          images: [
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCzZlSHUlmZmCoErMtUEYHZhCyT1uMZW2bOYtU2KBSihYJqnQ27MeNdaJkKaFPXwp1MkiPkehCt_8289-egIokjQJbpZYEmdC4YW6o4nOP530JaGPulDhH975pj0Gj1R_d7LtKCCfFyQraG83yaVia2MY_4EpVXuZQ379epYUelHWDUV0sgpJngmVq3A3uitpyB8QoB9kZRuVZYB6ZI_4hinzgZ_6Ake27uJvrrzcqW--4f37zpl5BIH8t601FBmpwoJNW7IgjxlOr3"
          ],
          amenities: ["Internal Toilet", "Constant Water", "Security Guard", "WiFi Available"],
          roomType: "studio",
          bathType: "internal",
          isAvailable: true,
          landlordId: "landlord-1",
          landlordName: "Mr. Erasmo Lafadi",
          landlordAvatar: "",
          rating: 4.8,
          reviewCount: 24,
          status: 'verified',
          createdAt: new Date().toISOString()
        } as Property);
      }
    }).catch(err => {
      console.error(err);
      // Fallback on error too
      setProperty({
        id: params.id,
        title: "Sunshine Residence - Premium Studio",
        description: "A beautiful, fully furnished apartment perfect for students. Located just 5 minutes from the university campus with 24/7 security and constant water supply. The area is quiet and conducive for studying, featuring modern finishing and spacious rooms.",
        location: "Molyko, Buea",
        pricePerMonth: 45000,
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCzZlSHUlmZmCoErMtUEYHZhCyT1uMZW2bOYtU2KBSihYJqnQ27MeNdaJkKaFPXwp1MkiPkehCt_8289-egIokjQJbpZYEmdC4YW6o4nOP530JaGPulDhH975pj0Gj1R_d7LtKCCfFyQraG83yaVia2MY_4EpVXuZQ379epYUelHWDUV0sgpJngmVq3A3uitpyB8QoB9kZRuVZYB6ZI_4hinzgZ_6Ake27uJvrrzcqW--4f37zpl5BIH8t601FBmpwoJNW7IgjxlOr3"
        ],
        amenities: ["Internal Toilet", "Constant Water", "Security Guard", "WiFi Available"],
        roomType: "studio",
        bathType: "internal",
        isAvailable: true,
        landlordId: "landlord-1",
        landlordName: "Mr. Erasmo Lafadi",
        landlordAvatar: "",
        rating: 4.8,
        reviewCount: 24,
        status: 'verified',
        createdAt: new Date().toISOString()
      } as Property);
    });
  }, [params.id]);
  const [isSaved, setIsSaved] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [moveInDate, setMoveInDate] = useState('');
  const [duration, setDuration] = useState<'monthly' | 'academic-year'>('academic-year');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      router.push('/login');
      return;
    }
    try {
      await bookingApi.add({
        id: `booking-${Date.now()}`,
        propertyId: property!.id,
        propertyTitle: property!.title,
        propertyImage: property!.images[0],
        landlordId: property!.landlordId,
        studentId: user!.id,
        studentName: user!.name,
        status: 'pending',
        moveInDate,
        duration,
        message,
        totalAmount: property!.pricePerMonth * (duration === 'academic-year' ? 9 : 1),
      });
      setBookingSubmitted(true);
      setTimeout(() => { setShowBookingModal(false); setBookingSubmitted(false); }, 2500);
    } catch (err) {
      console.error(err);
    }
  };

  const handleContactLandlord = () => {
    if (!user) {
      router.push('/login');
      return;
    }
    router.push(`/student-dashboard/messages?propertyId=${property!.id}&landlordId=${property!.landlordId}&landlordName=${encodeURIComponent(property!.landlordName)}&propertyTitle=${encodeURIComponent(property!.title)}`);
  };

  if (!property) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark font-display flex flex-col items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-blue-600 mb-4 animate-spin">progress_activity</span>
        <h2 className="text-xl font-bold text-slate-700 dark:text-slate-300">Loading Property...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark font-display">
      {/* Top Nav */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center gap-4">
        <button onClick={() => router.back()} className="flex items-center gap-1 text-slate-500 hover:text-blue-600 transition-colors text-sm">
          <span className="material-symbols-outlined text-sm">arrow_back</span> Back
        </button>
        <span className="text-slate-300">|</span>
        <nav className="flex items-center gap-2 text-sm text-slate-500">
          <Link href="/">Home</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <Link href="/browse">Browse</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-white font-medium">{property.title}</span>
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button onClick={() => setIsSaved(!isSaved)} className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 rounded-xl text-sm font-bold hover:border-red-300 hover:text-red-500 transition-all">
            <span className="material-symbols-outlined text-sm" style={{ color: isSaved ? '#ef4444' : undefined, fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Image Gallery */}
            <div className="grid grid-cols-2 gap-3 rounded-2xl overflow-hidden">
              <div className="col-span-2 aspect-[16/7] relative bg-slate-200">
                <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {property.status === 'verified' && <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">✓ Verified</span>}
                  {property.isAvailable ? <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">Available</span> : <span className="bg-slate-600 text-white text-xs font-bold px-3 py-1 rounded-full">Occupied</span>}
                </div>
              </div>
            </div>

            {/* Title & Price */}
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-black text-slate-900 dark:text-white">{property.title}</h1>
                <div className="flex items-center gap-2 mt-1 text-slate-500">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  <span>{property.location}</span>
                  <span className="ml-2 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="font-bold text-slate-900 dark:text-white">{property.rating}</span>
                    <span className="text-sm">({property.reviewCount} reviews)</span>
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-slate-900 dark:text-white">{property.pricePerMonth.toLocaleString()} FCFA</p>
                <p className="text-sm text-slate-500">per month</p>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-3">About this property</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{property.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Amenities Included</h3>
              <div className="flex flex-wrap gap-3">
                {property.amenities.map(a => (
                  <div key={a} className="flex items-center gap-2 px-4 py-2 bg-primary/30 text-blue-700 rounded-xl text-sm font-medium">
                    <span className="material-symbols-outlined text-sm">check_circle</span> {a}
                  </div>
                ))}
              </div>
            </div>

            {/* Landlord */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6">
              <h3 className="font-bold text-slate-900 dark:text-white mb-4">Listed by</h3>
              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-primary">
                  {property.landlordAvatar && <Image src={property.landlordAvatar} alt={property.landlordName} fill className="object-cover" />}
                </div>
                <div>
                  <p className="font-bold text-slate-900 dark:text-white">{property.landlordName}</p>
                  <p className="text-sm text-slate-500">Verified Landlord · Member since 2026</p>
                </div>
                <button onClick={handleContactLandlord} className="ml-auto flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold hover:border-blue-400 hover:text-blue-600 transition-all">
                  <span className="material-symbols-outlined text-sm">chat</span> Message
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-80 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm sticky top-6">
              <p className="text-2xl font-black text-slate-900 dark:text-white mb-1">{property.pricePerMonth.toLocaleString()} FCFA<span className="text-base font-normal text-slate-500"> /month</span></p>
              <div className="space-y-3 my-5 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex justify-between"><span>Room type</span><span className="font-bold text-slate-900 dark:text-white capitalize">{property.roomType}</span></div>
                <div className="flex justify-between"><span>Bathroom</span><span className="font-bold text-slate-900 dark:text-white capitalize">{property.bathType}</span></div>
                <div className="flex justify-between"><span>Availability</span><span className={`font-bold ${property.isAvailable ? 'text-green-600' : 'text-red-500'}`}>{property.isAvailable ? 'Available' : 'Occupied'}</span></div>
              </div>
              {property.isAvailable ? (
                <button onClick={() => user ? setShowBookingModal(true) : router.push('/login')} className="w-full py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                  Request to Book
                </button>
              ) : (
                <button disabled className="w-full py-4 bg-slate-200 text-slate-500 font-bold rounded-xl cursor-not-allowed">
                  Currently Occupied
                </button>
              )}
              <button onClick={handleContactLandlord} className="mt-3 flex items-center justify-center gap-2 w-full py-3 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:border-blue-400 hover:text-blue-600 transition-all text-sm">
                <span className="material-symbols-outlined text-sm">chat</span> Contact Landlord
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-lg p-8 animate-[slide-up_0.2s_ease]">
            {bookingSubmitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
                </div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mb-2">Booking Request Sent!</h3>
                <p className="text-slate-500">The landlord will review your request and respond shortly.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white">Request to Book</h3>
                  <button onClick={() => setShowBookingModal(false)} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                <div className="flex items-center gap-3 p-4 bg-primary/20 rounded-xl mb-6">
                  <span className="material-symbols-outlined text-blue-600">apartment</span>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{property.title}</p>
                    <p className="text-xs text-slate-500">{property.location} · {property.pricePerMonth.toLocaleString()} FCFA/mo</p>
                  </div>
                </div>
                <form onSubmit={handleBooking} className="space-y-5">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Preferred Move-in Date *</label>
                    <input required type="date" value={moveInDate} onChange={e => setMoveInDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Duration</label>
                    <div className="flex gap-3">
                      {[{ value: 'academic-year', label: 'Academic Year (9 months)' }, { value: 'monthly', label: 'Month-to-Month' }].map(opt => (
                        <label key={opt.value} className={`flex-1 flex items-center justify-center p-3 rounded-xl border-2 cursor-pointer text-sm font-bold transition-all ${duration === opt.value ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-600 hover:border-blue-300'}`}>
                          <input type="radio" className="hidden" name="duration" value={opt.value} checked={duration === opt.value as typeof duration} onChange={() => setDuration(opt.value as typeof duration)} />
                          {opt.label}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Message to Landlord</label>
                    <textarea required rows={3} value={message} onChange={e => setMessage(e.target.value)}
                      placeholder="Introduce yourself and mention your course of study..."
                      className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 resize-none" />
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-slate-800">
                    <div>
                      <p className="text-xs text-slate-500">Estimated total</p>
                      <p className="font-black text-lg text-slate-900 dark:text-white">
                        {(property.pricePerMonth * (duration === 'academic-year' ? 9 : 1)).toLocaleString()} FCFA
                      </p>
                    </div>
                    <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                      Send Request
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
