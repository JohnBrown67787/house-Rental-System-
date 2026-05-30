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
const MAX_IMAGES = 10;
const MAX_DIMENSION = 1200;

function compressImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        const scale = Math.min(MAX_DIMENSION / img.width, MAX_DIMENSION / img.height, 1);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function EditPropertyPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);

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

  const processFiles = async (files: FileList | File[]) => {
    const arr = Array.from(files).filter(f => f.type.startsWith('image/'));
    const slots = MAX_IMAGES - images.length;
    if (slots <= 0) return;
    const compressed = await Promise.all(arr.slice(0, slots).map(compressImage));
    setImages(prev => [...prev, ...compressed]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) processFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files) processFiles(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = () => setIsDragging(false);

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setError('');
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
    } catch (err) {
      console.error('Error updating property:', err);
      setError('Failed to save changes. Please try again.');
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
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">photo_camera</span> Property Photos
            </h3>
            <span className={`text-xs font-bold px-2 py-1 rounded-full ${images.length >= MAX_IMAGES ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
              {images.length}/{MAX_IMAGES} photos
            </span>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 group">
                  <Image src={img} alt={`Preview ${i+1}`} fill className="object-cover" />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <button type="button" onClick={() => removeImage(i)} className="absolute top-2 right-2 p-1.5 bg-black/50 hover:bg-red-500 text-white rounded-lg transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100">
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                  {i === 0 && (
                    <span className="absolute bottom-2 left-2 text-[10px] font-bold bg-blue-600 text-white px-2 py-0.5 rounded-full">Cover</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {images.length < MAX_IMAGES && (
            <label
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`block border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-200 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}
            >
              <span className={`material-symbols-outlined text-5xl mb-3 block transition-colors ${isDragging ? 'text-blue-400' : 'text-slate-300'}`}>cloud_upload</span>
              <span className="font-semibold text-slate-700 dark:text-slate-300 block">{isDragging ? 'Drop images here' : 'Click to upload or drag & drop'}</span>
              <span className="text-sm text-slate-500 mt-1 block">PNG, JPG — up to {MAX_IMAGES - images.length} more photo{MAX_IMAGES - images.length !== 1 ? 's' : ''}</span>
              <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
            </label>
          )}
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-4 py-3 rounded-xl">{error}</p>
        )}

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
