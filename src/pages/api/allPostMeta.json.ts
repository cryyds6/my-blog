import { getAllPostMeta } from "@/utils/all-post-meta";

export async function GET(): Promise<Response> {
	const allPostsData = await getAllPostMeta();

	return new Response(JSON.stringify(allPostsData));
}
