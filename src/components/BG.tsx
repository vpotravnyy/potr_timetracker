"use client";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";
import { type ReactNode, useEffect, useState } from "react";
import type { Random } from "unsplash-js/dist/methods/photos/types";
import { cn } from "~/lib/utils";

const queryClient = new QueryClient();

function getCurTime() {
	return new Date().toLocaleString("ru", {
		hour: "2-digit",
		minute: "2-digit",
		timeZone: "America/Vancouver",
	});
}

function getCurDate() {
	return new Date().toLocaleDateString("ru", {
		day: "numeric",
		month: "long",
		timeZone: "America/Vancouver",
	});
}

function getCurWeekday() {
	return new Date().toLocaleDateString("ru", {
		weekday: "long",
		timeZone: "America/Vancouver",
	});
}

type TBGProps = { className?: string; children: ReactNode };
export function BG({ className, children }: TBGProps) {
	const [time, setTime] = useState(getCurTime());
	const { data: image } = useQuery<Random>({
		queryKey: ["image"],
		queryFn: () => fetch("/api/image").then((res) => res.json()),
	});

	let backgroundImage = "";
	if (image) {
		backgroundImage = `url(${image.urls.regular}), url(${image.urls.small}), url(${image.urls.thumb})`;
	}

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(getCurTime());
		}, 60 * 1000);

		return () => clearInterval(interval);
	}, []);

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
				style={{
					transform: "translate3d(0px, -500%, -3px) scale(4)",
					textShadow:
						"0px 0px 2px #000,0px 0px 2px #000,0px 0px 2px #000,0px 0px 2px #000,0px 1px 5px #000,0px 1px 5px #000",
				}}
			>
				<h3 className="text-xl font-semibold capitalize text-slate-100">
					{getCurWeekday()}
				</h3>
				<h1 className="text-5xl font-semibold capitalize text-slate-100">
					{getCurDate()}
				</h1>
				<h2 className="text-2xl font-semibold capitalize text-slate-100">
					{time}
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
