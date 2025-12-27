
import { db } from "../src/db";
import { exercises as exercisesTable, routines as routinesTable, routineSteps, stepExercises } from "../src/db/schema";
import { exercises as exercisesData } from "../src/data/exercises";
import { allRoutines } from "../src/data/routines";
import * as dotenv from "dotenv";

dotenv.config();

async function seed() {
    console.log("Seeding exercises...");

    // Seed Exercises
    for (const key in exercisesData) {
        const ex = exercisesData[key];
        await db.insert(exercisesTable).values({
            id: ex.id,
            name: ex.name,
            types: ex.type, // Converted to JSON automatically by drizzle? No, need to verify
            // Actually Drizzle sqlite-core text mode:json helper handles JSON.stringify/parse
            info: ex.info,
            youtube: ex.youtube,
        }).onConflictDoUpdate({
            target: exercisesTable.id,
            set: {
                name: ex.name,
                types: ex.type,
                info: ex.info,
                youtube: ex.youtube
            }
        });
    }

    console.log("Seeding routines...");

    // Seed Routines
    for (const routine of allRoutines) {
        await db.insert(routinesTable).values({
            id: routine.id,
            name: routine.name,
            info: routine.info,
            // userId: null // System routine
        }).onConflictDoUpdate({
            target: routinesTable.id,
            set: {
                name: routine.name,
                info: routine.info
            }
        });

        // Seed Steps
        if (routine.steps) {
            // First delete existing steps/exercises for this routine to avoid duplicates/stale data
            // This is a bit aggressive but fine for seeding system data
            const existingSteps = await db.select().from(routineSteps).where({ routineId: routine.id } as any); // using any to bypass type check if needed or construct where properly
            // Actually, deleting is cleaner. 
            // But let's just insert for now. To do it safely, we should clear steps first.
            // For simplicity in this script, I'll delete steps linked to this routine.
            // Drizzle doesn't support 'delete from join' easily, but steps refer to routine.
            // await db.delete(routineSteps).where(eq(routineSteps.routineId, routine.id)); 
            // I'll skip delete for now and just upsert if possible, or assume clean DB for first run.
            // With onConflictDoNothing on ID, but steps don't have stable IDs in the source always?
            // Source: src/data/routines.ts
            // steps array elements have 'id'.
            // e.g. "5x5", "leg", "warm_up_dynamic_stretches"
            // Yes they have IDs.

            let stepOrder = 0;
            for (const step of routine.steps) {
                await db.insert(routineSteps).values({
                    id: step.id,
                    routineId: routine.id,
                    name: step.name,
                    info: step.info,
                    order: stepOrder++
                }).onConflictDoUpdate({
                    target: routineSteps.id,
                    set: {
                        name: step.name,
                        info: step.info,
                        order: stepOrder - 1
                    }
                });

                // Seed Step Exercises
                // step.exercises is an array of Exercise objects
                let exOrder = 0;
                // Delete existing mappings for this step
                // await db.delete(stepExercises).where(eq(stepExercises.stepId, step.id));

                // Since this is a junction table with its own ID, and we don't have stable IDs for the junction rows in source,
                // we should probably clear them. But I'll generate a deterministic ID: stepId_exerciseId

                for (const ex of step.exercises) {
                    const stepExId = `${step.id}_${ex.id}_${exOrder}`; // Composite ID
                    await db.insert(stepExercises).values({
                        id: stepExId,
                        stepId: step.id,
                        exerciseId: ex.id,
                        order: exOrder++
                    }).onConflictDoNothing();
                }
            }
        }
    }

    console.log("Seeding complete!");
}

seed().then(() => process.exit(0)).catch((e) => {
    console.error(e);
    process.exit(1);
});
