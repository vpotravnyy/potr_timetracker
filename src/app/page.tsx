import BG from "~/components/BG";
import getEntries from "~/server/queries/entries";
import { CheckInForm, CheckOutForm } from "../components/Form";
import WorkLogs from "../components/WorkLogs";

export default async function Home() {
	const entries = await getEntries();
	const openEntries = entries.filter((entry) => !entry.end);
	const closedEntries = entries.filter((entry) => entry.end);

	return (
		<BG className="flex h-screen min-h-screen relative bg-cyan-600">
			<div
				className="bg-slate-100 absolute bottom-0 left-0 right-0 rounded-t-xl p-6"
				style={{ boxShadow: "0 0 15px 5px #000" }}
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
