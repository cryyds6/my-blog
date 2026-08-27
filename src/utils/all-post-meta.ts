import { getSortedPosts } from "@/utils/content-utils";

// 供 /api/allPostMeta.json endpoint 与日历页面 SSR 共用，避免页面自 fetch
export type AllPostMetaItem = {
	id: string;
	title: string;
	description: string;
	published: number;
	category: string;
	password: boolean;
};

export async function getAllPostMeta(): Promise<AllPostMetaItem[]> {
	const posts = await getSortedPosts();

	return posts
		.map((post) => ({
			id: post.id,
			title: post.data.title,
			description: post.data.description,
			published: post.data.published.getTime(),
			category: post.data.category || "",
			password: !!post.data.password,
		}))
		// 日历按纯日期排序，忽略置顶
		.sort((a, b) => b.published - a.published);
}
