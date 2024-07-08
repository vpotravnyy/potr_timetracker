"use server";
import "server-only";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "~/server/db";
import { entries } from "~/server/db/schema";

export async function create(start: Date) {
	const lastOpenEntry = await db.query.entries.findFirst({
		orderBy: (entries, { desc }) => [desc(entries.start)],
		where: (entries, { isNull }) => isNull(entries.end),
	});
	if (lastOpenEntry)
		throw new Error("Cannot create new entry while old entry is still open");

	await db.insert(entries).values({ start });
	revalidatePath("/");
}

export async function finish(id: number, end: Date) {
	console.log("In finish");
	await db.update(entries).set({ id, end }).where(eq(entries.id, id));
	revalidatePath("/");
}
