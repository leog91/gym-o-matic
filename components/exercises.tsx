import React from "react";
import exercises from "../db/exercises.json";
import { SingleExercise } from "./singleExercise";
import { ExerciseResponse } from "../utils/utils";

function Exercises() {
  return (
    <div className="max-w-md flex mt-6 flex-col">
      <h2 className="text-3xl mb-2 text-yellow-400 underline  decoration-2 underline-offset-4 font-semibold">
        Exercises
      </h2>
      {/* {Object.entries(exercises).map((e) => (
        <SingleExercise ex={e[1]} key={e[0]} />
      ))} */}

      {exercises.map((e) => {
        const draft: ExerciseResponse = { data: e, status: "ok" };
        return <SingleExercise ex={draft} key={e.id} />;
      })}
    </div>
  );
}

export default Exercises;
