"use client";

import React, { useId, useState } from "react";
import {
  Part,
  PartsExercise,
  RoutineStructure,
} from "../utils/utils";
import { ExercisePrescription } from "../types/routines";

type RoutineFormProps = {
  initialData?: RoutineStructure;
  onSubmit: (data: RoutineStructure) => Promise<void>;
  submitLabel: string;
};

const standardPrescription = (): ExercisePrescription => ({
  kind: "standard",
  sets: 3,
  reps: "10",
});

const pyramidPrescription = (): ExercisePrescription => ({
  kind: "pyramid",
  sets: [{ reps: "12" }, { reps: "10" }, { reps: "8" }],
});

export default function RoutineForm({ initialData, onSubmit, submitLabel }: RoutineFormProps) {
  const firstPartId = useId();
  const [routineStructure, setRoutineStructure] = useState<RoutineStructure>(
    initialData || {
      routine: "",
      info: "",
      parts: [{
        id: firstPartId,
        name: "",
        info: "",
        execution: "straight",
        exercises: [{ index: 0, exercise: "" }],
        p_index: 0,
      }],
    }
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updatePart = (partId: string, update: (part: Part) => Part) => {
    setRoutineStructure((current) => ({
      ...current,
      parts: current.parts.map((part) => part.id === partId ? update(part) : part),
    }));
  };

  const updateExercise = (part: Part, index: number, update: (exercise: PartsExercise) => PartsExercise) => {
    updatePart(part.id, (currentPart) => ({
      ...currentPart,
      exercises: currentPart.exercises.map((exercise) => exercise.index === index ? update(exercise) : exercise),
    }));
  };

  const addExercise = (part: Part) => {
    updatePart(part.id, (currentPart) => ({
      ...currentPart,
      exercises: [...currentPart.exercises, { index: currentPart.exercises.length, exercise: "" }],
    }));
  };

  const addPart = () => {
    setRoutineStructure((current) => ({
      ...current,
      parts: [...current.parts, {
        id: crypto.randomUUID(),
        name: "",
        info: "",
        execution: "straight",
        exercises: [{ index: 0, exercise: "" }],
        p_index: current.parts.length,
      }],
    }));
  };

  const removeExercise = (part: Part, exerciseIndex: number) => {
    updatePart(part.id, (currentPart) => ({
      ...currentPart,
      exercises: currentPart.exercises
        .filter((exercise) => exercise.index !== exerciseIndex)
        .map((exercise, index) => ({ ...exercise, index })),
    }));
  };

  const removePart = (partId: string) => {
    setRoutineStructure((current) => ({
      ...current,
      parts: current.parts
        .filter((part) => part.id !== partId)
        .map((part, index) => ({ ...part, p_index: index })),
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(routineStructure);
    } catch (error) {
      if ((error as Error).message.includes("NEXT_REDIRECT")) return;
      console.error(error);
      alert("Error: " + (error as Error).message);
      setIsSubmitting(false);
    }
  };

  return (
    <form className="w-full max-w-xl flex flex-col gap-6" onSubmit={handleSubmit}>
      <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800 flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Routine Name</label>
          <input className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition-colors" required placeholder="e.g. Chest Day" value={routineStructure.routine} onChange={(event) => setRoutineStructure({ ...routineStructure, routine: event.target.value })} />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-400 mb-1">Routine Description (Optional)</label>
          <textarea className="w-full bg-zinc-900 text-white border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-yellow-400 transition-colors resize-none h-24" placeholder="Brief description of the routine..." value={routineStructure.info || ""} onChange={(event) => setRoutineStructure({ ...routineStructure, info: event.target.value })} />
        </div>

        <div className="flex flex-col gap-4">
          {routineStructure.parts.map((part, partIndex) => (
            <div key={part.id} className="bg-zinc-900 p-4 rounded-lg border border-zinc-800 relative">
              <button type="button" onClick={() => removePart(part.id)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-500 p-1 rounded-md transition-colors" title="Remove part">Remove</button>
              <div className="mb-4 pr-16">
                <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Part {partIndex + 1} Name (Optional)</label>
                <input className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm focus:outline-none focus:border-yellow-400" placeholder="e.g. Warm Up" value={part.name} onChange={(event) => updatePart(part.id, (current) => ({ ...current, name: event.target.value }))} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-500 mb-1">Execution</label>
                  <select className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm" value={part.execution} onChange={(event) => updatePart(part.id, (current) => ({ ...current, execution: event.target.value as Part["execution"] }))}>
                    <option value="straight">Straight sets</option>
                    <option value="superset">Superset</option>
                    <option value="circuit">Circuit</option>
                  </select>
                </div>
                {part.execution !== "straight" && <>
                  <div><label className="block text-xs font-medium text-zinc-500 mb-1">Rounds</label><input className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm" type="number" min="1" value={part.rounds || ""} onChange={(event) => updatePart(part.id, (current) => ({ ...current, rounds: Number(event.target.value) || undefined }))} /></div>
                  <div><label className="block text-xs font-medium text-zinc-500 mb-1">Rest after round</label><input className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm" placeholder="e.g. 60-90 sec" value={part.rest || ""} onChange={(event) => updatePart(part.id, (current) => ({ ...current, rest: event.target.value || undefined }))} /></div>
                </>}
              </div>
              {part.execution === "superset" && part.exercises.length !== 2 && <p className="mb-4 text-xs text-yellow-400">A superset needs exactly two exercises.</p>}
              {part.execution === "circuit" && part.exercises.length < 3 && <p className="mb-4 text-xs text-yellow-400">Add exercises until this circuit has at least three.</p>}
              <div className="mb-4">
                <label className="block text-xs font-medium text-zinc-500 mb-1 uppercase tracking-wider">Part {partIndex + 1} Description (Optional)</label>
                <textarea className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm focus:outline-none focus:border-yellow-400 resize-none h-16" placeholder="Brief description of this part..." value={part.info || ""} onChange={(event) => updatePart(part.id, (current) => ({ ...current, info: event.target.value }))} />
              </div>
              <div className="space-y-3">
                {part.exercises.map((exercise, exerciseIndex) => (
                  <div key={exercise.index} className="rounded-md border border-zinc-800 p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-zinc-500 text-sm font-mono w-6 text-right">{exerciseIndex + 1}.</span>
                      <input className="flex-1 bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm focus:outline-none focus:border-yellow-400" placeholder="Exercise name (e.g. Bench Press)" value={exercise.exercise} onChange={(event) => updateExercise(part, exercise.index, (current) => ({ ...current, exercise: event.target.value }))} required />
                      <button type="button" onClick={() => removeExercise(part, exercise.index)} className="text-zinc-500 hover:text-red-500 text-sm" title="Remove exercise">Remove</button>
                    </div>
                    {!exercise.prescription ? <button type="button" onClick={() => updateExercise(part, exercise.index, (current) => ({ ...current, prescription: standardPrescription() }))} className="mt-2 text-sm text-yellow-400 hover:text-yellow-300">+ Add training details</button> : <div className="mt-3 border-t border-zinc-800 pt-3">
                      <div className="flex justify-between items-center gap-3 mb-3"><label className="text-xs font-medium text-zinc-500">Training</label><div className="flex gap-3"><select className="bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm" value={exercise.prescription.kind} onChange={(event) => updateExercise(part, exercise.index, (current) => ({ ...current, prescription: event.target.value === "pyramid" ? pyramidPrescription() : standardPrescription() }))}><option value="standard">Standard sets</option><option value="pyramid">Pyramid</option></select><button type="button" onClick={() => updateExercise(part, exercise.index, (current) => ({ ...current, prescription: undefined }))} className="text-sm text-zinc-400 hover:text-white">Hide details</button></div></div>
                      {/* The enclosing branch guarantees a prescription; the nested pyramid branch needs the explicit guard for TypeScript. */}
                      {exercise.prescription.kind === "standard" ? <div className="grid grid-cols-2 sm:grid-cols-4 gap-2"><div><label className="block text-xs text-zinc-500 mb-1">Sets</label><input className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm" type="number" min="1" value={exercise.prescription.sets} onChange={(event) => updateExercise(part, exercise.index, (current) => current.prescription?.kind === "standard" ? ({ ...current, prescription: { ...current.prescription, sets: Number(event.target.value) || 1 } }) : current)} /></div><div><label className="block text-xs text-zinc-500 mb-1">Reps</label><input className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm" value={exercise.prescription.reps} onChange={(event) => updateExercise(part, exercise.index, (current) => current.prescription?.kind === "standard" ? ({ ...current, prescription: { ...current.prescription, reps: event.target.value } }) : current)} /></div><div><label className="block text-xs text-zinc-500 mb-1">Weight (optional)</label><input className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm" placeholder="20 kg" value={exercise.prescription.weight || ""} onChange={(event) => updateExercise(part, exercise.index, (current) => current.prescription?.kind === "standard" ? ({ ...current, prescription: { ...current.prescription, weight: event.target.value || undefined } }) : current)} /></div><div><label className="block text-xs text-zinc-500 mb-1">Rest (sec)</label><input className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm" type="number" min="0" value={exercise.prescription.restSeconds || ""} onChange={(event) => updateExercise(part, exercise.index, (current) => current.prescription?.kind === "standard" ? ({ ...current, prescription: { ...current.prescription, restSeconds: Number(event.target.value) || undefined } }) : current)} /></div></div> : <div className="space-y-2">{exercise.prescription.sets.map((set, setIndex) => <div key={setIndex} className="grid grid-cols-[auto_1fr_1fr_auto] items-end gap-2"><span className="text-xs text-zinc-500 pb-2">Set {setIndex + 1}</span><div><label className="block text-xs text-zinc-500 mb-1">Reps</label><input className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm" value={set.reps} onChange={(event) => updateExercise(part, exercise.index, (current) => current.prescription?.kind === "pyramid" ? ({ ...current, prescription: { ...current.prescription, sets: current.prescription.sets.map((item, index) => index === setIndex ? { ...item, reps: event.target.value } : item) } }) : current)} /></div><div><label className="block text-xs text-zinc-500 mb-1">Weight (optional)</label><input className="w-full bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm" placeholder="20 kg" value={set.weight || ""} onChange={(event) => updateExercise(part, exercise.index, (current) => current.prescription?.kind === "pyramid" ? ({ ...current, prescription: { ...current.prescription, sets: current.prescription.sets.map((item, index) => index === setIndex ? { ...item, weight: event.target.value || undefined } : item) } }) : current)} /></div><button type="button" className="text-xs text-zinc-500 hover:text-red-500 pb-2" onClick={() => updateExercise(part, exercise.index, (current) => current.prescription?.kind === "pyramid" ? ({ ...current, prescription: { ...current.prescription, sets: current.prescription.sets.filter((_, index) => index !== setIndex) } }) : current)} disabled={exercise.prescription?.kind === "pyramid" && exercise.prescription.sets.length === 1}>Remove</button></div>)}<div className="flex items-center gap-3"><button type="button" className="text-sm text-yellow-400 hover:text-yellow-300" onClick={() => updateExercise(part, exercise.index, (current) => current.prescription?.kind === "pyramid" ? ({ ...current, prescription: { ...current.prescription, sets: [...current.prescription.sets, { reps: "" }] } }) : current)}>+ Add set</button><label className="ml-auto text-xs text-zinc-500">Rest (sec) <input className="ml-1 w-20 bg-zinc-800 text-white border border-zinc-700 rounded-md p-2 text-sm" type="number" min="0" value={exercise.prescription.restSeconds || ""} onChange={(event) => updateExercise(part, exercise.index, (current) => current.prescription?.kind === "pyramid" ? ({ ...current, prescription: { ...current.prescription, restSeconds: Number(event.target.value) || undefined } }) : current)} /></label></div></div>}
                    </div>}
                  </div>
                ))}
              </div>
              <button type="button" onClick={() => addExercise(part)} className="mt-4 w-full py-2 border border-dashed border-zinc-700 text-zinc-400 rounded-md hover:border-yellow-400 hover:text-yellow-400 transition-colors text-sm">+ Add Exercise to Part</button>
            </div>
          ))}
        </div>
        <button type="button" onClick={addPart} className="w-full py-3 border border-zinc-700 bg-zinc-800 text-zinc-300 rounded-lg hover:bg-zinc-700 hover:text-white transition-colors text-sm font-medium">+ Add New Protocol Part</button>
      </div>
      <button type="submit" disabled={isSubmitting} className="w-full bg-yellow-400 text-black font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg shadow-yellow-400/20">{isSubmitting ? "Saving..." : submitLabel}</button>
    </form>
  );
}
