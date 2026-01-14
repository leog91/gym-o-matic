"use client";

import React from "react";
import RoutineForm from "../../components/RoutineForm";
import { createRoutine } from "../../actions/routines";

function Page() {
  return (
    <main className="min-h-screen w-full bg-black  text-white flex flex-col items-center">
      <h1 className="text-3xl font-bold text-yellow-400 my-6">
        Create Routine
      </h1>
      <RoutineForm submitLabel="Create Routine" onSubmit={createRoutine} />
    </main>
  );
}
export default Page;
