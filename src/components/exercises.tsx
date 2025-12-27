import React from "react";
import { db } from "../db";
import { SingleExercise } from "./singleExercise";
import { ExerciseResponse } from "../utils/utils";
import { Exercise } from "../types/constants";

async function Exercises() {
  const allExercises = await db.query.exercises.findMany();

  return (
    <div className="max-w-md flex mt-6 flex-col">
      <h2 className="text-3xl mb-2 text-yellow-400 underline  decoration-2 underline-offset-4 font-semibold">
        Exercises
      </h2>

      {allExercises.map((e) => {
        // Cast DB row to Exercise type (DB types is json array, Exercise type is string[])
        const exerciseData = {
            ...e,
            type: e.types
        } as unknown as Exercise; 
        const draft: ExerciseResponse = { data: exerciseData, status: "ok" };
        return <SingleExercise ex={draft} key={e.id} />;
      })}
    </div>
  );
}

export default Exercises;
