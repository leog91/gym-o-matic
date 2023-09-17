















export type Exercise = { name: string; type: ExerciseType[]; id: string, info?: string };


export type ExerciseType =
    | "chest"
    | "back"
    | "shoulder"
    | "leg"
    | "core"
    | "cardio"
    | "calisthenics"
    | "treadmill"
    | "warm up"
    | "wrist"
    | "triceps"

    ;


export type Step = {
    id: string,
    name?: string,
    exercises: Exercise[],
    info?: string

}

export type Routine = {
    id: string,
    name: string,
    steps: Step[]
    info?: string
}








export type DoneExercise = Exercise & { date: string };

