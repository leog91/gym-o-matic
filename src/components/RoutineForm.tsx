"use client";

import React, { useId, useState } from "react";
import {
  RoutineStructure,
  Part,
  PartsExercise,
  PartsExercises,
} from "../utils/utils";

type RoutineFormProps = {
    initialData?: RoutineStructure;
    onSubmit: (data: RoutineStructure) => Promise<void>;
    submitLabel: string;
};

export default function RoutineForm({ initialData, onSubmit, submitLabel }: RoutineFormProps) {
  const defaultState: RoutineStructure = {
    routine: "",
    info: "",
    parts: [
      {
         id: useId(),
        name: "",
        info: "",
        exercises: [{ index: 0, exercise: `` }], // Start empty
        p_index: 0,
      },
    ],
  };

  const [routineStructure, setRoutineStructure] = useState(initialData || defaultState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addExercise = (p: Part) => {
    const updatedParts = routineStructure.parts.map((part) => {
      if (part.id === p.id) {
        const newExerciseIndex = part.exercises.length;
        const newExercise = {
          index: newExerciseIndex,
          exercise: ``,
        };
        return {
          ...part,
          exercises: [...part.exercises, newExercise],
        };
      }
      return part;
    });

    setRoutineStructure({
      ...routineStructure,
      parts: updatedParts,
    });
  };

  const addPart = () => {
    const newPart: Part = {
      name: "",
      info: "",
      id: crypto.randomUUID(),
      exercises: [
        { index: 0, exercise: `` },
      ],
      p_index: routineStructure.parts.length,
    };

    const updatedParts = [...routineStructure.parts, newPart];

    setRoutineStructure({
      ...routineStructure,
      parts: updatedParts,
    });
  };

  const removeExercise = (p: Part, exerciseIndex: number) => {
    const updatedParts = routineStructure.parts.map((part) => {
      if (part.id === p.id) {
          // Re-index remaining exercises
        const remainingExercises = part.exercises
            .filter((e) => e.index !== exerciseIndex)
            .map((e, idx) => ({ ...e, index: idx }));
            
        return {
          ...part,
          exercises: remainingExercises,
        };
      }
      return part;
    });

    setRoutineStructure({
      ...routineStructure,
      parts: updatedParts,
    });
  };

  const removePart = (partId: string) => {
      // Re-index remaining parts
    const updatedParts = routineStructure.parts
      .filter((p) => p.id !== partId)
      .map((p, idx) => ({ ...p, p_index: idx }));

    setRoutineStructure({
      ...routineStructure,
      parts: updatedParts,
    });
  };

  const handlePartChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    p: Part,
    ip: number
  ) => {
    const newPart: Part = { ...p, name: e.target.value };

    const updatedParts: Part[] = [
      ...routineStructure.parts.filter((p) => p.id !== newPart.id),
      newPart,
    ].sort((a, b) => a.p_index - b.p_index);

    setRoutineStructure({
      ...routineStructure,
      parts: updatedParts,
    });
  };

  const handlePartInfoChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
    p: Part
  ) => {
    const newPart: Part = { ...p, info: e.target.value };

    const updatedParts: Part[] = [
      ...routineStructure.parts.filter((part) => part.id !== newPart.id),
      newPart,
    ].sort((a, b) => a.p_index - b.p_index);

    setRoutineStructure({
      ...routineStructure,
      parts: updatedParts,
    });
  };

  const handleExerciseChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    p: Part,
    exercise: PartsExercise
  ) => {
    const exercisesDraft: PartsExercises = [
      ...p.exercises.filter((e) => e.index !== exercise.index),
      { exercise: e.target.value, index: exercise.index },
    ].sort((a, b) => a.index - b.index);

    const updatedRoutineStructure: RoutineStructure = { ...routineStructure };
    const selectedPart = { ...updatedRoutineStructure.parts[p.p_index] };

    const newPart = { ...selectedPart, exercises: exercisesDraft };

    const updatedParts = [
      ...routineStructure.parts.filter((part) => part.id !== p.id),
      newPart,
    ].sort((a, b) => a.p_index - b.p_index);

    setRoutineStructure({
      ...routineStructure,
      parts: updatedParts,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
        await onSubmit(routineStructure);
    } catch (err) {
        if ((err as Error).message.includes("NEXT_REDIRECT")) {
            return;
        }
        console.error(err);
        alert("Error: " + (err as Error).message);
        setIsSubmitting(false);
    }
  };

  return (
      <form
        className="w-full max-w-xl flex flex-col gap-6"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 flex flex-col gap-4">
          <div>
             <label className="block text-sm font-medium text-zinc-400 mb-1">
               Routine Name
             </label>
             <input
               className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition-colors"
               name="routine_name"
               required
               placeholder="e.g. Chest Day"
               onChange={(e) =>
                 setRoutineStructure({
                   ...routineStructure,
                   routine: e.target.value,
                 })
               }
               value={routineStructure.routine}
               type="text"
             />
           </div>

           <div>
             <label className="block text-sm font-medium text-zinc-400 mb-1">
               Routine Description (Optional)
             </label>
             <textarea
               className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition-colors resize-none h-24"
               name="routine_info"
               placeholder="Brief description of the routine..."
               onChange={(e) =>
                 setRoutineStructure({
                   ...routineStructure,
                   info: e.target.value,
                 })
               }
               value={routineStructure.info || ""}
             />
           </div>
           
           <div className="flex flex-col gap-4">
             {routineStructure.parts.map((p, ip) => (
               <div key={p.id} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 relative group">
                 {/* Remove Part Button */}
                 <button 
                    type="button" 
                    onClick={() => removePart(p.id)}
                    className="absolute top-2 right-2 text-zinc-600 hover:text-red-500 p-1 rounded-md transition-colors"
                    title="Remove Part"
                 >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                 </button>

                 <div className="mb-4 pr-8"> 
                   <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">
                     Part {ip + 1} Name (Optional)
                   </label>
                   <input
                     className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                     type="text"
                     placeholder="e.g. Warm Up"
                     value={p.name}
                     onChange={(e) => handlePartChange(e, p, ip)}
                     name={`P_${ip}`}
                   />
                 </div>

                 <div className="mb-4 pr-8">
                   <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">
                     Part {ip + 1} Description (Optional)
                   </label>
                   <textarea
                     className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm focus:outline-none focus:border-yellow-400 transition-colors resize-none h-16"
                     placeholder="Brief description of this part..."
                     value={p.info || ""}
                     onChange={(e) => handlePartInfoChange(e, p)}
                     name={`P_${ip}_info`}
                   />
                 </div>

                 <div className="space-y-3">
                   {p.exercises.map((e, i) => (
                     <div
                       key={i}
                       className="flex items-center gap-3 group/exercise"
                     >
                       <span className="text-zinc-500 text-sm font-mono w-6 text-right">{i + 1}.</span>
                       <input
                         className="flex-1 bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                         placeholder="Exercise name (e.g. Bench Press)"
                         onChange={
                           (event) => handleExerciseChange(event, p, e)
                         }
                         value={e.exercise}
                         name={`P${ip}_E_${i}`}
                         type="text"
                         required
                       />
                       <button
                         type="button"
                         onClick={() => removeExercise(p, e.index)}
                         className="text-zinc-600 hover:text-red-500 p-1 opacity-100 sm:opacity-0 sm:group-hover/exercise:opacity-100 transition-all"
                         title="Remove Exercise"
                         tabIndex={-1}
                       >
                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                     </svg>
                       </button>
                     </div>
                   ))}
                 </div>
                 
                 <button
                   type="button"
                   onClick={() => addExercise(p)}
                   className="mt-4 w-full py-2 border border-dashed border-zinc-700 text-zinc-400 rounded-md hover:border-yellow-400 hover:text-yellow-400 transition-colors text-sm flex items-center justify-center gap-2"
                 >
                   <span>+ Add Exercise to Part</span>
                 </button>
               </div>
             ))}
           </div>

           <button
             type="button"
             onClick={() => addPart()}
             className="w-full py-3 border border-zinc-700 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 hover:text-white transition-colors text-sm font-medium"
           >
             + Add New Protocol Part
           </button>
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting} 
          className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg shadow-yellow-400/20"
        >
          {isSubmitting ? (
              <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"/>
                  <span>Saving...</span>
              </div>
          ) : submitLabel}
        </button>
      </form>
  );
}
