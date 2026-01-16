import Link from "next/link";
import { RoutineView } from "../types/constants";
import FavoriteButton from "./FavoriteButton";

export default function Routines({
  name,
  routines,
  isLoggedIn,
}: {
  name: string;
  routines: RoutineView[];
  isLoggedIn: boolean;
}) {
  return (
    <div className="w-full max-w-md mt-6 flex flex-col">
      <h2 className="text-3xl mb-2 text-yellow-400 underline decoration-2 underline-offset-4 font-semibold">
        {name}
      </h2>
      <ul>
        {routines.map((ar) => (
          <li key={ar.id} className="flex items-center mb-1">
            <Link href={`/routine/${ar.id}`} className="flex-grow">
              <div className="text-white hover:border-l-2 hover:border-yellow-400 border-l-2 border-zinc-900 bg-zinc-900 pl-1 text-lg font-light underline underline-offset-2 rounded-r-md">
                {ar.name}
              </div>
            </Link>
            {isLoggedIn && (
              <FavoriteButton
                routineId={ar.id}
                initialIsFavorite={!!ar.isFavorite}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
