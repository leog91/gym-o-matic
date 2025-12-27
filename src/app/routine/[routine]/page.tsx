import React from "react";
import Link from "next/link";
import { SingleExercise } from "../../../components/singleExercise";
import { buildRoutine } from "../../../utils/utils";
import { RoutineResponse } from "../../../utils/utils";

export default async function Routine(props: { params: Promise<{ routine: string }> }) {
  const params = await props.params;

  let routineb: RoutineResponse | null = null;
  if (params.routine) {
    routineb = await buildRoutine(params.routine);
  }

  return (
    <div className="min-h-screen w-full bg-black  text-white flex flex-col items-center">
      {routineb && routineb.status === "ok" && routineb.data ? (
        <div className="flex flex-col  w-full max-w-3xl px-2  items-center ">
          <div className="max-w-lg  py-6 flex flex-col items-center w-full ">
            <div className="w-full">
              {/* {} */}
              {routineb.data ? (
                <div>
                  <h1 className="text-3xl mb-2 text-yellow-400   font-semibold">
                    {routineb.data.name}
                  </h1>
                  {routineb.data.info ? (
                    <p className="my-4 text-zinc-300"> {routineb.data.info}</p>
                  ) : null}
                  <div>
                    {routineb.data.steps.map((s) => (
                      <div
                        className="border-t-2 border-yellow-400 mt-7 pt-1"
                        key={s.id}
                      >
                        {s.name ? (
                          <h2 className="text-xl my-1 font-semibold text-yellow-400">
                            {s.name}
                          </h2>
                        ) : null}

                        {s.info ? (
                          <p className="my-4 text-zinc-300"> {s.info}</p>
                        ) : null}

                        <div className="mt-1">
                          {s.exercises.map((e) => {
                            return <SingleExercise ex={e} key={e.data?.id} />;
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen  items-center justify-center">
          <div className="bg-red-500 p-5 rounded-sm text-xl font-light">
            Routine doesn&apos;t exist{" "}
          </div>
          <Link
            className="bg-green-500 m-4 p-1 rounded-md border-2 border-green-500 hover:border-white"
            href="/"
          >
            Home 🔙
          </Link>
        </div>
      )}
    </div>
  );
}
