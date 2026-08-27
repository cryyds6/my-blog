import { getHolidayEntries } from "@/utils/holiday-entries";

export type { HolidayEntry } from "@/utils/holiday-entries";

export async function GET(): Promise<Response> {
	const all = await getHolidayEntries();

	return new Response(JSON.stringify(all), {
		headers: { "Content-Type": "application/json" },
	});
}
