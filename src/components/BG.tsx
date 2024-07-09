"use client";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import type { ReactNode } from "react";
import type { Random } from "unsplash-js/dist/methods/photos/types";
import { cn } from "~/lib/utils";

const queryClient = new QueryClient();

type TBGProps = { className?: string; children: ReactNode };
export function BG({ className, children }: TBGProps) {
	const { data: image } = useQuery<Random>({
		queryKey: ["image"],
		queryFn: () => fetch("/api/image").then((res) => res.json()),
	});

	let backgroundImage = "";
	if (image) {
		backgroundImage = `url(${image.urls.regular}), url(${image.urls.small}), url(${image.urls.thumb})`;
	}

	return (
		<div
			className={cn(
				className,
				"h-screen overflow-y-scroll overscroll-y-none bg-cover bg-center bg-no-repeat bg-fixed relative",
			)}
			style={{
				backgroundImage,
				boxShadow: "inset 0 0 30px 0px rgba(0,0,0,0.5)",
				perspective: 1,
			}}
		>
			<div
				className="w-full flex flex-col justify-items-center gap-2 text-center absolute"
				style={{ transform: "translate3d(0px, -600%, -3px) scale(4)" }}
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
						timeZone: "America/Vancouver",
					})}
				</h1>
				<h2
					className="text-2xl font-semibold capitalize text-slate-100"
					style={{
						textShadow:
							"0px 0px 2px #000,0px 0px 2px #000,0px 0px 2px #000,0px 0px 2px #000,0px 1px 5px #000,0px 1px 5px #000",
					}}
				>
					{new Date().toLocaleString("ru", {
						hour: "numeric",
						minute: "numeric",
						timeZone: "America/Vancouver",
					})}
				</h2>
			</div>

			{children}
		</div>
	);
}

export default function BGWrapper(props: TBGProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<BG {...props} />
		</QueryClientProvider>
	);
}
