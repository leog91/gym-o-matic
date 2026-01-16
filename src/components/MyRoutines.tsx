import { db } from "../db";
import Routines from "./routines";
import { RoutineView } from "../types/constants";
import { auth } from "../auth";
import { headers } from "next/headers";
import { routines, userFavorites } from "../db/schema";
import { eq } from "drizzle-orm";

async function getUserRoutines() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  const userCreatedRoutines = await db
    .select()
    .from(routines)
    .where(eq(routines.userId, session.user.id));

  
  const favorites = await db
    .select()
    .from(userFavorites)
    .where(eq(userFavorites.userId, session.user.id));
    
  const favoriteIds = new Set(favorites.map((f) => f.routineId));

  const result: RoutineView[] = userCreatedRoutines.map((r) => ({
    id: r.id,
    name: r.name,
    parts: [],
    creator: r.userId,
    isFavorite: favoriteIds.has(r.id),
  } as unknown as RoutineView));

  return result;
}

export default async function MyRoutines() {
  const myRoutines = await getUserRoutines();

  if (!myRoutines || myRoutines.length === 0) {
    return null;
  }

  return (
    <Routines
      name="Your Routines"
      routines={myRoutines}
      isLoggedIn={true}
    />
  );
}
