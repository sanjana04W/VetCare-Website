import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/contexts/AuthContext";
import { NotificationProvider } from "@/lib/contexts/NotificationContext";

export const metadata: Metadata = {
  title: "PawPulse VetCare | Modern Veterinary Medicine & Companion Health",
  description: "Comprehensive veterinary care platform offering online appointments, patient health dossier tracking, vaccination alerts, and emergency triage support.",
  keywords: "veterinary care, pet clinic, vet appointment, animal hospital, dog health, cat vaccine",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased flex flex-col min-h-screen selection:bg-brand-500 selection:text-white">
        <AuthProvider>
          <NotificationProvider>
            {children}
          </NotificationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
