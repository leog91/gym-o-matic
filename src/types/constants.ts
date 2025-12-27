













export const EXERCISE_TYPES = [
    "chest", "back", "shoulder", "leg", "core",
    "cardio", "calisthenics", "treadmill", "warm up",
    "wrist", "triceps", "glutes", "lower back"
] as const;


export type ExerciseType = typeof EXERCISE_TYPES[number];

export type Exercise = {
    name: string;
    type: string[];
    id: string,
    info?: string,
    youtube?: string
};


export type Step = {
    id: string,
    name?: string,
    exercises: Exercise[],
    info?: string

}

export type Routine = {
    id: string,
    name: string,
    steps: Step[],
    info?: string
}








export type DoneExercise = Exercise & { date: string };

