'use client';
import Image from "next/image";
import { useState } from "react";
import { CURRENT_STUDENT } from "@/data/mock";
import { useAuth } from "@/context/AuthContext";

export default function StudentProfilePage() {
  const { user, updateUser } = useAuth();
  const student = { ...CURRENT_STUDENT, ...(user || {}) };
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user?.avatarUrl || null);
  const [uploading, setUploading] = useState(false);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const img = new window.Image();
      img.onload = () => {
        // Compress to max 200x200
        const MAX = 200;
        const canvas = document.createElement('canvas');
        const scale = Math.min(MAX / img.width, MAX / img.height, 1);
        canvas.width = img.width * scale;
        canvas.height = img.height * scale;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL('image/jpeg', 0.7);
        setAvatarPreview(compressed);
        try {
          updateUser({ avatarUrl: compressed });
        } catch {
          // If still too large, skip persisting but keep preview
          console.warn('Avatar too large to persist in localStorage');
        }
        setUploading(false);
      };
      img.src = ev.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Profile</h2>
        <p className="text-slate-500">Manage your personal information and preferences.</p>
      </div>

      {/* Profile Card */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="h-28 bg-gradient-to-r from-primary via-blue-100 to-primary/40"></div>
        <div className="px-8 pb-8">
          <div className="flex items-end gap-6 -mt-12 mb-6">
            <label className="size-24 rounded-2xl border-4 border-white dark:border-slate-900 shadow-lg overflow-hidden relative bg-slate-100 dark:bg-slate-800 shrink-0 cursor-pointer group flex items-center justify-center">
              {avatarPreview ? (
                <Image src={avatarPreview} alt={student.name} fill className="object-cover" />
              ) : (
                <span className="material-symbols-outlined text-4xl text-slate-400">person</span>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
                {uploading ? (
                  <span className="material-symbols-outlined text-white animate-spin">progress_activity</span>
                ) : (
                  <span className="material-symbols-outlined text-white">photo_camera</span>
                )}
              </div>
              <input type="file" className="hidden" accept="image/*" onChange={handleAvatarChange} />
            </label>
            <div className="pb-2">
              <div className="flex items-center gap-2">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{student.name}</h3>
                {student.isVerified && (
                  <span className="material-symbols-outlined text-blue-600 text-base">verified</span>
                )}
              </div>
              <p className="text-slate-500 text-sm">{student.university} · Student</p>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
                <input defaultValue={student.name} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
                <input defaultValue={student.email} type="email" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Phone Number</label>
                <input defaultValue={student.phone} type="tel" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">University</label>
                <input defaultValue={student.university} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Bio</label>
              <textarea defaultValue={student.bio} rows={3} className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all resize-none" />
            </div>
            <div className="flex justify-end gap-3">
              <button type="button" className="px-6 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors">Cancel</button>
              <button type="submit" onClick={(e) => { e.preventDefault(); }} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
        <h3 className="text-lg font-bold mb-1">Password &amp; Security</h3>
        <p className="text-sm text-slate-500 mb-6">Manage your password and account security settings.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Current Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">New Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all" />
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">Update Password</button>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-red-100 dark:border-red-900/30 p-8 shadow-sm">
        <h3 className="text-lg font-bold text-red-600 mb-1">Danger Zone</h3>
        <p className="text-sm text-slate-500 mb-4">Permanent actions — these cannot be undone.</p>
        <div className="flex items-center justify-between py-4 border-t border-slate-100 dark:border-slate-800">
          <div>
            <p className="font-semibold text-sm">Delete Account</p>
            <p className="text-xs text-slate-500">Permanently removes your profile and all saved data.</p>
          </div>
          <button className="px-4 py-2 border border-red-300 text-red-600 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors">Delete Account</button>
        </div>
      </div>
    </div>
  );
}
