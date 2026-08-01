"use client";

import { useRouter } from "next/navigation";
import { ExerciseResponse } from "../utils/utils";

export const SingleExercise = ({ ex, grouped = false }: { ex: ExerciseResponse; grouped?: boolean }) => {
  const router = useRouter();
  const exercise = ex.data;

  if (!exercise) return null;

  const prescription = ex.prescription;
  const standardDetails =
    prescription?.kind === "standard" &&
    (grouped
      ? prescription.reps.includes("per leg")
        ? prescription.reps
        : `${prescription.reps} per round`
      : prescription.sets === 1 && /\b(?:sec|min)\b/.test(prescription.reps)
      ? prescription.reps
      : `${prescription.sets} x ${prescription.reps}`);

  return (
    <div
      className="w-full rounded-md bg-zinc-900 hover:cursor-pointer hover:bg-zinc-800 transition-colors"
      onClick={() => router.push(`/exercise/${exercise.id}`)}
    >
      <div className="flex items-center justify-between gap-3 px-1 py-1">
        <div className="min-w-0">
          <div className="text-lg font-light capitalize text-white">
            {exercise.name}
          </div>
        </div>
        {exercise.type && exercise.type.length > 0 ? (
          <div className="flex shrink-0 flex-wrap justify-end gap-1 pt-0.5">
            {exercise.type.map((type) => (
              <span
                key={type}
                className="rounded bg-zinc-800 px-2 py-0.5 text-[11px] font-medium uppercase text-blue-400"
              >
                {type}
              </span>
            ))}
          </div>
        ) : null}
      </div>
      {prescription ? (
        <div className="border-t border-zinc-800 px-1 py-1 text-sm leading-5 text-yellow-400">
          {prescription.kind === "standard" ? (
            `${standardDetails}${prescription.weight ? ` @ ${prescription.weight}` : ""}${prescription.restSeconds ? `, ${prescription.restSeconds}s rest` : ""}`
          ) : (
            <>
              <span className="text-zinc-400">Pyramid: </span>
              {prescription.sets
                .map((set) => `${set.reps}${set.weight ? ` @ ${set.weight}` : ""}`)
                .join(" / ")}
              {prescription.restSeconds
                ? <span className="text-zinc-400">, {prescription.restSeconds}s rest</span>
                : null}
            </>
          )}
        </div>
      ) : null}
    </div>
  );
};
