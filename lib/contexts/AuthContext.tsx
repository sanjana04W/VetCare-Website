"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile, UserRole } from "@/lib/types";
import { SEED_USERS } from "@/lib/firebase/seed";

interface RegisteredAccount {
  user: UserProfile;
  password?: string;
}

interface AuthContextType {
  // Website Client User (Pet Owners) - 100% disconnected from Admin
  user: UserProfile | null;
  role: UserRole;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  switchRole: (newRole: UserRole) => void;
  register: (
    name: string, 
    email: string, 
    role: UserRole, 
    phone?: string, 
    password?: string
  ) => Promise<boolean>;

  // Dedicated Admin Authentication - 100% disconnected from Website
  adminUser: UserProfile | null;
  isAdminLoading: boolean;
  adminLogin: (email: string, password: string) => Promise<boolean>;
  adminLogout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const CURRENT_USER_KEY = "pawpulse_current_user";
const ADMIN_USER_KEY = "pawpulse_admin_user";
const REGISTERED_ACCOUNTS_KEY = "pawpulse_registered_accounts";

function getRegisteredAccounts(): RegisteredAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(REGISTERED_ACCOUNTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Website client session
  const [user, setUser] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole>("petOwner");
  const [isLoading, setIsLoading] = useState(true);

  // Dedicated admin session
  const [adminUser, setAdminUser] = useState<UserProfile | null>(null);
  const [isAdminLoading, setIsAdminLoading] = useState(true);

  // Load website client session on mount
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem(CURRENT_USER_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser) as UserProfile;
        // Never allow admin role in website user session
        if (parsed.role !== "admin") {
          setUser(parsed);
          setRole(parsed.role);
        } else {
          localStorage.removeItem(CURRENT_USER_KEY);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Load admin session on mount
  useEffect(() => {
    try {
      const savedAdmin = localStorage.getItem(ADMIN_USER_KEY);
      if (savedAdmin) {
        const parsed = JSON.parse(savedAdmin) as UserProfile;
        if (parsed.email.toLowerCase() === "admin@pawpulse.com" && parsed.role === "admin") {
          setAdminUser(parsed);
        } else {
          localStorage.removeItem(ADMIN_USER_KEY);
          setAdminUser(null);
        }
      } else {
        setAdminUser(null);
      }
    } catch {
      setAdminUser(null);
    } finally {
      setIsAdminLoading(false);
    }
  }, []);

  // 1. Website Client Sign In (for pet owners - CANNOT log into admin)
  const login = async (email: string, password?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      const enteredPassword = password || "";

      // Reject admin from public website login
      if (cleanEmail === "admin@pawpulse.com") {
        return false;
      }

      // Check registered accounts created via /register
      const registeredAccounts = getRegisteredAccounts();
      const registeredMatch = registeredAccounts.find(
        acc => acc.user.email.toLowerCase() === cleanEmail
      );

      if (registeredMatch) {
        if (registeredMatch.password && enteredPassword !== registeredMatch.password) {
          return false;
        }
        const safeRole: UserRole = registeredMatch.user.role === "admin" ? "petOwner" : registeredMatch.user.role;
        const activeUser: UserProfile = {
          ...registeredMatch.user,
          role: safeRole,
        };
        setUser(activeUser);
        setRole(safeRole);
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(activeUser));
        return true;
      }

      // Check seed pet owner (Michael Scott)
      if (cleanEmail === "michael.scott@example.com" && enteredPassword === "password123") {
        const seedOwner = SEED_USERS.find(u => u.uid === "owner_01") || {
          uid: "owner_01",
          email: "michael.scott@example.com",
          displayName: "Michael Scott",
          role: "petOwner",
          status: "active",
          createdAt: "2026-01-20T10:00:00.000Z"
        };
        setUser(seedOwner);
        setRole("petOwner");
        localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(seedOwner));
        return true;
      }

      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const switchRole = (newRole: UserRole) => {
    // Only allows switching between client roles, never admin
    const safeRole: UserRole = newRole === "admin" ? "petOwner" : newRole;
    let target = SEED_USERS.find(u => u.role === safeRole);
    if (!target) {
      target = {
        ...SEED_USERS[0],
        role: safeRole,
        displayName: `User ${safeRole}`
      };
    }
    setUser(target);
    setRole(safeRole);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(target));
  };

  const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  // 2. User Registration (strictly creates pet owner client accounts)
  const register = async (
    name: string, 
    email: string, 
    newRole: UserRole, 
    phone?: string, 
    password?: string
  ): Promise<boolean> => {
    setIsLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      // Block admin email from public register
      if (cleanEmail === "admin@pawpulse.com") {
        return false;
      }

      const assignedRole: UserRole = "petOwner";
      const newUser: UserProfile = {
        uid: `usr_${Date.now()}`,
        email: cleanEmail,
        displayName: name.trim(),
        role: assignedRole,
        phoneNumber: phone,
        status: "active",
        createdAt: new Date().toISOString()
      };

      const accounts = getRegisteredAccounts();
      const existingIdx = accounts.findIndex(
        acc => acc.user.email.toLowerCase() === cleanEmail
      );
      const newAccount: RegisteredAccount = {
        user: newUser,
        password: password || "password123"
      };

      if (existingIdx >= 0) {
        accounts[existingIdx] = newAccount;
      } else {
        accounts.push(newAccount);
      }

      localStorage.setItem(REGISTERED_ACCOUNTS_KEY, JSON.stringify(accounts));

      // Sign in client
      setUser(newUser);
      setRole(assignedRole);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Dedicated Admin Login (strictly for admin@pawpulse.com / password123)
  const adminLogin = async (email: string, password: string): Promise<boolean> => {
    setIsAdminLoading(true);
    try {
      const cleanEmail = email.trim().toLowerCase();
      if (cleanEmail === "admin@pawpulse.com" && password === "password123") {
        const admin: UserProfile = SEED_USERS.find(u => u.uid === "admin_01") || {
          uid: "admin_01",
          email: "admin@pawpulse.com",
          displayName: "Eleanor Vance (Hospital Director)",
          role: "admin",
          status: "active",
          createdAt: "2026-01-10T08:00:00.000Z"
        };
        setAdminUser(admin);
        localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(admin));
        return true;
      }
      return false;
    } finally {
      setIsAdminLoading(false);
    }
  };

  const adminLogout = () => {
    localStorage.removeItem(ADMIN_USER_KEY);
    setAdminUser(null);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      role, 
      isLoading, 
      login, 
      logout, 
      switchRole, 
      register,
      adminUser,
      isAdminLoading,
      adminLogin,
      adminLogout
    }}>
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
