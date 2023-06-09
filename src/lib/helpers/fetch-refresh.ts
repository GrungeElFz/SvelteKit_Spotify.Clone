import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';

declare global {
	interface Window {
		refreshPromise: Promise<Response> | null;
	}
}

export default async function fetchRefresh(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	path: string
) {
	const req = fetch(path);
	if (!browser) return req;

	const res = await req;
	if (res.status === 401) {
		if (!window.refreshPromise) {
			window.refreshPromise = fetch('/api/auth/refresh').finally(() => {
				window.refreshPromise = null;
			});
		}
		const refreshRes = await window.refreshPromise;
		if (!refreshRes.ok) throw error(401, 'Session expired');
		return fetch(path);
	} else if (res.status === 500) {
		throw error(500, 'Internal server error');
	} else {
		return res;
	}
}
