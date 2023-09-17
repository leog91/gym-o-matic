import { useRouter } from "next/router";
import React from "react";
import { exercises } from "../../db/exercises";
import { Exercise } from "../../types/constants";
import { SingleExercise } from "..";
import Link from "next/link";
import NavBar from "../../components/navBar";

export default function Routine() {
  const router = useRouter();

  let slug = router.query.exercise;
  // console.log("slug =>", slug);
  // console.log(router.query);

  let exercise: Exercise | null = null;
  if (slug && typeof slug === "string") {
    exercise = exercises[slug];
  }

  return (
    <div className="min-h-screen w-full bg-stone-900  text-white flex flex-col items-center">
      {exercise ? (
        <div className="flex flex-col w-full max-w-3xl  items-center bg-green-800">
          <NavBar />
          <div className="max-w-lg flex flex-col py-6 items-center w-full ">
            <SingleExercise
              ex={exercise}
              key={exercise.name}
              handleDone={() => null}
            />

            {exercise.info ? (
              <div className="mt-4 w-full border-2 border-green-300">
                <h3 className=" text-center w-full bg-green-500"> info</h3>
                <div className="p-2"> {exercise.info}</div>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-screen  items-center justify-center">
          <div className="bg-red-500 p-5 rounded text-xl font-light">
            Exercise doesn&apos;t exist{" "}
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
