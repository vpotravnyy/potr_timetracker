import { createApi } from "unsplash-js";
import type { Random } from "unsplash-js/dist/methods/photos/types";

const patchedFetch = (input: RequestInfo | URL, options?: RequestInit) =>
	fetch(input, { next: { revalidate: 1800 }, ...(options ?? {}) });

export async function GET() {
	const unsplash = createApi({
		accessKey: "55DwZEdVpIVRdS5bnTulRGktCwfVSBjK6Omc7r1SkBo",
		fetch: patchedFetch,
	});

	const result = await unsplash.photos.getRandom({
		collectionIds: ["EGx2seoKYUc"],
	});

	return Response.json(result.response as Random, {
		headers: { "Cache-Control": "maxage=3600, stale-while-revalidate" },
	});
}
