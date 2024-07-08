import { revalidatePath } from 'next/cache'
import { api } from "~/trpc/server";

export default function CheckInForm() {
    async function create(formData: FormData) {
        "use server"

        await api.entries.create({ start: new Date() })
        revalidatePath('/')
    }
    return <form action={create}>
        <button type="submit">Start</button>
    </form>
}