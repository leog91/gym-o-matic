
import { db } from "../db";
import { exercises as exercisesTable, routines as routinesTable, routineSteps, stepExercises } from "../db/schema";
import { eq, asc } from "drizzle-orm";
import { Exercise } from "../types/constants";

export type ExerciseResponse = { data: Exercise | null, status: string }

export const getExerciseById = async (id: string): Promise<ExerciseResponse> => {
    try {
        const exercise = await db.query.exercises.findFirst({
            where: eq(exercisesTable.id, id),
        });

        if (!exercise) {
            console.log(`exercise ${id} notFound`)
            return { status: `exercise ${id} notFound`, data: null }
        }

        // Map DB result (types) to Exercise type (type)
        const exerciseData = {
            ...exercise,
            type: exercise.types
        };

        return { status: "ok", data: exerciseData as unknown as Exercise }
    } catch (e) {
        console.error(e);
        return { status: "error", data: null };
    }
}

type RoutineSteps = {
    exercises: ExerciseResponse[];
    id: string;
    name?: string;
    info?: string;
    p_index: number
}[];

type Routine = {
    id: string;
    name: string;
    info?: string | undefined;
    steps: RoutineSteps;
}

export type RoutineResponse = {
    data?: Routine,
    status: string
}

// Types for form handling (kept from original)
export type PartsExercise = { index: number; exercise: string };
export type PartsExercises = PartsExercise[];
export type Part = {
    id: string;
    name: string;
    exercises: PartsExercises;
    p_index: number;
};
export type RoutineStructure = {
    routine: string;
    parts: Part[];
};

export type RoutineWithoutFullExercise = {
    steps: {
        exercises: string[];
        id: string;
        name?: string;
        p_index: number;
        info?: string;
    }[];
    id: string;
    name: string;
    info?: string | undefined;
}

export const buildRoutine = async (id: string): Promise<RoutineResponse> => {
    try {
        const routineData = await db.query.routines.findFirst({
            where: eq(routinesTable.id, id),
            with: {
                steps: {
                    orderBy: asc(routineSteps.order),
                    with: {
                        exercises: {
                            orderBy: asc(stepExercises.order),
                            with: {
                                exercise: true
                            }
                        }
                    }
                }
            }
        });

        if (!routineData) {
            console.log(`routine ${id} notFound`)
            return { status: `routine ${id} notFound` }
        }

        // Map DB result to expected Routine structure
        // DB structure for steps[i].exercises[j] is { exercise: { ... }, order: ... }
        // Expected structure is ExerciseResponse (which contains data: Exercise)

        const mappedSteps = routineData.steps.map((step, index) => ({
            id: step.id,
            name: step.name || undefined,
            info: step.info || undefined,
            p_index: step.order, // Map order to p_index (or index)
            exercises: step.exercises.map(exJoin => {
                const ex = exJoin.exercise;
                if (!ex) return { status: "error", data: null as any };
                return {
                    status: "ok",
                    data: {
                        ...ex,
                        type: ex.types // Map types -> type
                    } as unknown as Exercise
                };
            })
        }));

        const routine: Routine = {
            id: routineData.id,
            name: routineData.name,
            info: routineData.info || undefined,
            steps: mappedSteps
        };

        return { data: routine, status: "ok" };

    } catch (e) {
        console.error(e);
        return { status: "error" };
    }
}