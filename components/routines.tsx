import React from "react";
import { allRoutines } from "../db/routines";
import Link from "next/link";

export default function Routines() {
  return (
    <div className="w-full max-w-md  mt-6 flex     flex-col ">
      <h2 className="text-3xl mb-2 text-yellow-400 underline  decoration-2 underline-offset-4 font-semibold">
        Routines
      </h2>
      <ul>
        {allRoutines.map((ar) => (
          <li key={ar.name}>
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
