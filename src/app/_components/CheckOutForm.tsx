import { revalidatePath } from 'next/cache'
import type { TEntry } from "~/server/db/schema";
import { api } from "~/trpc/server";

export default function CheckOutForm({ entry }: { entry: TEntry }) {
    async function finish(formData: FormData) {
        "use server"

        await api.entries.update({ id: entry.id, end: new Date() })
        revalidatePath('/')
    }
    return <form action={finish}>
        <button type="submit">Finish</button>
    </form>
}