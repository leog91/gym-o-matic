import { db } from "../db";
import Routines from "./routines";
import { RoutineView } from "../types/constants";
import { auth } from "../auth";
import { headers } from "next/headers";
import { userFavorites, routines } from "../db/schema";
import { eq } from "drizzle-orm";

async function getUserFavoriteRoutines() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return null;
  }

  // Join userFavorites with routines to get details
  const favorites = await db
    .select({
      id: routines.id,
      name: routines.name,
      userId: routines.userId,
    })
    .from(userFavorites)
    .innerJoin(routines, eq(userFavorites.routineId, routines.id))
    .where(eq(userFavorites.userId, session.user.id));

  const result: RoutineView[] = favorites.map((r) => ({
    id: r.id,
    name: r.name,
    parts: [],
    creator: r.userId,
    isFavorite: true, // By definition, these are favorites
  } as unknown as RoutineView));

  return result;
}

export default async function FavoriteRoutinesList() {
  const favoriteRoutines = await getUserFavoriteRoutines();

  if (!favoriteRoutines || favoriteRoutines.length === 0) {
    return null;
  }

  return (
    <Routines
      name="Your Favorites"
      routines={favoriteRoutines}
      isLoggedIn={true}
    />
  );
}
