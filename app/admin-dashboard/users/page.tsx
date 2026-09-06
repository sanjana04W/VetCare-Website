"use client";

import React, { useState, useEffect } from "react";
import { getAllUsers, updateUserStatus, getAllPets } from "@/lib/firebase/firestore";
import { UserProfile, Pet } from "@/lib/types";
import { 
  Users, 
  Search, 
  ShieldCheck, 
  ShieldAlert, 
  Mail, 
  Phone, 
  PawPrint,
  CheckCircle2,
  XCircle
} from "lucide-react";
import { formatDate } from "@/lib/utils";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [allUsers, allPets] = await Promise.all([
        getAllUsers(),
        getAllPets()
      ]);
      // Filter pet owners
      setUsers(allUsers.filter(u => u.role === "petOwner"));
      setPets(allPets);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleToggleStatus = async (user: UserProfile) => {
    const newStatus = user.status === "active" ? "deactivated" : "active";
    if (confirm(`Change ${user.displayName}'s account status to ${newStatus.toUpperCase()}?`)) {
      await updateUserStatus(user.uid, newStatus);
      loadData();
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.displayName.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      (u.phoneNumber && u.phoneNumber.includes(q))
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Registered Pet Parents (Clients)</h2>
          <p className="text-xs text-slate-500">Oversee client profiles, linked pets, and account security access.</p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, email, or phone..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 bg-white outline-none focus:ring-2 focus:ring-purple-500 shadow-xs"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        {isLoading ? (
          <div className="py-12 text-center text-slate-400 text-xs">Loading client directory...</div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">No pet owners found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="px-6 py-4">Client Name</th>
                  <th className="px-6 py-4">Contact Information</th>
                  <th className="px-6 py-4">Registered Pets</th>
                  <th className="px-6 py-4">Member Since</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredUsers.map((u) => {
                  const userPets = pets.filter(p => p.ownerId === u.uid);
                  const isActive = u.status === "active";

                  return (
                    <tr key={u.uid} className="hover:bg-slate-50/80 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-800 font-bold flex items-center justify-center overflow-hidden border border-brand-200">
                            {u.photoURL ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={u.photoURL} alt={u.displayName} className="w-full h-full object-cover" />
                            ) : (
                              u.displayName.charAt(0)
                            )}
                          </div>
                          <div>
                            <p className="font-bold text-slate-900 text-sm">{u.displayName}</p>
                            <span className="text-[10px] text-slate-400 font-mono">UID: {u.uid}</span>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4 space-y-0.5">
                        <p className="flex items-center gap-1.5 text-slate-700">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span>{u.email}</span>
                        </p>
                        {u.phoneNumber && (
                          <p className="flex items-center gap-1.5 text-slate-500 text-[11px]">
                            <Phone className="w-3.5 h-3.5 text-slate-400" />
                            <span>{u.phoneNumber}</span>
                          </p>
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5">
                          <PawPrint className="w-3.5 h-3.5 text-brand-600" />
                          <span className="font-bold text-slate-800">
                            {userPets.length} {userPets.length === 1 ? 'Pet' : 'Pets'}
                          </span>
                        </div>
                        {userPets.length > 0 && (
                          <span className="text-[10px] text-slate-400 block truncate max-w-xs">
                            ({userPets.map(p => p.name).join(", ")})
                          </span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-slate-500">
                        {formatDate(u.createdAt)}
                      </td>

                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase border ${
                          isActive 
                            ? "bg-emerald-100 text-emerald-800 border-emerald-200" 
                            : "bg-rose-100 text-rose-800 border-rose-200"
                        }`}>
                          {u.status}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleToggleStatus(u)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                            isActive
                              ? "text-rose-600 border-rose-200 hover:bg-rose-50"
                              : "text-emerald-600 border-emerald-200 hover:bg-emerald-50"
                          }`}
                        >
                          {isActive ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
