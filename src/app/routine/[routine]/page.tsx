import React from "react";
import Link from "next/link";
import { SingleExercise } from "../../../components/singleExercise";
import { buildRoutine, RoutineResponse } from "../../../utils/utils";
import { auth } from "../../../auth";
import { headers } from "next/headers";
import { db } from "../../../db";
import { routines } from "../../../db/schema";
import { eq } from "drizzle-orm";
import DeleteButton from "../../../components/DeleteButton";
import { deleteRoutine } from "../../../actions/routines";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default async function Routine(props: {
  params: Promise<{ routine: string }>;
}) {
  const params = await props.params;

  let routineb: RoutineResponse | null = null;
  if (params.routine) {
    routineb = await buildRoutine(params.routine);
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Check permissions separately since buildRoutine doesn't expose userId
  let canEdit = false;
  if (session?.user && params.routine) {
    const routineMeta = await db.query.routines.findFirst({
      where: eq(routines.id, params.routine),
    });
    if (routineMeta) {
      canEdit =
        routineMeta.userId === session.user.id ||
        session.user.email === ADMIN_EMAIL;
    }
  }

  return (
    <div className="min-h-screen w-full bg-black  text-white flex flex-col items-center">
      {routineb && routineb.status === "ok" && routineb.data ? (
        <div className="flex flex-col  w-full max-w-3xl px-2  items-center ">
          <div className="max-w-lg  py-6 flex flex-col items-center w-full relative">
            <Link
              href="/"
              className="absolute top-2 left-0 text-white hover:text-yellow-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </Link>

            {canEdit && (
              <div className="absolute top-2 right-0 flex gap-2">
                <Link
                  href={`/edit-routine/${routineb.data.id}`}
                  className="bg-zinc-800 text-yellow-400 px-3 py-1 rounded text-sm hover:bg-zinc-700"
                >
                  Edit
                </Link>
                <DeleteButton
                  id={routineb.data.id}
                  onDelete={deleteRoutine}
                  label="Delete"
                />
              </div>
            )}

            <div className="w-full">
              {routineb.data ? (
                <div>
                  <h1 className="text-3xl mb-2 mt-12 text-yellow-400   font-semibold">
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

                        {s.execution === "superset" || s.execution === "circuit" ? (
                          <p className="text-sm text-yellow-400">
                            {s.execution === "superset" ? "Superset" : "Circuit"}: {s.rounds} rounds
                            {s.rest ? `, ${s.rest} rest after each round` : s.restSeconds ? `, ${s.restSeconds}s rest after each round` : ""}
                          </p>
                        ) : null}

                        {s.info ? (
                          <p className="my-4 text-zinc-300"> {s.info}</p>
                        ) : null}

                        <div className="mt-1 space-y-1">
                          {s.exercises.map((e) => {
                            return <SingleExercise ex={e} grouped={s.execution !== "straight"} key={e.data?.id} />;
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
