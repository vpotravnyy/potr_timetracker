import Link from "next/link";

import { HydrateClient, api } from "~/trpc/server";
import CheckInForm from "./_components/CheckInForm";
import CheckOutForm from "./_components/CheckOutForm";
import WorkLogs from "./_components/WorkLogs";

export default async function Home() {
  const entries = await api.entries.list();
  const openEntries = entries.filter(entry => !entry.end)
  const closedEntries = entries.filter(entry => entry.end)

  console.log(entries, openEntries, closedEntries)

  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!openEntries.length && (
          <CheckInForm />
        )}
        {openEntries.map((entry) => (
          <CheckOutForm entry={entry} key={entry.id} />
        ))}
        <WorkLogs entries={closedEntries} />
      </main>
    </HydrateClient>
  );
}
