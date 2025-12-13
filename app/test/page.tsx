"use client";

import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { signOutAction, signUpAction, signInAction } from "./actions";

export default function TestPage() {
  const { data: session, isPending } = useSession();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = isSignUp 
        ? await signUpAction(email, password, name)
        : await signInAction(email, password);
      
      if (result?.error) {
        setError(result.error);
        setLoading(false);
      } else if (result?.success) {
        // Success - navigate to dashboard
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      setError('Authentication failed');
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "/api/auth/signin/google";
      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      console.error("Google sign in error:", err);
      setError("Google sign in failed");
    }
  };

  if (isPending) return <div className="p-4">Loading...</div>;

  if (session) {
    return (
      <div className="min-h-screen bg-gray-100 p-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">Welcome</h1>
          <div className="mb-4">
            <p className="text-gray-600">Email: {session.user.email}</p>
            <p className="text-gray-600">Name: {session.user.name}</p>
          </div>
          <button
            onClick={() => signOutAction()}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-4">
          {isSignUp ? "Sign Up" : "Sign In"}
        </h1>

        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          {isSignUp && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white font-bold py-2 px-4 rounded"
          >
            {loading ? "Loading..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <button
          onClick={() => {
            setIsSignUp(!isSignUp);
            setError("");
          }}
          className="w-full mb-4 text-blue-500 hover:text-blue-600"
        >
          {isSignUp ? "Have an account? Sign In" : "No account? Sign Up"}
        </button>

        <div className="border-t pt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full block text-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-bold py-2 px-4 rounded"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}
