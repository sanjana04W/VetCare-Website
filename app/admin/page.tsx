"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/contexts/AuthContext";

export default function AdminRootRedirect() {
  const router = useRouter();
  const { adminUser, isAdminLoading } = useAuth();

  useEffect(() => {
    if (!isAdminLoading) {
      if (adminUser) {
        router.replace("/admin-dashboard");
      } else {
        router.replace("/admin/login");
      }
    }
  }, [adminUser, isAdminLoading, router]);

  return (
    <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
