import { db } from "../db";
import Routines from "./routines";
import { RoutineView } from "../types/constants";
import { auth } from "../auth";
import { headers } from "next/headers";
import { userFavorites } from "../db/schema";
import { eq } from "drizzle-orm";

// currently showing all routines
async function getVisibleRoutines() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isLoggedIn = !!session?.user;

  const foundRoutines = await db.query.routines.findMany({});

  let favoriteIds = new Set<string>();
  if (isLoggedIn && session?.user) {
    const favorites = await db.query.userFavorites.findMany({
      where: eq(userFavorites.userId, session.user.id),
    });
    favoriteIds = new Set(favorites.map((f) => f.routineId));
  }

  const result: RoutineView[] = [];

  for (const r of foundRoutines) {
    result.push({
      id: r.id,
      name: r.name,
      parts: [],
      creator: r.userId,
      isFavorite: favoriteIds.has(r.id),
    } as unknown as RoutineView);
  }

  return { routines: result, isLoggedIn };
}

export default async function RoutineList() {
  const { routines: visibleRoutines, isLoggedIn } = await getVisibleRoutines();

  return (
    <>
      <Routines
        name="Routines"
        routines={visibleRoutines}
        isLoggedIn={isLoggedIn}
      />
    </>
  );
}
