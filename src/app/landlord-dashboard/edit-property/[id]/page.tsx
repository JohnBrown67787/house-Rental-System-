'use client';
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { propertyApi } from "@/services/api";
import type { Property, RoomType } from "@/types";

const AMENITY_OPTIONS = ['WiFi', 'Water', 'Electricity', 'Security', 'Parking', 'Furnished', 'Cooking', 'CCTV'];
const NEIGHBORHOODS = ['Molyko', 'Bonduma', 'Mile 17', 'Great Soppo', 'Dirty South', 'Buea Town', 'Clerks Quarter'];

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [roomType, setRoomType] = useState<RoomType>('single');
  const [bathType, setBathType] = useState<'private' | 'shared'>('private');
  const [bedsCount, setBedsCount] = useState(1);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    propertyApi.getById(params.id)
      .then(property => {
        if (property) {
          setTitle(property.title);
          setDescription(property.description);
          setNeighborhood(property.neighborhood || '');
          setLocation(property.location);
          setPrice(property.pricePerMonth.toString());
          setRoomType(property.roomType);
          setBathType(property.bathType);
          setBedsCount(property.bedsCount || 1);
          setSelectedAmenities(property.amenities);
          setImages(property.images);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

  const toggleAmenity = (a: string) =>
    setSelectedAmenities((prev) => prev.includes(a) ? prev.filter((x) => x !== a) : [...prev, a]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          setImages(prev => [...prev, ev.target!.result as string]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setSubmitting(true);
    
    try {
      const updatedProperty: Partial<Property> = {
        title,
        description,
        location,
        neighborhood,
        pricePerMonth: Number(price),
        roomType,
        bedsCount,
        bathType,
        amenities: selectedAmenities,
        images: images.length > 0 ? images : ['https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800'],
      };

      await propertyApi.update(params.id, updatedProperty);

      router.push('/landlord-dashboard/listings');
    } catch (error) {
      console.error('Error updating property:', error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        <span className="material-symbols-outlined text-4xl text-blue-600 animate-spin">progress_activity</span>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-3xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Edit Property</h2>
        <p className="text-slate-500">Update the details of your property listing.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <h3 className="text-base font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600">info</span> Basic Information
          </h3>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Property Title <span className="text-red-500">*</span></label>
            <input required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Sunshine Studio near UB Gate" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Description <span className="text-red-500">*</span></label>
            <textarea required value={description} onChange={e => setDescription(e.target.value)} rows={4} placeholder="Describe the property, its surroundings, and what makes it ideal for students..." className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Neighborhood <span className="text-red-500">*</span></label>
              <select required value={neighborhood} onChange={e => setNeighborhood(e.target.value)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all appearance-none">
                <option value="">Select neighborhood</option>
                {NEIGHBORHOODS.map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Address <span className="text-red-500">*</span></label>
              <input required value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Behind CNPS, Molyko, Buea" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all" />
            </div>
          </div>
        </div>

        {/* Pricing & Type */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm space-y-5">
          <h3 className="text-base font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600">payments</span> Pricing &amp; Room Type
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Monthly Rent (FCFA) <span className="text-red-500">*</span></label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-bold">FCFA</span>
                <input required value={price} onChange={e => setPrice(e.target.value)} type="number" min="10000" placeholder="45000" className="w-full pl-16 pr-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Room Type <span className="text-red-500">*</span></label>
              <select required value={roomType} onChange={e => setRoomType(e.target.value as RoomType)} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all appearance-none">
                <option value="single">Single Room</option>
                <option value="studio">Studio</option>
                <option value="two-bedroom">2 Bedroom</option>
                <option value="shared">Shared Room</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Bathroom</label>
              <select value={bathType} onChange={e => setBathType(e.target.value as 'private'|'shared')} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all appearance-none">
                <option value="private">Private Bathroom</option>
                <option value="shared">Shared Bathroom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Number of Rooms</label>
              <input type="number" min="1" value={bedsCount} onChange={e => setBedsCount(Number(e.target.value))} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all" />
            </div>
          </div>
        </div>

        {/* Amenities */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600">star</span> Amenities
          </h3>
          <div className="flex flex-wrap gap-3">
            {AMENITY_OPTIONS.map((amenity) => (
              <button
                key={amenity}
                type="button"
                onClick={() => toggleAmenity(amenity)}
                className={`px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                  selectedAmenities.includes(amenity)
                    ? 'bg-primary border-blue-400 text-blue-700'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 hover:border-blue-300'
                }`}
              >
                {amenity}
              </button>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm space-y-4">
          <h3 className="text-base font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-blue-600">photo_camera</span> Property Photos
          </h3>
          
          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <Image src={img} alt={`Preview ${i+1}`} fill className="object-cover" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-lg transition-colors backdrop-blur-sm">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          <label className="block border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-10 text-center hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
            <span className="material-symbols-outlined text-5xl text-slate-300 mb-3 block">cloud_upload</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 block">Click to upload or drag &amp; drop</span>
            <span className="text-sm text-slate-500 mt-1 block">PNG, JPG up to 10MB each (max 10 photos)</span>
            <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
          </label>
        </div>

        {/* Submit */}
        <div className="flex items-center justify-between">
          <button type="button" onClick={() => router.back()} className="px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <Button
            type="submit"
            disabled={submitting}
            className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {submitting ? (
              <span className="flex items-center gap-2"><span className="material-symbols-outlined animate-spin text-sm">progress_activity</span> Saving...</span>
            ) : (
              <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">save</span> Save Changes</span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
