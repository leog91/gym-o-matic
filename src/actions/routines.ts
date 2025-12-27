"use server";

import { db } from "../db";
import { routines, routineSteps, stepExercises, exercises } from "../db/schema";
import { auth } from "../auth";
import { headers } from "next/headers";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { RoutineStructure } from "../utils/utils";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export async function createRoutine(data: RoutineStructure) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const { routine: routineName, parts } = data;

    if (!routineName) {
        throw new Error("Routine name is required");
    }

    const routineId =
        routineName.toLowerCase().replace(/\s+/g, "_") +
        "_" +
        crypto.randomUUID().slice(0, 4);

    await db.transaction(async (tx) => {
        // 1. Create Routine
        await tx.insert(routines).values({
            id: routineId,
            name: routineName,
            userId: session.user.id,
        });

        // 2. Create Steps
        for (const [partIndex, part] of parts.entries()) {
            const stepId = crypto.randomUUID();
            await tx.insert(routineSteps).values({
                id: stepId,
                routineId: routineId,
                name: part.name || `Part ${partIndex + 1}`,
                order: part.p_index, // or partIndex
            });

            // 3. Create Step Exercises
            for (const [exIndex, ex] of part.exercises.entries()) {
                const exerciseName = ex.exercise;

                // If user types "Squat", search for it.
                let targetEx = await tx.query.exercises.findFirst({
                    where: (exercises, { eq, or, like }) =>
                        or(
                            eq(exercises.name, exerciseName),
                            eq(
                                exercises.id,
                                exerciseName.toLowerCase().replace(/\s+/g, "_")
                            )
                        ),
                });

                if (!targetEx) {
                    const stubId = exerciseName.toLowerCase().replace(/\s+/g, "_");
                    const check = await tx.query.exercises.findFirst({
                        where: eq(exercises.id, stubId),
                    });
                    if (!check) {
                        await tx.insert(exercises).values({
                            id: stubId,
                            name: exerciseName,
                            userId: session.user.id,
                            types: [], // Default empty types
                        });
                        targetEx = { id: stubId } as any;
                    } else {
                        targetEx = check;
                    }
                }

                if (targetEx) {
                    await tx.insert(stepExercises).values({
                        id: crypto.randomUUID(),
                        stepId: stepId,
                        exerciseId: targetEx.id,
                        order: ex.index, // or exIndex
                    });
                }
            }
        }
    });

    redirect(`/routine/${routineId}`);
}

export async function updateRoutine(id: string, data: RoutineStructure) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    // Check existing
    const existing = await db.query.routines.findFirst({
        where: eq(routines.id, id),
    });

    if (!existing) {
        throw new Error("Routine not found");
    }

    // Permission check
    const isOwner = existing.userId === session.user.id;
    const isAdmin = session.user.email === ADMIN_EMAIL;

    if (!isOwner && !isAdmin) {
        if (existing.userId === null) {
            throw new Error("Cannot edit system routine (Admin only)");
        }
        throw new Error("Unauthorized to edit this routine");
    }

    const { routine: routineName, parts } = data;
    if (!routineName) {
        throw new Error("Routine name is required");
    }

    await db.transaction(async (tx) => {
        // 1. Update Routine Metadata
        await tx.update(routines).set({
            name: routineName,
            updatedAt: new Date(),
        })
            .where(eq(routines.id, id));

        await tx.delete(routineSteps).where(eq(routineSteps.routineId, id));

        // 3. Insert new Steps
        for (const [partIndex, part] of parts.entries()) {
            const stepId = crypto.randomUUID();
            await tx.insert(routineSteps).values({
                id: stepId,
                routineId: id,
                name: part.name || `Part ${partIndex + 1}`,
                order: part.p_index,
            });

            // 4. Insert Step Exercises
            for (const [exIndex, ex] of part.exercises.entries()) {
                const exerciseName = ex.exercise;
                let targetEx = await tx.query.exercises.findFirst({
                    where: (exercises, { eq, or, like }) =>
                        or(
                            eq(exercises.name, exerciseName),
                            eq(
                                exercises.id,
                                exerciseName.toLowerCase().replace(/\s+/g, "_")
                            )
                        ),
                });

                if (!targetEx) {
                    const stubId = exerciseName.toLowerCase().replace(/\s+/g, "_");
                    const check = await tx.query.exercises.findFirst({
                        where: eq(exercises.id, stubId),
                    });
                    if (!check) {
                        await tx.insert(exercises).values({
                            id: stubId,
                            name: exerciseName,
                            userId: session.user.id,
                            types: [], // Default empty types
                        });
                        targetEx = { id: stubId } as any;
                    } else {
                        targetEx = check;
                    }
                }

                if (targetEx) {
                    await tx.insert(stepExercises).values({
                        id: crypto.randomUUID(),
                        stepId: stepId,
                        exerciseId: targetEx.id,
                        order: ex.index,
                    });
                }
            }
        }
    });

    redirect(`/routine/${id}`);
}

export async function deleteRoutine(id: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    // Check existing
    const existing = await db.query.routines.findFirst({
        where: eq(routines.id, id),
    });

    if (!existing) {
        throw new Error("Routine not found");
    }

    // Permission check
    const isOwner = existing.userId === session.user.id;
    const isAdmin = session.user.email === ADMIN_EMAIL;

    if (!isOwner && !isAdmin) {
        throw new Error("Unauthorized to delete this routine");
    }

    await db.transaction(async (tx) => {
        // Steps should cascade if DB configured, but we can be explicit
        await tx.delete(routineSteps).where(eq(routineSteps.routineId, id));
        await tx.delete(routines).where(eq(routines.id, id));
    });

    redirect("/");
}
