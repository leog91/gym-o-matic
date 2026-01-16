"use server";

import { db } from "../db";
import { userFavorites } from "../db/schema";
import { auth } from "../auth";
import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function toggleFavorite(routineId: string) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        throw new Error("Unauthorized");
    }

    const userId = session.user.id;

    const existing = await db.query.userFavorites.findFirst({
        where: and(
            eq(userFavorites.userId, userId),
            eq(userFavorites.routineId, routineId)
        ),
    });

    if (existing) {
        await db.delete(userFavorites).where(
            and(
                eq(userFavorites.userId, userId),
                eq(userFavorites.routineId, routineId)
            )
        );
    } else {
        await db.insert(userFavorites).values({
            userId: userId,
            routineId: routineId,
        });
    }

    revalidatePath("/");
    revalidatePath(`/routine/${routineId}`);
}

export async function getUserFavorites() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session?.user) {
        return [];
    }

    const userId = session.user.id;

    const favorites = await db.query.userFavorites.findMany({
        where: eq(userFavorites.userId, userId),
    });

    return favorites.map((f) => f.routineId);
}
