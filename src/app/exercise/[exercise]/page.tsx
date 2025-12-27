import React from "react";
import { getExerciseById } from "../../../utils/utils";
import Link from "next/link";
import { auth } from "../../../auth"; 
import { headers } from "next/headers";
import DeleteButton from "../../../components/DeleteButton";
import { deleteExercise } from "../../../actions/exercises";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default async function Routine(props: { params: Promise<{ exercise: string }> }) {
  const params = await props.params;

  const exerciseRes = await getExerciseById(params.exercise);
  const exercise = exerciseRes.data;

  const session = await auth.api.getSession({
      headers: await headers()
  });

  const canEdit = exercise && session?.user && (
      session.user.email === ADMIN_EMAIL || 
      (exercise as any).userId === session.user.id // cast as any because Exercise type definition might not have userId yet update later
  );

  return (
    <div className="min-h-screen w-full bg-black  text-white flex flex-col items-center">
      {exercise ? (
        <div className="flex flex-col w-full max-w-3xl px-2  items-center ">
          <div className="max-w-lg flex flex-col py-6  w-full relative">
             
             <Link href="/" className="absolute top-2 left-0 text-white hover:text-yellow-400 transition-colors">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                 <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
               </svg>
             </Link>

             {canEdit && (
                 <div className="absolute top-0 right-0 flex gap-2">
                     <Link 
                        href={`/edit-exercise/${exercise.id}`}
                        className="bg-zinc-800 text-yellow-400 px-3 py-1 rounded text-sm hover:bg-zinc-700"
                     >
                        Edit
                     </Link>
                     <DeleteButton id={exercise.id} onDelete={deleteExercise} label="Delete" />
                 </div>
             )}
        
            <h2 className="text-3xl mb-2 mt-12 text-yellow-400   font-semibold">
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
          <div className="bg-red-500 p-5 rounded-sm text-xl font-light">
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
