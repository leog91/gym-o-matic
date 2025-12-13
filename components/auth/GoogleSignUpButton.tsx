"use client";

import { authClient } from "@/utils/auth-client";

interface GoogleSignUpButtonProps {
  callbackURL?: string;
}

export function GoogleSignUpButton({ callbackURL = "/" }: GoogleSignUpButtonProps) {
  async function handleGoogleSignUp() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });
  }

  return (
    <button
      onClick={handleGoogleSignUp}
      className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
    >
      Sign up with Google
    </button>
  );
}
