import React from "react";
import { db } from "../../../db";
import { exercises } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { updateExercise } from "../../../actions/exercises";
import { ExerciseType, EXERCISE_TYPES } from "../../../types/constants";
import { auth } from "../../../auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default async function EditExercisePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  const session = await auth.api.getSession({
      headers: await headers()
  });

  if (!session?.user) {
      redirect("/sign-in");
  }

  const exercise = await db.query.exercises.findFirst({
      where: eq(exercises.id, params.id)
  });

  if (!exercise) {
      return <div>Exercise not found</div>;
  }

  // Permission Check
  const isOwner = exercise.userId === session.user.id;
  const isAdmin = session.user.email === ADMIN_EMAIL;
  
  if (!isOwner && !isAdmin) {
      return <div className="text-white">You are not authorized to edit this exercise.</div>;
  }

  const updateAction = updateExercise.bind(null, exercise.id);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Edit Exercise</h1>
      
      <form action={updateAction} className="w-full max-w-md flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input 
            name="name" 
            type="text" 
            required
            defaultValue={exercise.name}
            className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 focus:border-yellow-400 focus:outline-none"
          />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1">Target Muscles</label>
            <div className="grid grid-cols-2 gap-2 bg-zinc-900 p-2 rounded border border-zinc-700">
                {EXERCISE_TYPES.map(t => (
                    <label key={t} className="flex items-center space-x-2 cursor-pointer">
                        <input 
                            type="checkbox" 
                            name="types" 
                            value={t} 
                            defaultChecked={exercise.types?.includes(t)}
                            className="accent-yellow-400"
                        />
                        <span className="text-sm capitalize">{t}</span>
                    </label>
                ))}
            </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">YouTube Video ID (Optional)</label>
          <input 
            name="youtube" 
            type="text" 
            defaultValue={exercise.youtube || ""}
            className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 focus:border-yellow-400 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Info / Notes (Optional)</label>
          <textarea 
            name="info" 
            defaultValue={exercise.info || ""}
            className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 focus:border-yellow-400 focus:outline-none"
            rows={3}
          />
        </div>

        <button 
          type="submit" 
          className="bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition mt-4"
        >
          Update Exercise
        </button>
      </form>
    </div>
  );
}
