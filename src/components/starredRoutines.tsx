import { db } from "../db";
import Routines from "./routines";
import { Routine } from "../types/constants";
import { auth } from "../auth";
import { headers } from "next/headers";

// currently showing all routines
async function getVisibleRoutines() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Find all routines that are either system (userId is null) or belong to the current user
  // const foundRoutines = await db.query.routines.findMany({
  //     where: or(
  //         isNull(routines.userId),
  //         session?.user ? eq(routines.userId, session.user.id) : undefined
  //     )
  // });

  const foundRoutines = await db.query.routines.findMany({});

  const result: Routine[] = [];

  for (const r of foundRoutines) {
    result.push({
      id: r.id,
      name: r.name,
      parts: [],
      creator: r.userId,
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
