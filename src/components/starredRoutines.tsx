import React from "react";
import { db } from "../db";
import Routines from "./routines";
import { Routine } from "../types/constants";
import { auth } from "../auth";
import { headers } from "next/headers";
import { routines } from "../db/schema";
import { eq, or, isNull } from "drizzle-orm";
import { buildRoutine } from "../utils/utils";

async function getVisibleRoutines() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });
    
    // Find all routines that are either system (userId is null) or belong to the current user
    const foundRoutines = await db.query.routines.findMany({
        where: or(
            isNull(routines.userId),
            session?.user ? eq(routines.userId, session.user.id) : undefined
        )
    });

    const result: Routine[] = [];
    // We *could* optimize this by not fetching full routine structure for the list view,
    // but the `Routines` component expects `Routine[]` (which implies structure).
    // Actually `Routines` component only uses `ar.name` and `ar.id`.
    // So we can just map the DB result directly!
    // But we need to ensure type compatibility.
    
    for (const r of foundRoutines) {
        // Just construct a minimal object needed for display?
        // Or fetch full if we really need it.
        // Let's use full fetch to be safe with types for now, although N+1 (optimize later if slow).
        // Actually, let's just use the DB object if it matches enough.
        
        // buildRoutine returns complex object. Routine type has "parts".
        // The DB `foundRoutines` are flat.
        // We'll just fetch full for now to reuse `Routine` type correctly.
        
        // Wait, fetching full N times might be heavy.
        // Let's check `Routines` component usage again. 
        // It iterates `routines.map((ar) => ... ar.name, ar.id`.
        // It doesn't use parts.
        // So we can just cast or verify.
        
        result.push({
            id: r.id,
            name: r.name,
            parts: [], // Placeholder, list view doesn't render parts
            creator: r.userId
        } as unknown as Routine);
    }
    
    return result;
}

export default async function RoutineList() {
  const visibleRoutines = await getVisibleRoutines();

  return (
    <>
      <Routines name="Routines" routines={visibleRoutines} />
    </>
  );
}
