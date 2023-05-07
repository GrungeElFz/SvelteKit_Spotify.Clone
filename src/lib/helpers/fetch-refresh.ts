import { browser } from '$app/environment';

export default async function fetchRefresh(
	fetch: (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>,
	path: string
) {
	const request = fetch(path);
	if (!browser) return request;

	const response = await request;
	if (response.status === 401) {
		await fetch('/api/auth/refresh');
		return fetch(path);
	} else {
		return response;
	}
}
