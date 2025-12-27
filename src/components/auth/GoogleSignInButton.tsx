"use client";

import { authClient } from "@/utils/auth-client";

interface GoogleSignInButtonProps {
  callbackURL?: string;
}

export function GoogleSignInButton({ callbackURL = "/dashboard" }: GoogleSignInButtonProps) {
  async function handleGoogleSignIn() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });
  }

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
    >
      Sign in with Google
    </button>
  );
}
