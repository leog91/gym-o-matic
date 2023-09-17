import { useRouter } from "next/router";
import React from "react";

import { Routine as RoutineType } from "../../types/constants";

import Link from "next/link";
import { allRoutines } from "../../db/routines";
import { SingleExercise } from "..";
import NavBar from "../../components/navBar";

export default function Routine() {
  const router = useRouter();

  let slug = router.query.routine;
  // console.log("slug =>", slug);
  // console.log(router.query);

  let routine: RoutineType | null | undefined = null;
  if (slug && typeof slug === "string") {
    routine = allRoutines.find((r) => r.id === slug);
    // console.log("routine =>", routine);
  }

  return (
    <div className="min-h-screen w-full bg-stone-900  text-white flex flex-col items-center">
      {routine ? (
        <div className="flex flex-col w-full max-w-3xl  items-center bg-green-800">
          <NavBar />
          <div className="max-w-lg  py-6 flex flex-col items-center w-full ">
            {/* <h2>{routine.name}</h2> */}
            <div className="w-full">
              {routine.steps.length > 1 ? (
                <div>
                  <h1 className="text-2xl font-light text-green-100">
                    {routine.name}
                  </h1>

                  <div>
                    {routine.steps.map((s) => (
                      <div
                        className="border-t-2 border-green-300 mt-7 pt-1"
                        key={s.id}
                      >
                        {s.name ? (
                          <h2 className="text-xl font-light text-green-100">
                            {s.name}
                          </h2>
                        ) : null}

                        {s.info ? <p className="my-4"> {s.info}</p> : null}

                        {s.exercises.map((e) => (
                          <SingleExercise
                            ex={e}
                            handleDone={() => null}
                            key={e.id}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-xl font-light text-green-100">
                    {routine.name}
                  </h2>
                  {routine.info ? (
                    <p className="my-4"> {routine.info}</p>
                  ) : null}
                  <div>
                    {routine.steps.map((s) => (
                      <div key={s.id}>
                        {s.info ? <div>step info: {s.info}</div> : null}

                        {s.exercises.map((e) => (
                          <SingleExercise
                            ex={e}
                            handleDone={() => null}
                            key={e.id}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen  items-center justify-center">
          <div className="bg-red-500 p-5 rounded text-xl font-light">
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
