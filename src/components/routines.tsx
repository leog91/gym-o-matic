import React from "react";
// import { allRoutines } from "../src/data/routines";
import Link from "next/link";

import { Routine } from "../types/constants";

export default function Routines({
  name,
  routines,
}: {
  name: string;
  routines: Routine[];
}) {
  return (
    <div className="w-full max-w-md  mt-6 flex     flex-col ">
      <h2 className="text-3xl mb-2 text-yellow-400 underline  decoration-2 underline-offset-4 font-semibold">
        {name}
      </h2>
      <ul>
        {routines.map((ar) => (
          <li key={ar.id}>
            <Link href={`/routine/${ar.id}`}>
              <div className="text-white  my-1 hover:border-l-2 hover:border-yellow-400 border-l-2 border-zinc-900 bg-zinc-900 pl-1 text-lg font-light underline underline-offset-2 rounded-r-md ">
                {ar.name}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
