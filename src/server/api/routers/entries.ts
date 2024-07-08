import { and, eq, isNull } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { entries } from "~/server/db/schema";

export const entriesRouter = createTRPCRouter({
	list: publicProcedure.query(async ({ ctx }) => {
		const history = await ctx.db.query.entries.findMany({
			orderBy: (entries, { desc }) => [desc(entries.start)],
			limit: 1000,
		});
		return history;
	}),

	create: publicProcedure
		.input(z.object({ start: z.date() }))
		.mutation(async ({ ctx, input }) => {
			console.log("Crate!!!", input);
			const lastOpenEntry = await ctx.db.query.entries.findFirst({
				orderBy: (entries, { desc }) => [desc(entries.start)],
				where: (entries, { isNull }) => isNull(entries.end),
			});
			if (lastOpenEntry)
				throw new Error(
					"Cannot create new entry while old entry is still open",
				);

			return await ctx.db.insert(entries).values({
				start: input.start,
			});
		}),

	update: publicProcedure
		.input(
			z
				.object({
					id: z.number(),
					start: z.date().optional(),
					end: z.date().optional(),
				})
				.partial({ start: true, end: true })
				.refine(
					(data) => data.start || data.end,
					"Either start or end should be filled in.",
				),
		)
		.mutation(async ({ ctx, input }) => {
			console.log("Mutation!!!", input);
			return await ctx.db
				.update(entries)
				.set(input)
				.where(eq(entries.id, input.id));
		}),
});
