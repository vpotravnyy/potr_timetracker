"use client";
import { Loader2 } from "lucide-react";
import { revalidatePath } from "next/cache";
import { useState, useTransition } from "react";
import { cn, formatRelativeTime } from "~/lib/utils";
import { create, finish } from "~/server/actions/entries";
import type { TEntry } from "~/server/db/schema";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export type TFormProps = {
	onSubmit: (time: Date) => Promise<unknown>;
	entry?: TEntry;
	button: { className: string; text: string };
};
export function Form({ entry, onSubmit, button }: TFormProps) {
	const [time, setTime] = useState(
		new Date().toLocaleString("ru", {
			hour: "2-digit",
			minute: "2-digit",
		}),
	);
	const [hours, minutes] = time.split(":");
	const [isPending, startTransition] = useTransition();

	async function handleSubmit() {
		startTransition(async () => {
			const today = new Date();
			today.setHours(Number(hours));
			today.setMinutes(Number(minutes));
			today.setSeconds(0);
			await onSubmit(today);
		});
	}

	return (
		<form
			action={handleSubmit}
			className="p-6 bg-slate-100 rounded-t-xl border-b border-slate-300"
		>
			<div className="flex flex-col gap-4">
				{entry && (
					<div className="text-left">
						День начался в{" "}
						{entry.start.toLocaleString("ru", {
							hour: "numeric",
							minute: "2-digit",
						})}{" "}
						<span className="text-sm">({formatRelativeTime(entry.start)})</span>
					</div>
				)}
				<div className="flex flex-row justify-between">
					<Input
						type="time"
						name="time"
						className="text-lg h-12 w-32 text-center timeInput bg-slate-50"
						value={time}
						onChange={(e) => setTime(() => e.target.value)}
					/>
					<Button
						type="submit"
						disabled={isPending}
						size="lg"
						className={cn("text-lg h-12 w-32", button.className)}
					>
						{isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
						{button.text}
					</Button>
				</div>
			</div>
		</form>
	);
}

export function CheckInForm() {
	return (
		<Form
			onSubmit={(time) => create(time)}
			button={{
				text: "Начать",
				className: "bg-green-700",
			}}
		/>
	);
}

export function CheckOutForm({ entry }: { entry: TEntry }) {
	return (
		<Form
			entry={entry}
			onSubmit={(time) => finish(entry.id, time)}
			button={{
				text: "Закончить",
				className: "bg-red-700",
			}}
		/>
	);
}
