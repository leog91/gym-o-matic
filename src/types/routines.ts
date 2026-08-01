export type StandardPrescription = {
  kind: "standard";
  sets: number;
  reps: string;
  weight?: string;
  restSeconds?: number;
};

export type PyramidSet = {
  reps: string;
  weight?: string;
};

export type PyramidPrescription = {
  kind: "pyramid";
  sets: PyramidSet[];
  restSeconds?: number;
};

export type ExercisePrescription =
  | StandardPrescription
  | PyramidPrescription;

export type PartExecution = "straight" | "superset" | "circuit";
