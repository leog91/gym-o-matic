import { db } from "../../db";
import Routines from "../../components/routines";
import { RoutineView } from "../../types/constants";
import { auth } from "../../auth";
import { headers } from "next/headers";
import { routines, user, userFavorites } from "../../db/schema";
import { eq, like } from "drizzle-orm";
import { notFound } from "next/navigation";

export default async function UserProfile({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  // 1. Find the user by name (email prefix)
  const foundUser = await db.query.user.findFirst({
    where: like(user.email, `${decodedUsername}@%`),
  });

  if (!foundUser) {
    notFound();
  }

  // 2. Fetch routines created by this user
  const userRoutines = await db
    .select()
    .from(routines)
    .where(eq(routines.userId, foundUser.id));

  // 3. Check for viewer's session to determine favorites
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const isLoggedIn = !!session?.user;

  let viewerFavoriteIds = new Set<string>();
  if (isLoggedIn && session?.user) {
    const favorites = await db
      .select()
      .from(userFavorites)
      .where(eq(userFavorites.userId, session.user.id));
    viewerFavoriteIds = new Set(favorites.map((f) => f.routineId));
  }

  const result: RoutineView[] = userRoutines.map((r) => ({
    id: r.id,
    name: r.name,
    parts: [],
    creator: r.userId,
    isFavorite: viewerFavoriteIds.has(r.id),
  } as unknown as RoutineView));

  return (
    <main className="min-h-screen flex flex-col items-center bg-black pt-8">
      <div className="max-w-3xl w-full flex flex-col items-center">
        <Routines
          name={`${foundUser.name}'s Routines`}
          routines={result}
          isLoggedIn={isLoggedIn}
        />
      </div>
    </main>
  );
}
