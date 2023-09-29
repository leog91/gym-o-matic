import React from "react";
import { exercises } from "../../db/exercises";
import { SingleExercise } from "./singleExercise";

function Exercises() {
  return (
    <div className="max-w-md flex mt-6 flex-col">
      <h2 className="text-3xl mb-2 text-yellow-400 underline  decoration-2 underline-offset-4 font-semibold">
        Exercises
      </h2>
      {Object.entries(exercises).map((e) => (
        <SingleExercise
          ex={e[1]}
          // id={e[1].id}
          key={e[0]}
          //   handleDone={handleDone}
          handleDone={() => null}
        />
      ))}
    </div>
  );
}

export default Exercises;
