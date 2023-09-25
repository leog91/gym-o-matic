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
    <div className="min-h-screen w-full bg-black  text-white flex flex-col items-center">
      <NavBar />
      {exercise ? (
        <div className="flex flex-col w-full max-w-3xl px-2  items-center ">
          <div className="max-w-lg flex flex-col py-6  w-full ">
            <h2 className="text-3xl mb-2 text-yellow-400   font-semibold">
              {exercise.name}
            </h2>

            <div className="text-lg flex items-baseline ">
              {" "}
              <div>Muscles:</div>
              <div className="text-base ml-1 font-bold">
                {exercise.type.map((t) => `${t.toUpperCase()}, `)}
              </div>
            </div>

            {exercise.info ? (
              <div className="mt-4 border-t-2 border-yellow-400 pt-2">
                <h3 className="text-yellow-400 text-xl"> Notes</h3>
                <p> {exercise.info}</p>
              </div>
            ) : null}
            {exercise.youtube ? (
              <div className="mt-4 border-t-2 border-yellow-400 pt-4">
                <iframe
                  className=" h-56 w-full sm:h-80"
                  src={`https://www.youtube-nocookie.com/embed/${exercise.youtube}`}
                  allowFullScreen
                  frameBorder="0"
                ></iframe>
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
