"use client";

import React, { useState, useEffect } from "react";
import { useAuth } from "@/lib/contexts/AuthContext";
import { getPetsByOwner, createPet, updatePet, deletePet } from "@/lib/firebase/firestore";
import { Pet } from "@/lib/types";
import { 
  PawPrint, 
  Plus, 
  Edit2, 
  Trash2, 
  X, 
  CheckCircle2, 
  Heart, 
  Activity, 
  Calendar,
  AlertCircle,
  ShieldCheck,
  Phone
} from "lucide-react";
import Link from "next/link";

export default function PetsPortalPage() {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPet, setEditingPet] = useState<Pet | null>(null);

  // Form State
  const [name, setName] = useState("");
  const [species, setSpecies] = useState<Pet["species"]>("Dog");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(2);
  const [gender, setGender] = useState<Pet["gender"]>("Neutered Male");
  const [weight, setWeight] = useState(15.0);
  const [allergies, setAllergies] = useState("");
  const [microchipNumber, setMicrochipNumber] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  const loadPets = async () => {
    if (!user) return;
    setIsLoading(true);
    try {
      const userPets = await getPetsByOwner(user.uid);
      setPets(userPets);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPets();
  }, [user]);

  const openAddModal = () => {
    setEditingPet(null);
    setName("");
    setSpecies("Dog");
    setBreed("");
    setAge(2);
    setGender("Neutered Male");
    setWeight(15.0);
    setAllergies("");
    setMicrochipNumber("");
    setPhotoURL("");
    setContactName("");
    setContactPhone("");
    setIsModalOpen(true);
  };

  const openEditModal = (pet: Pet) => {
    setEditingPet(pet);
    setName(pet.name);
    setSpecies(pet.species);
    setBreed(pet.breed);
    setAge(pet.age);
    setGender(pet.gender);
    setWeight(pet.weight);
    setAllergies(pet.allergies ? pet.allergies.join(", ") : "");
    setMicrochipNumber(pet.microchipNumber || "");
    setPhotoURL(pet.photoURL || "");
    setContactName(pet.emergencyContact?.name || "");
    setContactPhone(pet.emergencyContact?.phone || "");
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const allergiesArr = allergies
      ? allergies.split(",").map(a => a.trim()).filter(Boolean)
      : [];

    const emergencyContact = contactName && contactPhone ? {
      name: contactName,
      relationship: "Alternate Caretaker",
      phone: contactPhone,
    } : undefined;

    if (editingPet) {
      await updatePet(editingPet.id, {
        name,
        species,
        breed,
        age: Number(age),
        gender,
        weight: Number(weight),
        allergies: allergiesArr,
        microchipNumber,
        photoURL: photoURL || undefined,
        emergencyContact,
      });
    } else {
      await createPet({
        ownerId: user.uid,
        ownerName: user.displayName,
        name,
        species,
        breed,
        age: Number(age),
        gender,
        weight: Number(weight),
        allergies: allergiesArr,
        microchipNumber,
        photoURL: photoURL || "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=400",
        emergencyContact,
      });
    }

    setIsModalOpen(false);
    loadPets();
  };

  const handleDelete = async (id: string, petName: string) => {
    if (confirm(`Are you sure you want to remove ${petName}'s profile?`)) {
      await deletePet(id);
      loadPets();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Registered Companions</h2>
          <p className="text-xs text-slate-500">Manage individual pet health cards, microchips, and weight records.</p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Pet</span>
        </button>
      </div>

      {/* Pet Cards Grid */}
      {isLoading ? (
        <div className="py-12 text-center text-slate-400 text-xs">Loading pets...</div>
      ) : pets.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
          <PawPrint className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No Pets Registered Yet</h3>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Add your furry, feathered, or scaled family members to unlock appointment scheduling and health records.
          </p>
          <button
            onClick={openAddModal}
            className="mt-4 px-5 py-2.5 bg-brand-600 text-white rounded-xl text-xs font-semibold hover:bg-brand-700 transition"
          >
            Add First Companion
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pets.map((pet) => (
            <div
              key={pet.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-48 w-full bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={pet.photoURL || "https://images.unsplash.com/photo-1543466835-00a7907e9de1"}
                    alt={pet.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(pet)}
                      className="p-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-brand-700 shadow-sm transition"
                      title="Edit Pet"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(pet.id, pet.name)}
                      className="p-1.5 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-rose-700 shadow-sm transition"
                      title="Delete Pet"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-white">
                    {pet.species} • {pet.breed}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-slate-900">{pet.name}</h3>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {pet.gender}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-1">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Age</span>
                      <span className="font-semibold text-slate-800">{pet.age} {pet.age === 1 ? 'year' : 'years'} old</span>
                    </div>
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Weight</span>
                      <span className="font-semibold text-slate-800">{pet.weight} kg</span>
                    </div>
                  </div>

                  {pet.microchipNumber && (
                    <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-brand-600 shrink-0" />
                      <span className="truncate">Chip: {pet.microchipNumber}</span>
                    </div>
                  )}

                  {pet.allergies && pet.allergies.length > 0 && (
                    <div className="pt-2">
                      <span className="text-[10px] font-bold uppercase text-amber-700 block mb-1">
                        Allergies & Sensitivities:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {pet.allergies.map((a, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-800 text-[10px] font-medium border border-amber-200"
                          >
                            {a}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {pet.emergencyContact && (
                    <div className="pt-2 text-xs text-slate-600 border-t border-slate-100 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                      <span className="truncate">Emerg: {pet.emergencyContact.name} ({pet.emergencyContact.phone})</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-6 pt-0 mt-2 flex items-center gap-2">
                <Link
                  href="/portal/records"
                  className="flex-1 py-2 text-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
                >
                  Health Card & Vaccines
                </Link>
                <Link
                  href="/find-a-vet"
                  className="px-3 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold transition"
                  title="Book Doctor"
                >
                  <Calendar className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 max-h-[90vh] flex flex-col">
            <div className="bg-brand-700 text-white p-6 flex items-center justify-between">
              <h3 className="font-bold text-lg">
                {editingPet ? `Edit ${editingPet.name}'s Profile` : "Register New Companion"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded-full text-white/80 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Pet Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Milo"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Species</label>
                  <select
                    value={species}
                    onChange={(e) => setSpecies(e.target.value as Pet["species"])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  >
                    <option value="Dog">Dog</option>
                    <option value="Cat">Cat</option>
                    <option value="Rabbit">Rabbit</option>
                    <option value="Bird">Bird</option>
                    <option value="Reptile">Reptile</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Breed</label>
                  <input
                    type="text"
                    required
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                    placeholder="e.g. Beagle"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Gender</label>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value as Pet["gender"])}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  >
                    <option value="Neutered Male">Neutered Male</option>
                    <option value="Spayed Female">Spayed Female</option>
                    <option value="Male">Intact Male</option>
                    <option value="Female">Intact Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Age (Years)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={age}
                    onChange={(e) => setAge(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    required
                    value={weight}
                    onChange={(e) => setWeight(parseFloat(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Microchip Number</label>
                <input
                  type="text"
                  value={microchipNumber}
                  onChange={(e) => setMicrochipNumber(e.target.value)}
                  placeholder="e.g. 985-141-002-394-110"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Allergies (comma separated)</label>
                <input
                  type="text"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="e.g. Beef protein, Flea bite hypersensitivity"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1">Photo Image URL</label>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                />
              </div>

              {/* Emergency contact */}
              <div className="pt-2 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-900 mb-2">Emergency Alternate Contact</p>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Contact Name"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  />
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="Contact Phone"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-brand-500 bg-slate-50"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-xl text-xs font-semibold transition"
                >
                  {editingPet ? "Save Changes" : "Register Pet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
