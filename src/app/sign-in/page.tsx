"use client";

import { EmailSignInForm } from "@/components/auth/EmailSignInForm";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import { AuthGuard } from "@/components/auth/AuthGuard";

export default function SignIn() {
  return (
    <AuthGuard redirectTo="/dashboard">
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-6">
          <h1 className="text-2xl font-bold text-center">Sign In</h1>

          <EmailSignInForm />

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>

          <GoogleSignInButton callbackURL="/dashboard" />

          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="/sign-up" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </AuthGuard>
  );
}
