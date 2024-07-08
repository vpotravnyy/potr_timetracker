"use server";
import "server-only";
import { db } from "~/server/db";

export default async function getEntries() {
	return await db.query.entries.findMany({
		orderBy: (entries, { desc }) => [desc(entries.start)],
		limit: 1000,
	});
}
