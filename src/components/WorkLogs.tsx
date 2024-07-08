import type { TEntry } from "~/server/db/schema";

export default function WorkLogs({ entries }: { entries: TEntry[] }) {
	return (
		<pre style={{ display: "none" }}>{JSON.stringify(entries, null, 2)}</pre>
	);
}
