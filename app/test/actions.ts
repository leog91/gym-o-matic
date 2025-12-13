"use server";

import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getSession() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    return session;
}

export async function signOutAction() {
    await auth.api.signOut({
        headers: await headers(),
    });
    redirect("/test");
}

export async function signUpAction(email: string, password: string, name: string) {
    try {
        await auth.api.signUpEmail({
            body: {
                email,
                password,
                name,
            },
        });

        return { success: true };
    } catch (error: any) {
        console.error("Sign up error:", error);
        return { error: error.message || "Sign up failed" };
    }
}

export async function signInAction(email: string, password: string) {
    try {
        await auth.api.signInEmail({
            body: {
                email,
                password,
            },
        });

        return { success: true };
    } catch (error: any) {
        console.error("Sign in error:", error);
        return { error: error.message || "Invalid credentials" };
    }
}
