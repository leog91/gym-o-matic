"use client";

import { useState, useEffect, useRef } from "react";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Header() {
  const { data: session } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  const handleSignOut = async () => {
    await signOut();
    router.push("/sign-in");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const user = session?.user;

  return (
    <header className="bg-black border-b border-zinc-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <h1 className="text-xl font-bold text-yellow-400">Gym-o-matic</h1>
            </Link>
          </div>

          <div className="relative" ref={dropdownRef}>
            {user ? (
              <>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-3 hover:bg-zinc-900 rounded-lg px-3 py-2 transition"
                >
                  <div className="w-8 h-8 rounded-full bg-linear-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-black font-bold text-sm">
                    {user.image ? (
                      <img
                        src={user.image}
                        alt={user.name}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      getInitials(user.name)
                    )}
                  </div>

                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-white">{user.name}</p>
                    <p className="text-xs text-zinc-400">{user.email}</p>
                  </div>

                  <svg
                    className={`w-4 h-4 text-zinc-400 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-zinc-900 rounded-lg shadow-xl border border-zinc-800 py-1">
                    <div className="md:hidden px-4 py-3 border-b border-zinc-800">
                      <p className="text-sm font-medium text-white">{user.name}</p>
                      <p className="text-xs text-zinc-400">{user.email}</p>
                    </div>

                    <button
                      onClick={() => {
                        router.push("/dashboard");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800/50 hover:text-white flex items-center space-x-2 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span>Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        router.push("/add-routine");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800/50 hover:text-white flex items-center space-x-2 transition-colors"
                    >
                      <span className="text-lg">📝</span>
                      <span>Create Routine</span>
                    </button>

                    <button
                      onClick={() => {
                        router.push("/add-exercise");
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-zinc-300 hover:bg-zinc-800/50 hover:text-white flex items-center space-x-2 transition-colors"
                    >
                      <span className="text-lg">💪</span>
                      <span>Add Exercise</span>
                    </button>

                    <hr className="my-1 border-zinc-800" />

                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-900/20 flex items-center space-x-2 transition-colors"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link
                href="/sign-in"
                className="text-sm font-medium text-zinc-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-zinc-800"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
