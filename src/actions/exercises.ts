"use server";

import { db } from "../db";
import { exercises, stepExercises, routineSteps, routines } from "../db/schema";
import { auth } from "../auth"; // auth helper from better-auth
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function createExercise(formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const name = formData.get("name") as string;
    const info = formData.get("info") as string;
    const youtube = formData.get("youtube") as string;
    const typesRaw = formData.getAll("types") as string[];
    // form checkboxes with name="types"

    if (!name) {
        throw new Error("Name is required");
    }

    const id = name.toLowerCase().replace(/\s+/g, "_");

    await db.insert(exercises).values({
        id,
        name,
        info,
        youtube,
        types: typesRaw, // Drizzle handles JSON
        userId: session.user.id,
    });

    redirect(`/exercise/${id}`);
}

export async function updateExercise(id: string, formData: FormData) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    // Check existing
    const existing = await db.query.exercises.findFirst({
        where: eq(exercises.id, id)
    });



    if (!existing) {
        throw new Error("Exercise not found");
    }

    // Permission check
    // If userId is null (system), only admin can edit.
    // If userId is set, only that user or admin can edit.
    const isOwner = existing.userId === session.user.id;
    const isAdmin = session.user.email === ADMIN_EMAIL;

    if (!isOwner && !isAdmin) {
        if (existing.userId === null) {
            throw new Error("Cannot edit system exercise (Admin only)");
        }
        throw new Error("Unauthorized to edit this exercise");
    }

    const name = formData.get("name") as string;
    const info = formData.get("info") as string;
    const youtube = formData.get("youtube") as string;
    const typesRaw = formData.getAll("types") as string[];

    await db.update(exercises).set({
        name,
        info,
        youtube,
        types: typesRaw
    }).where(eq(exercises.id, id));

    redirect(`/exercise/${id}`);
}

export async function deleteExercise(id: string, force: boolean = false) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const existing = await db.query.exercises.findFirst({
        where: eq(exercises.id, id)
    });

    if (!existing) {
        throw new Error("Exercise not found");
    }

    const isOwner = existing.userId === session.user.id;
    const isAdmin = session.user.email === ADMIN_EMAIL;

    if (!isOwner && !isAdmin) {
        throw new Error("Unauthorized to delete this exercise");
    }

    // Usage check
    if (!force) {
        const usages = await db.select({
            routineName: routines.name
        })
            .from(stepExercises)
            .innerJoin(routineSteps, eq(stepExercises.stepId, routineSteps.id))
            .innerJoin(routines, eq(routineSteps.routineId, routines.id))
            .where(eq(stepExercises.exerciseId, id));

        if (usages.length > 0) {
            // Deduplicate
            const uniqueNames = Array.from(new Set(usages.map(u => u.routineName))).join(", ");
            throw new Error(`WARNING: usage_found|${uniqueNames}`);
        }
    }

    await db.transaction(async (tx) => {
        // Cascade delete manually
        await tx.delete(stepExercises).where(eq(stepExercises.exerciseId, id));
        await tx.delete(exercises).where(eq(exercises.id, id));
    });

    redirect("/");
}
