import { AuthGuard } from "@/components/auth/AuthGuard";
import { EmailSignUpForm } from "@/components/auth/EmailSignUpForm";
import { GoogleSignUpButton } from "@/components/auth/GoogleSignUpButton";
import Link from "next/link";

export default function SignUpPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-center">Sign Up</h1>
          <EmailSignUpForm />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <GoogleSignUpButton callbackURL="/" />
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </AuthGuard>
  );
}
