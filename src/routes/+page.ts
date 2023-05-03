import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/spotify/browse/new-releases?limit=10');
	const response2 = await fetch('/api/spotify/browse/featured-playlists?limit=10');

	console.log(await response.json());
	console.log(await response2.json());
};
