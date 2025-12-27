import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const user = sqliteTable("user", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    emailVerified: integer("email_verified", { mode: "boolean" }).notNull(),
    image: text("image"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
    password: text("password"),
});

export const session = sqliteTable("session", {
    id: text("id").primaryKey(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    token: text("token").notNull().unique(),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: integer("access_token_expires_at", {
        mode: "timestamp",
    }),
    refreshTokenExpiresAt: integer("refresh_token_expires_at", {
        mode: "timestamp",
    }),
    scope: text("scope"),
    password: text("password"),
    createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
    createdAt: integer("created_at", { mode: "timestamp" }),
    updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const exercises = sqliteTable("exercises", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    types: text("types", { mode: "json" }).$type<string[]>(), // Store as JSON array
    info: text("info"),
    youtube: text("youtube"),
});

export const routines = sqliteTable("routines", {
    id: text("id").primaryKey(),
    name: text("name").notNull(),
    info: text("info"),
    userId: text("user_id").references(() => user.id, { onDelete: "cascade" }), // Nullable for system routines
    createdAt: integer("created_at", { mode: "timestamp" }).notNull().defaultNow(),
    updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().defaultNow(),
});

export const routineSteps = sqliteTable("routine_steps", {
    id: text("id").primaryKey(),
    routineId: text("routine_id")
        .notNull()
        .references(() => routines.id, { onDelete: "cascade" }),
    name: text("name"),
    info: text("info"),
    order: integer("order").notNull(),
});

export const stepExercises = sqliteTable("step_exercises", {
    id: text("id").primaryKey(),
    stepId: text("step_id")
        .notNull()
        .references(() => routineSteps.id, { onDelete: "cascade" }),
    exerciseId: text("exercise_id")
        .notNull()
        .references(() => exercises.id, { onDelete: "restrict" }),
    order: integer("order").notNull(),
});

// Relations
import { relations } from "drizzle-orm";

export const routinesRelations = relations(routines, ({ many }) => ({
    steps: many(routineSteps),
}));

export const routineStepsRelations = relations(routineSteps, ({ one, many }) => ({
    routine: one(routines, {
        fields: [routineSteps.routineId],
        references: [routines.id],
    }),
    exercises: many(stepExercises),
}));

export const stepExercisesRelations = relations(stepExercises, ({ one }) => ({
    step: one(routineSteps, {
        fields: [stepExercises.stepId],
        references: [routineSteps.id],
    }),
    exercise: one(exercises, {
        fields: [stepExercises.exerciseId],
        references: [exercises.id],
    }),
}));