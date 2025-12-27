import React from "react";
import { db } from "../../../db";
import { routines } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { updateRoutine } from "../../../actions/routines";
import { auth } from "../../../auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import RoutineForm from "../../../components/RoutineForm";
import { buildRoutine, RoutineStructure } from "../../../utils/utils";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

export default async function EditRoutinePage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  const session = await auth.api.getSession({
      headers: await headers()
  });

  if (!session?.user) {
      redirect("/sign-in");
  }

  // Use buildRoutine to get full structure
  const routineRes = await buildRoutine(params.id);
  
  if (routineRes.status !== "ok" || !routineRes.data) {
       return <div className="text-white p-10">Routine not found</div>;
  }
  
  const routineData = routineRes.data;

  // Check DB for userId since buildRoutine response might not have it explicitly in the type definition if not updated
  // Actually buildRoutine returns `Routine` type which doesn't have userId.
  // We need to check ownership using separate query or update type.
  // Let's check explicitly for permissions.
  
  const routineMeta = await db.query.routines.findFirst({
        where: eq(routines.id, params.id)
  });
  
  if (!routineMeta) return <div>Error loading routine</div>;

  // Permission Check
  const isOwner = routineMeta.userId === session.user.id;
  const isAdmin = session.user.email === ADMIN_EMAIL;
  
  if (!isOwner && !isAdmin) {
      return <div className="text-white p-10">You are not authorized to edit this routine.</div>;
  }

  // Map Routine -> RoutineStructure for the form
  const initialStructure: RoutineStructure = {
      routine: routineData.name,
      info: routineData.info ?? "",
      parts: routineData.steps.map((s, index) => ({
          id: s.id, // Keep existing ID? Or generate new? 
          // If we want to keep IDs for updates, form needs to support it. 
          // My updateRoutine action currently deletes all steps and recreates them, 
          // so passing these IDs is fine (they won't be used for update-in-place, but for react keys).
          name: s.name || "",
          info: s.info ?? "",
          p_index: s.p_index,
          exercises: s.exercises.map((exRes, exIndex) => ({
              index: exIndex,
              exercise: exRes.data?.name || "Unknown" // Map back to name for the form input
          }))
      }))
  };

  const updateAction = async (data: RoutineStructure) => {
      "use server";
      await updateRoutine(params.id, data);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-yellow-400 mb-6">Edit Routine</h1>
      <RoutineForm 
          initialData={initialStructure}
          submitLabel="Update Routine"
          onSubmit={updateAction}
      />
    </div>
  );
}
