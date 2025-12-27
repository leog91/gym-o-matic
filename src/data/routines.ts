import { Step, Routine } from "../../types/constants";
import { exercises } from "./exercises";


// copy Routines from photo

//db/routines.ts





export const fiveXFive: Routine =
{
    id: "fiveXFive",
    name: "fiveXFive",
    steps: [{
        name: "5x5",
        id: "5x5",
        exercises: [
            exercises.squat,
            exercises.bench_press,
            exercises.deadlift,
            exercises.shoulder_press,
            exercises.barbell_row
        ],
    }],
    info: "2 days routine test"
}








export const leg: Routine =
{
    id: "leg",
    name: "Leg",
    steps: [{
        // name: "leg",
        id: "leg",
        exercises: [
            exercises.deadlift,
            exercises.squat
        ]
    }],
    info: "Leg routine Leg workouts engage the major muscle groups of your body"
}







export const fullBodyAtHome: Routine =
{
    id: "fullBodyAtHome",
    name: "Full Body at Home",
    steps: [{
        name: "Warm Up: Dynamic Stretches",
        id: "warm_up_dynamic_stretches",
        exercises: [
            exercises.shoulder_band,
            exercises.squat_sky_reach,
            exercises.deadbugs,
        ]
    }, {
        name: "Warm Up: Static bodyline drills",
        id: "warm_up_static_bodyline_drills",
        exercises: [
            exercises.plank,
            exercises.side_plank,
            exercises.reverse_plank,
            exercises.hollow_plank,
            exercises.arch_hold,
        ]

    }, {
        name: "Skill Work",
        id: "skill_work",
        exercises: [
            exercises.support_hold,
            exercises.handstand,
        ]
    }, {
        name: "Strength Work",
        id: "strength_work",
        info: "3 sets of 8 reps.",
        exercises: [
            exercises.push_ups,
            exercises.rows,
            exercises.l_sit,
            exercises.squat,
            exercises.pull_up,
            exercises.dips
        ]
    }

    ],
    info: "2 days routine test"
}





export const testMulti: Routine = {
    id: "testMulti",
    name: "Test Multi",
    steps: [{
        name: "Leg",
        id: "leg",
        info: "Leg routine Leg workouts engage the major muscle groups of your body",
        exercises: [
            exercises.deadlift,
            exercises.squat
        ]
    }, {
        name: "Core",
        id: "core",
        exercises: [
            exercises.deadlift,
            exercises.barbell_row
        ]
    }],
    info: "2 days routine test"
}






// export const allRoutines: Routine[] = [fiveXFive, core, leg, fullBodyAtHome]

export const allRoutines: Routine[] = [fiveXFive, leg, fullBodyAtHome, testMulti]