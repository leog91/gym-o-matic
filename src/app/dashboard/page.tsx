"use client";

import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";

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

  const user = session.user;

  return (
    <div className="min-h-screen">
      
      <div className="p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800 p-8 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Welcome, {user.name}! 👋
              </h1>
              <p className="text-zinc-400 mb-4">Here's your account information</p>
              <Link 
                href={`/${user.email.split('@')[0]}`}
                className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded transition-colors"
              >
                View Your Public Profile
              </Link>
            </div>
          </div>

          <div className="bg-zinc-900 rounded-2xl shadow-lg border border-zinc-800 p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Account Details</h2>
            
            <div className="space-y-4">
              <div className="border-b border-zinc-800 pb-4">
                <label className="block text-sm font-medium text-zinc-500 mb-1">Name</label>
                <p className="text-lg text-white">{user.name}</p>
              </div>

              <div className="border-b border-zinc-800 pb-4">
                <label className="block text-sm font-medium text-zinc-500 mb-1">Email</label>
                <p className="text-lg text-white">{user.email}</p>
              </div>

              <div className="border-b border-zinc-800 pb-4">
                <label className="block text-sm font-medium text-zinc-500 mb-1">Email Verified</label>
                <p className="text-lg">
                  {user.emailVerified ? (
                    <span className="text-green-500 font-medium">✓ Verified</span>
                  ) : (
                    <span className="text-yellow-500 font-medium">⚠ Not verified</span>
                  )}
                </p>
              </div>

              <div className="border-b border-zinc-800 pb-4">
                <label className="block text-sm font-medium text-zinc-500 mb-1">Account Created</label>
                <p className="text-lg text-white">
                  {new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-500 mb-1">User ID</label>
                <p className="text-sm text-zinc-400 font-mono bg-zinc-950 p-2 rounded border border-zinc-800">
                  {user.id}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
