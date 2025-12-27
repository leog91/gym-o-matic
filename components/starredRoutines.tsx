import React from "react";

import starredIDs from "../src/data/starred.json";
import { allRoutines } from "../src/data/routines";

import Routines from "./routines";

async function getStarred() {
  const starredRoutines = allRoutines.filter((r) =>
    starredIDs.some((s) => s.routine_ID === r.id)
  );

  return starredRoutines;
}

export default async function StarredRoutines() {
  const starredRoutines = await getStarred();

  return (
    <>
      <Routines name="Routines" routines={starredRoutines} />
    </>
  );
}
