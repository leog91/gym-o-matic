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

export default async function EditRoutinePage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const routineRes = await buildRoutine(params.id);

  if (routineRes.status !== "ok" || !routineRes.data) {
    return <div className="text-white p-10">Routine not found</div>;
  }

  const routineData = routineRes.data;

  const routineMeta = await db.query.routines.findFirst({
    where: eq(routines.id, params.id),
  });

  if (!routineMeta) return <div>Error loading routine</div>;

  // Permission Check
  const isOwner = routineMeta.userId === session.user.id;
  const isAdmin = session.user.email === ADMIN_EMAIL;

  if (!isOwner && !isAdmin) {
    return (
      <div className="text-white p-10">
        You are not authorized to edit this routine.
      </div>
    );
  }

  const initialStructure: RoutineStructure = {
    routine: routineData.name,
    info: routineData.info ?? "",
    parts: routineData.steps.map((s, index) => ({
      id: s.id,
      name: s.name || "",
      info: s.info ?? "",
      execution: s.execution,
      rounds: s.rounds,
      rest: s.rest,
      restSeconds: s.restSeconds,
      p_index: s.p_index,
      exercises: s.exercises.map((exRes, exIndex) => ({
        index: exIndex,
        exercise: exRes.data?.name || "Unknown",
        prescription: exRes.prescription,
      })),
    })),
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
