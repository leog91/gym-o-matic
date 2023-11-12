"use client";
import { Exercise } from "../../types/constants";
import { useRouter } from "next/navigation";
import { ExerciseResponse } from "../utils/utils";

// type Inputs = {
//   example: string;
//   exampleRequired: string;
// };
//tiny description on exercise??
// bike , km, time
//run km,time
// extract cardio
// choose by routine, '5x5', core, football

export const SingleExercise = ({ ex }: { ex: ExerciseResponse }) => {
  const router = useRouter();

  if (!ex.data) return;

  return (
    <div
      className="flex justify-between rounded-md hover:cursor-pointer w-full   text-white  bg-zinc-900 my-1 "
      key={ex.data.name}
      onClick={() => router.push(`/exercise/${ex.data?.id}`)}
    >
      <div className="text-lg font-light capitalize ml-1">{ex.data.name}</div>

      <div className="flex">
        {ex.data.type.map((t) => (
          <span
            key={t}
            className=" uppercase  my-auto text-xs font-medium mr-2 px-2.5 py-0.5 rounded bg-zinc-800 text-blue-400"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};
