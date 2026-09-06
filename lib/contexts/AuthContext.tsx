"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole } from "@/lib/types";
import { SEED_USERS } from "@/lib/firebase/seed";
import { getUserProfile, updateUserStatus } from "@/lib/firebase/firestore";

interface AuthContextType {
  user: UserProfile | null;
  role: UserRole;
  isLoading: boolean;
  login: (email: string, role?: UserRole) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  register: (name: string, email: string, role: UserRole, phone?: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = "pawpulse_current_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Default to petOwner (Michael Scott) so the app has an active demo user on first load
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole>("petOwner");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser) as UserProfile;
        setUser(parsed);
        setRole(parsed.role);
      } else {
        // Default to Michael Scott (pet owner)
        const defaultUser = SEED_USERS.find(u => u.uid === "owner_01") || SEED_USERS[0];
        setUser(defaultUser);
        setRole(defaultUser.role);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(defaultUser));
      }
    } catch {
      const defaultUser = SEED_USERS[4];
      setUser(defaultUser);
      setRole("petOwner");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, requestedRole?: UserRole): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Find matching user in seed list or create a session
      let matched = SEED_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!matched && requestedRole) {
        matched = SEED_USERS.find(u => u.role === requestedRole);
      }
      if (!matched) {
        matched = {
          uid: `usr_${Date.now()}`,
          email,
          displayName: email.split("@")[0],
          role: requestedRole || "petOwner",
          status: "active",
          createdAt: new Date().toISOString()
        };
      }
      setUser(matched);
      setRole(matched.role);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(matched));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const switchRole = (newRole: UserRole) => {
    let target = SEED_USERS.find(u => u.role === newRole);
    if (!target) {
      target = {
        ...SEED_USERS[0],
        role: newRole,
        displayName: `Demo ${newRole.toUpperCase()}`
      };
    }
    setUser(target);
    setRole(newRole);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(target));
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    // Switch to unauthenticated or guest
    setUser(null);
  };

  const register = async (name: string, email: string, newRole: UserRole, phone?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const newUser: UserProfile = {
        uid: `usr_${Date.now()}`,
        email,
        displayName: name,
        role: newRole,
        phoneNumber: phone,
        status: newRole === 'veterinarian' ? 'pending' : 'active',
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      setRole(newRole);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, role, isLoading, login, logout, switchRole, register }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
