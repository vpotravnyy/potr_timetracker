import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

const millisecondsPerSecond = 1000;
const secondsPerMinute = 60;
const minutesPerHour = 60;
const hoursPerDay = 24;
const daysPerWeek = 7;
const relativeDateFormat = new Intl.RelativeTimeFormat("ru", {
	style: "short",
});

export function formatRelativeTime(createTime: Date) {
	const diff = +createTime - +new Date();
	const intervals = {
		week:
			millisecondsPerSecond *
			secondsPerMinute *
			minutesPerHour *
			hoursPerDay *
			daysPerWeek,
		day:
			millisecondsPerSecond * secondsPerMinute * minutesPerHour * hoursPerDay,
		hour: millisecondsPerSecond * secondsPerMinute * minutesPerHour,
		minute: millisecondsPerSecond * secondsPerMinute,
		second: millisecondsPerSecond,
	};
	for (const interval in intervals) {
		const i =
			intervals[interval as "week" | "day" | "hour" | "minute" | "second"];
		if (i <= Math.abs(diff)) {
			return relativeDateFormat.format(
				Math.trunc(diff / i),
				interval as "week" | "day" | "hour" | "minute" | "second",
			);
		}
	}
	return relativeDateFormat.format(diff / 1000, "second");
}

import { startOfWeek } from "date-fns";

export function chunkEventsByWeek<T extends { start: Date }>(
	events: T[],
): Record<string, T[]> {
	const eventsByWeek = {} as Record<string, T[]>;
	for (const event of events) {
		const weekKey = startOfWeek(event.start, { weekStartsOn: 1 }).toISOString();

		if (!eventsByWeek[weekKey]) {
			eventsByWeek[weekKey] = [];
		}
		eventsByWeek[weekKey]?.push(event);
	}

	return eventsByWeek;
}
