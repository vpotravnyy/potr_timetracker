import "server-only";
import { createApi } from "unsplash-js";
import type { Random } from "unsplash-js/dist/methods/photos/types";
import { env } from "~/env";

const patchedFetch = (input: RequestInfo | URL, options?: RequestInit) =>
	fetch(input, { next: { revalidate: 1800 }, ...(options ?? {}) });

export async function GET() {
	const unsplash = createApi({
		accessKey: env.UNSTASH_API_KEY,
		fetch: patchedFetch,
	});

	const result = await unsplash.photos.getRandom({
		collectionIds: ["EGx2seoKYUc"],
	});

	return Response.json(result.response as Random, {
		headers: { "Cache-Control": "maxage=3600, stale-while-revalidate" },
	});
}
