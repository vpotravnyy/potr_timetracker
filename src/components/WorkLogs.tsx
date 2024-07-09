import { differenceInWeeks, startOfWeek } from "date-fns";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import { chunkEventsByWeek } from "~/lib/utils";
import type { TEntry } from "~/server/db/schema";

const MS_IN_MINUTE = 60 * 1000;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;

function calcDiff(entry: TEntry) {
	const ms = +(entry.end ?? new Date()) - +entry.start;
	const hours = Math.floor(ms / MS_IN_HOUR);
	const minutes = Math.floor(
		(ms - hours * MS_IN_HOUR) / MS_IN_MINUTE,
	).toString();
	const dollars = (25 * ms) / MS_IN_HOUR;

	return {
		hours: hours.toString(),
		minutes: minutes.length === 1 ? `0${minutes}` : minutes,
		dollars,
	};
}

export default function WorkLogs({ entries }: { entries: TEntry[] }) {
	const weeks = chunkEventsByWeek(entries);
	const thisWeekStart = startOfWeek(new Date());

	return (
		<div className="p-6 bg-slate-100 text-center">
			{Object.entries(weeks).map(([week, weekEntries]) => {
				const weekStart = new Date(week);
				let weekTitle = `Неделя от ${weekStart.toLocaleDateString("ru", { day: "numeric", month: "short" })}`;
				const weeksAgo = differenceInWeeks(thisWeekStart, weekStart);
				if (weeksAgo === 0) weekTitle = "Эта неделя";
				if (weeksAgo === 1) weekTitle = "Прошлая неделя";
				if (weeksAgo === 2) weekTitle = "Позапрошлая неделя";

				const total = weekEntries.reduce(
					(acc, entry) => acc + calcDiff(entry).dollars,
					0,
				);

				const weekEntriesSorted = weekEntries.sort(
					(a, b) => a.start.getTime() - b.start.getTime(),
				);

				return (
					<div key={week}>
						<h3 className="text-xl mb-2">{weekTitle}</h3>
						<Table className="bg-slate-50 mb-6">
							<TableHeader>
								<TableRow>
									<TableHead className="w-[100px] text-left">День</TableHead>
									<TableHead className="text-center">Время</TableHead>
									<TableHead className="w-[100px] text-right">Сумма</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody className="text-xs">
								{weekEntriesSorted.map((entry) => {
									const { hours, minutes, dollars } = calcDiff(entry);
									return (
										<TableRow key={entry.id}>
											<TableCell className="font-medium text-left text-nowrap">
												{entry.start.toLocaleDateString("ru", {
													weekday: "short",
													day: "numeric",
													month: "short",
													timeZone: "America/Vancouver",
												})}
											</TableCell>
											<TableCell className="font-medium text-center text-nowrap">
												{entry.start.toLocaleString("ru", {
													hour: "numeric",
													minute: "numeric",
													timeZone: "America/Vancouver",
												})}
												{"-"}
												{entry.end?.toLocaleString("ru", {
													hour: "numeric",
													minute: "numeric",
													timeZone: "America/Vancouver",
												})}{" "}
												({hours}:{minutes})
											</TableCell>
											<TableCell className="text-right text-nowrap">
												${dollars.toFixed(2)}
											</TableCell>
										</TableRow>
									);
								})}
							</TableBody>
							<TableFooter className="bg-slate-200">
								<TableRow>
									<TableCell colSpan={2} className="text-left">
										Итого
									</TableCell>
									<TableCell className="text-right">
										${total.toFixed(2)}
									</TableCell>
								</TableRow>
							</TableFooter>
						</Table>
					</div>
				);
			})}
		</div>
	);
}
