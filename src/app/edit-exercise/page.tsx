import React from "react";
import { db } from "../../db";
import EditExerciseClient from "./client-page";
import { Exercise } from "../../types/constants";

export default async function Page() {
  const exercisesData = await db.query.exercises.findMany();
  // Cast data
  const exercises = exercisesData.map(e => ({ ...e, type: e.types })) as unknown as Exercise[];

  return <EditExerciseClient exercises={exercises} />;
}
