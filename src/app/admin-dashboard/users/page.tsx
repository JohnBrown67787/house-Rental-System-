import Image from "next/image";
import { MOCK_STUDENTS, MOCK_LANDLORDS } from "@/data/mock";

const ALL_USERS = [
  ...MOCK_STUDENTS.map(u => ({ ...u, badge: 'Student' as const })),
  ...MOCK_LANDLORDS.map(u => ({ ...u, badge: 'Landlord' as const })),
];

export default function AdminUsersPage() {
  return (
    <div className="flex-1 overflow-y-auto p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">User Management</h2>
          <p className="text-slate-500">{ALL_USERS.length} registered users on the platform.</p>
        </div>
        <div className="flex gap-3">
          <select className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-600/20">
            <option>All Roles</option>
            <option>Students</option>
            <option>Landlords</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 dark:border-slate-800">
            <tr className="text-left text-[11px] uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4 font-bold">User</th>
              <th className="px-6 py-4 font-bold">Role</th>
              <th className="px-6 py-4 font-bold">Status</th>
              <th className="px-6 py-4 font-bold">Joined</th>
              <th className="px-6 py-4 font-bold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {ALL_USERS.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary overflow-hidden relative shrink-0">
                      {user.avatarUrl && <Image src={user.avatarUrl} alt={user.name} fill className="object-cover" />}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${user.badge === 'Student' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                    {user.badge}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {user.isVerified ? (
                    <span className="flex items-center gap-1 text-green-600 text-xs font-bold">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span> Verified
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-amber-600 text-xs font-bold">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span> Pending
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-slate-500 text-xs">{new Date(user.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-1">
                    {!user.isVerified && (
                      <button className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-lg hover:bg-green-200 transition-colors">Verify</button>
                    )}
                    <button className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-lg hover:bg-slate-200 transition-colors">View</button>
                    <button className="px-3 py-1 bg-red-100 text-red-600 text-xs font-bold rounded-lg hover:bg-red-200 transition-colors">Suspend</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
