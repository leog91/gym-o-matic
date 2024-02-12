
import exercises from "../../db/exercises.json"
import routines from "../../db/routines.json"

import { Exercise } from "../../types/constants"



//transform routines
// console.log(
//   "dddd Routine",
//   JSON.stringify(
//     Object.entries(allRoutines)
//       .map((rs) => rs[1])
//       .map((r) => {
//         return {
//           ...r,
//           steps: r.steps.map((s) => {
//             return { ...s, exercises: s.exercises.map((e) => e.id) };
//           }),
//         };
//       })
//   )
// );


//to-do
//const notUsedExercises = ():Exercises[]  => 



export type ExerciseResponse = { data: Exercise | null, status: string }



export const getExerciseById = (id: string): ExerciseResponse => {

    const exercise: Exercise | undefined = exercises.find(e => e.id === id)

    if (!exercise) {
        console.log(`exercise ${id} notFound`)
        return { status: `exercise ${id} notFound`, data: null }
    }
    return { status: "ok", data: exercise }
}





type Routine = {
    id: string;
    name: string;
    info?: string | undefined;
    steps: {
        exercises: ExerciseResponse[];
        id: string;
        name?: string;
        info?: string;
        p_index: number
    }[];

}


export type RoutineResponse =
    {
        //vv check vv
        data?: Routine,
        status: string
    }





//add exercise
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
//


//steps=>parts


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

export const buildRoutine = (id: string): RoutineResponse => {



    const allRoutines: RoutineWithoutFullExercise[] = routines

    const draftRoutine = allRoutines.find(e => e.id === id)

    if (!draftRoutine) {
        console.log(`routine ${id} notFound`)
        // return { msg: `routine ${id} notFound` }

        return { status: `routine ${id} notFound` }

    }

    const routine = {
        ...draftRoutine, steps: draftRoutine.steps
            .map(s => {
                return {
                    ...s, exercises: s.exercises
                        .map(e => getExerciseById(e))
                }
            })
    }
    return { data: routine, status: "ok" }




}