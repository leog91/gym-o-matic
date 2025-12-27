"use client";

import React from "react";
import { createExercise } from "../../actions/exercises";
import { ExerciseType, EXERCISE_TYPES } from "../../types/constants";


export default function AddExercise() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Add Exercise</h1>
      
      <form action={createExercise} className="w-full max-w-md flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input 
            name="name" 
            type="text" 
            required
            className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 focus:border-yellow-400 focus:outline-none"
            placeholder="e.g. Bench Press"
          />
        </div>

        <div>
            <label className="block text-sm font-medium mb-1">Target Muscles</label>
            <div className="grid grid-cols-2 gap-2 bg-zinc-900 p-2 rounded border border-zinc-700">
                {EXERCISE_TYPES.map(t => (
                    <label key={t} className="flex items-center space-x-2 cursor-pointer">
                        <input type="checkbox" name="types" value={t} className="accent-yellow-400"/>
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
            className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 focus:border-yellow-400 focus:outline-none"
            placeholder="e.g. nhoikoUEI8U"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Info / Notes (Optional)</label>
          <textarea 
            name="info" 
            className="w-full bg-zinc-900 border border-zinc-700 rounded p-2 focus:border-yellow-400 focus:outline-none"
            rows={3}
            placeholder="Tips, warnings, setup..."
          />
        </div>

        <button 
          type="submit" 
          className="bg-yellow-400 text-black font-bold py-2 rounded hover:bg-yellow-500 transition mt-4"
        >
          Create Exercise
        </button>
      </form>
    </div>
  );
}
