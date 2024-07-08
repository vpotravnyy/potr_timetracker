import type { ReactNode } from "react";
import { createApi } from "unsplash-js";
import type { ApiResponse } from "unsplash-js/dist/helpers/response";
import type { Random } from "unsplash-js/dist/methods/photos/types";
import { cn } from "~/lib/utils";

const patchedFetch = (input: RequestInfo | URL, options?: RequestInit) =>
	fetch(input, { next: { revalidate: 60 }, ...(options || {}) });

export async function getImage() {
	const unsplash = createApi({
		accessKey: "55DwZEdVpIVRdS5bnTulRGktCwfVSBjK6Omc7r1SkBo",
		fetch: patchedFetch,
	});

	const result = await unsplash.photos.getRandom({
		collectionIds: ["EGx2seoKYUc"],
	});

	return result.response as Random;
}

export default async function BG({
	className,
	children,
}: { className?: string; children: ReactNode }) {
	const image = await getImage();

	return (
		<div
			className={cn(
				className,
				"bg-cover bg-center bg-no-repeat flex flex-col justify-items-center gap-8 text-center pt-24",
			)}
			style={{
				backgroundImage: `url(${image.urls.regular}), url(${image.urls.small}), url(${image.urls.thumb})`,
				boxShadow: "inset 0 0 30px 0px rgba(0,0,0,0.5)",
			}}
		>
			<h1
				className="text-5xl font-semibold capitalize text-slate-100"
				style={{
					textShadow:
						"0px 0px 2px #000,0px 0px 2px #000,0px 0px 2px #000,0px 0px 2px #000,0px 1px 5px #000,0px 1px 5px #000",
				}}
			>
				{new Date().toLocaleDateString("ru", {
					day: "numeric",
					month: "long",
				})}
			</h1>
			{children}
		</div>
	);
}
