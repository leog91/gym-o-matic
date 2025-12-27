import React from "react";
import starredIDs from "../data/starred.json";
import { db } from "../db";
import Routines from "./routines";
import { Routine } from "../types/constants";
import { eq, inArray } from "drizzle-orm";
import { routines } from "../db/schema";
import { buildRoutine } from "../utils/utils";

async function getStarred() {
  // Fetch only the starred routines
  // Since buildRoutine is expensive (nested fetches), and we want rich data?
  // Original code: allRoutines (which was rich data) filtered by ID.
  // We can fetch routines from DB where ID is in starredIDs.
  
  const ids = starredIDs.map(s => s.routine_ID);
  
  // We can't easily do "where inArray" with buildRoutine utility as it fetches one.
  // We'll iterate and fetch (N+1 queries but small N).
  // Or write a new query.
  
  const result: Routine[] = [];
  for (const id of ids) {
      const built = await buildRoutine(id);
      if (built.status === "ok" && built.data) {
          result.push(built.data as unknown as Routine);
      }
  }
  return result;
}

export default async function StarredRoutines() {
  const starredRoutines = await getStarred();

  return (
    <>
      <Routines name="Routines" routines={starredRoutines} />
    </>
  );
}
