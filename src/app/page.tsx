import BG from "~/components/BG";
import getEntries from "~/server/queries/entries";
import { CheckInForm, CheckOutForm } from "../components/Form";
import WorkLogs from "../components/WorkLogs";

export default async function Home() {
	const entries = await getEntries();
	const openEntries = entries.filter((entry) => !entry.end);
	const closedEntries = entries.filter((entry) => entry.end);

	const formHeight = openEntries.length ? 136 : 96;

	return (
		<BG className="flex h-screen min-h-screen relative bg-cyan-600">
			<div
				className="w-full z-10"
				style={{ marginTop: `calc(100vh - ${formHeight}px)` }}
			>
				{!openEntries.length && <CheckInForm />}
				{openEntries.map((entry) => (
					<CheckOutForm entry={entry} key={entry.id} />
				))}
				<WorkLogs entries={closedEntries} />
			</div>
		</BG>
	);
}
