import type { InferSelectModel } from "drizzle-orm";
import { pgTableCreator, serial, timestamp } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `potr-timetracker_${name}`);

export const entries = createTable("entries", {
	id: serial("id").primaryKey(),
	start: timestamp("start").notNull(),
	end: timestamp("end"),
});

export type TEntry = InferSelectModel<typeof entries>;
