"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";

export default function DashboardPage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/sign-in");
    }
  }, [session, isPending, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome, {session.user.name}! 👋
              </h1>
              <p className="text-gray-600">Here's your account information</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Account Details</h2>
            
            <div className="space-y-4">
              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">Name</label>
                <p className="text-lg text-gray-900">{session.user.name}</p>
              </div>

              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">Email</label>
                <p className="text-lg text-gray-900">{session.user.email}</p>
              </div>

              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">Email Verified</label>
                <p className="text-lg">
                  {session.user.emailVerified ? (
                    <span className="text-green-600 font-medium">✓ Verified</span>
                  ) : (
                    <span className="text-orange-600 font-medium">⚠ Not verified</span>
                  )}
                </p>
              </div>

              <div className="border-b pb-4">
                <label className="block text-sm font-medium text-gray-500 mb-1">Account Created</label>
                <p className="text-lg text-gray-900">
                  {new Date(session.user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">User ID</label>
                <p className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">
                  {session.user.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
