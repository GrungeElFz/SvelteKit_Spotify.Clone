import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const response = await fetch('/api/spotify/browse/new-releases');
	const response2 = await fetch('/api/spotify/browse/featured-playlists');

	console.log(await response.json());
	console.log(await response2.json());
};
