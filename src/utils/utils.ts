
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


// export const getExerciseById = (id: string): Exercise | { msg: string; } => {

//     const exercise = exercises.find(e => e.id === id) as Exercise

//     if (!exercise) {
//         console.log(`exercise ${id} notFound`)
//         return { msg: `exercise ${id} notFound` }
//     }
//     return exercise
// }

export const getExerciseById = (id: string): ExerciseResponse => {

    const exercise: Exercise | undefined = exercises.find(e => e.id === id)

    if (!exercise) {
        console.log(`exercise ${id} notFound`)
        return { status: `exercise ${id} notFound`, data: null }
    }
    return { status: "ok", data: exercise }
}





export type RoutineResponse =
    {
        data: {
            id: string;
            name: string;
            info?: string | undefined;
            steps: {
                exercises: ExerciseResponse[];
                id: string;
                name?: string;
                info?: string;
            }[];

        } | null,
        status: string
    }



// export type RoutineResponse =
//     {
//         id: string;
//         name: string;
//         info?: string | undefined;
//         steps: {
//             exercises: (Exercise | {
//                 msg: string;
//             })[];
//             id: string;
//             name?: string;
//             info?: string;
//         }[];

//     }

//     | { msg: string }

type RoutineWithoutStep = {
    steps: {
        exercises: string[];
        id: string;
        name?: string;
        info?: string;
    }[];
    id: string;
    name: string;
    info?: string | undefined;
}

export const buildRoutine = (id: string): RoutineResponse => {



    const allRoutines: RoutineWithoutStep[] = routines

    const draftRoutine = allRoutines.find(e => e.id === id)

    if (!draftRoutine) {
        console.log(`routine ${id} notFound`)
        // return { msg: `routine ${id} notFound` }

        return { status: `routine ${id} notFound`, data: null }

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