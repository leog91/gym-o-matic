import { Exercise } from "../types/constants";

export const exercises: Record<string, Exercise> = {

    bike: { id: "bike", name: "Bike", type: ["cardio"] },
    treadmill: { id: "treadmill", name: "Treadmill", type: ["cardio"] },
    bench_press: { id: "bench_press", name: "Bench Press", type: ["chest"] },
    squat: { id: "squat", name: "Squat", type: ["leg"], info: "careful", youtube: "nhoikoUEI8U" },
    pull_up: { id: "pull_up", name: "Pull Up", type: ["back"] },
    shoulder_press: { id: "shoulder_press", name: "Shoulder Press", type: ["shoulder"] },
    deadlift: { id: "deadlift", name: "Deadlift", type: ["leg", "core"] },
    planche: { id: "planche", name: "Planche", type: ["core", "calisthenics"] },
    barbell_row: { id: "barbell_row", name: "Barbell Row", type: ["back", "core"] },
    shoulder_band: {
        id: "shoulder_band",
        name: "Shoulder Band", type: ["shoulder", "warm up"]
    },
    squat_sky_reach: {
        id: "squat_sky_reach",
        name: "Squat Sky Reach", type: ["warm up"]
    },
    deadbugs: {
        id: "deadbugs",
        name: "Deadbugs", type: ["warm up"]
    },
    finger_pulse: {
        id: "finger_pulse",
        name: "Finger Pulse", type: ["warm up", "wrist"]
    },
    palm_pulse: {
        id: "palm_pulse",
        name: "Palm Pulse", type: ["warm up", "wrist"]
    },
    side_to_side_palm_rotations: {
        id: "side_to_side_palm_rotations",
        name: "Side-to-Side Palm Rotations", type: ["warm up", "wrist"]
    },
    elbow_rotations: {
        id: "elbow_rotations",
        name: "Elbow Rotations(hands flat on ground facing forward)", type: ["warm up", "wrist"]
    },

    side_to_side_wrist_Stretch: {
        id: "side_to_side_wrist_Stretch",
        name: "Side-to-Side Wrist Stretch", type: ["warm up", "wrist"]
    },
    rear_facing_wrist_stretch_palms_down: {
        id: "rear_facing_wrist_stretch_palms_down",
        name: "Rear Facing Wrist Stretch - Palms Down", type: ["warm up", "wrist"]
    },
    rear_facing_wrist_stretch_palms_up: {
        id: "rear_facing_wrist_stretch_palms_up",
        name: "Rear Facing Wrist Stretch - Palms Up", type: ["warm up", "wrist"]
    },
    rear_facing_elbow_rotations: {
        id: "rear_facing_elbow_rotations",
        name: "Rear Facing Elbow Rotations", type: ["warm up", "wrist"]
    },
    forward_facing_wrist_stretch: {
        id: "forward_facing_wrist_stretch",
        name: "Forward Facing Wrist Stretch", type: ["warm up", "wrist"]
    },

    plank: {
        id: "plank",
        name: "Plank", type: ["warm up", "core"]
    },
    side_plank: {
        id: "side_plank",
        name: "Side Plank", type: ["warm up", "core"]
    },

    reverse_plank: {
        id: "reverse_plank",
        name: "Reverse Plank", type: ["warm up", "core"]
    },
    hollow_plank: {
        id: "hollow_plank",
        name: "Hollow Plank", type: ["warm up", "core"]
    },

    arch_hold: {
        id: "arch_hold",
        name: "Arch Hold", type: ["warm up", "core"]
    },

    support_hold: {
        id: "support_hold",
        name: "Support Hold", type: ["warm up", "core"]
    },

    handstand: {
        id: "handstand",
        name: "Handstand", type: ["warm up",]
    },

    push_ups: {
        id: "push_ups",
        name: "Push Ups", type: ["chest"]
    },
    rows: {
        id: "rows",
        name: "Rows", type: ["back"]
    },
    l_sit: {
        id: "l_sit",
        name: "L-Sit", type: ["leg", "core"]
    },
    dips: {
        id: "dips",
        name: "Dips", type: ["triceps"]
    },


};
