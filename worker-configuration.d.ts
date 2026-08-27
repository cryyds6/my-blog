/// <reference types="@cloudflare/workers-types" />

declare global {
	interface Env {
		ASSETS: Fetcher;
		NODE_VERSION?: string;
	}
}

export {};
