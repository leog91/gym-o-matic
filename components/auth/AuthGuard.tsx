"use client";

import { authClient } from "@/utils/auth-client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function AuthGuard({ children, redirectTo = "/dashboard" }: AuthGuardProps) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const session = await authClient.getSession();
      
      // Check if the response is an error
      if (session?.error) {
        setIsChecking(false);
        return;
      }
      
      if (session?.data?.user) {
        // User is already logged in, redirect
        router.push(redirectTo);
      } else {
        setIsChecking(false);
      }
    }

    checkAuth();
  }, [router, redirectTo]);

  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
