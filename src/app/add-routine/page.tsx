"use client";

import React, { useId, useState } from "react";
import { Routine, Step, Exercise } from "../../../types/constants";
import {
  RoutineStructure,
  Part,
  PartsExercise,
  PartsExercises,
} from "../../utils/utils";

//validate with zod

// type Exercises = string[];

function Page() {
  const initialState: RoutineStructure = {
    routine: "",
    parts: [
      {
        // id: crypto.randomUUID(),
        //generate random id on submit

        id: useId(),
        name: "",
        exercises: [{ index: 0, exercise: "ex_0" }],
        p_index: 0,
      },
    ],
  };

  const [routineStructure, setRoutineStructure] = useState(initialState);

  const addExercise = (p: Part) => {
    const updatedParts = routineStructure.parts.map((part) => {
      if (part.id === p.id) {
        const newExerciseIndex = part.exercises.length;
        const newExercise = {
          index: newExerciseIndex,
          exercise: `P_${p.p_index}_E_${newExerciseIndex}`,
        };
        return {
          ...part,
          exercises: [...part.exercises, newExercise],
        };
      }
      return part;
    });

    setRoutineStructure({
      ...routineStructure,
      parts: updatedParts,
    });
  };

  const addPart = () => {
    console.log("add Part");

    const newPart: Part = {
      name: "",
      id: crypto.randomUUID(),
      //part
      exercises: [{ index: 0, exercise: "P_0_E_0" }],
      p_index: routineStructure.parts.length,
    };

    const updatedParts = [...routineStructure.parts, newPart];

    setRoutineStructure({
      ...routineStructure,
      parts: updatedParts,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("submit =>");
    e.preventDefault();
    console.log(JSON.stringify(routineStructure, null, 2));
  };

  const handlePartChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    p: Part,
    ip: number
  ) => {
    const newPart: Part = { ...p, name: e.target.value };

    const updatedParts: Part[] = [
      ...routineStructure.parts.filter((p) => p.id !== newPart.id),
      newPart,
    ].sort((a, b) => a.p_index - b.p_index);

    setRoutineStructure({
      ...routineStructure,
      parts: updatedParts,
    });
  };

  const handleExerciseChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    p: Part,
    exercise: PartsExercise
  ) => {
    const exercisesDraft: PartsExercises = [
      ...p.exercises.filter((e) => e.index !== exercise.index),
      { exercise: e.target.value, index: exercise.index },
    ].sort((a, b) => a.index - b.index);

    const updatedRoutineStructure: RoutineStructure = { ...routineStructure };
    const selectedPart = { ...updatedRoutineStructure.parts[p.p_index] };

    const newPart = { ...selectedPart, exercises: exercisesDraft };

    const updatedParts = [
      ...routineStructure.parts.filter((part) => part.id !== p.id),
      newPart,
    ].sort((a, b) => a.p_index - b.p_index);

    setRoutineStructure({
      ...routineStructure,
      parts: updatedParts,
    });
  };

  return (
    <main className="min-h-screen w-full bg-black  text-white flex flex-col items-center">
      <form
        className="w-full max-w-md flex flex-col "
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="border-2    flex flex-col items-center border-pink-500 p-2 my-5">
          <div className="  flex  ">
            Routine name
            <input
              className="text-black "
              name="routine_name"
              onChange={(e) =>
                setRoutineStructure({
                  ...routineStructure,
                  routine: e.target.value,
                })
              }
              value={routineStructure.routine}
              type="text"
            />
          </div>
          {/* index ui  */}
          {routineStructure.parts.map((p, ip) => (
            <div key={p.id}>
              <div className="border-2  flex flex-col items-center  border-yellow-500 p-2 my-2">
                <div>
                  Part name [optional]
                  <input
                    className="text-black"
                    type="text"
                    value={p.name}
                    onChange={(e) => handlePartChange(e, p, ip)}
                    name={`P_${ip}`}
                  />
                </div>
                {/* index */}
                {p.exercises.map((e, i) => (
                  <div
                    key={i}
                    className="border-2  w-full flex items-center justify-between border-green-500 p-2 my-2"
                  >
                    {i + 1}
                    {/* {e.exercise} */}
                    <input
                      className="text-black"
                      onChange={
                        (event) => handleExerciseChange(event, p, e)
                        // handleAddExcercise(event, e.exercise, ip, i, p)
                      }
                      name={`P${ip}_E_${i}`}
                      type="text"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => addExercise(p)}
                  className=" border-2 border-white w-5 h-5 flex justify-center items-center mx-3 rounded-full"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addPart()}
            className=" border-2 border-white w-5 h-5 flex justify-center items-center mx-3 rounded-full"
          >
            +
          </button>
        </div>
        <button type="submit" className="border-2 border-white p-2 rounded-lg">
          go!(log)
        </button>
      </form>
      {/* // */}
      {JSON.stringify(routineStructure, null, 2)}
      {/* // */}
      <div className="border-red-500 border-2 p-2">
        <div>plain routine</div>
        <div>remaining exercises -- copy clipboard</div>
        <div>duplicated-more info</div>
        <div>preview</div>
      </div>
    </main>
  );
}

export default Page;
