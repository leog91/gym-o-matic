import { sqliteTable, text, integer, primaryKey } from "drizzle-orm/sqlite-core";
import { relations } from "drizzle-orm";

export const user = sqliteTable("user", {
    id: text("id").primaryKey(),
    email: text("email").unique(),
    name: text("name"),
    email_verified: integer("email_verified").notNull().default(0),
    created_at: integer("created_at").notNull(),
    updated_at: integer("updated_at").notNull(),
});

export const account = sqliteTable("account", {
    id: text("id").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    type: text("type"),
    providerId: text("providerId").notNull(),
    providerAccountId: text("providerAccountId").notNull(),
    accessToken: text("accessToken"),
    refreshToken: text("refreshToken"),
    expiresAt: integer("expiresAt"),
    updatedAt: integer("updatedAt"),
});

export const session = sqliteTable("session", {
    id: text("id").primaryKey(),
    userId: text("userId")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    token: text("token"),
    expiresAt: integer("expiresAt"),
});

export const userRelations = relations(user, ({ many }) => ({
    accounts: many(account),
    sessions: many(session),
}));

export const accountRelations = relations(account, ({ one }) => ({
    user: one(user, { fields: [account.userId], references: [user.id] }),
}));

export const sessionRelations = relations(session, ({ one }) => ({
    user: one(user, { fields: [session.userId], references: [user.id] }),
}));
