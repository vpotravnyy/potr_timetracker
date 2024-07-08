"use server";
import { revalidatePath } from "next/cache";
import { api } from "~/trpc/server";

export async function create(start: Date) {
	await api.entries.create({ start });
	revalidatePath("/");
}

export async function finish(id: number, end: Date) {
	await api.entries.update({ id: id, end });
	revalidatePath("/");
}
