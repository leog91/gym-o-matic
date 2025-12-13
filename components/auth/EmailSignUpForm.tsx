"use client";

import { authClient } from "@/utils/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function EmailSignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await authClient.signUp.email({
        email,
        password,
        name,
      });

      console.log("Sign up result:", result);

      // Check if there's a user object in the response (success)
      if (result.data?.user) {
        // Success - redirect to dashboard
        router.push("/dashboard");
      } else if (result.error) {
        setError(result.error.message || "Failed to create account");
      } else {
        setError("Unexpected response from server");
      }
    } catch (err: any) {
      console.error("Sign up error:", err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 border p-6 rounded-xl shadow">
        <input
          type="text"
          placeholder="Name"
          className="w-full border px-3 py-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white py-2 rounded hover:opacity-80 disabled:opacity-50"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
