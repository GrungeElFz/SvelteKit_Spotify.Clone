import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	const newReleases = await fetch('/api/spotify/browse/new-releases?limit=10');
	const featuredPlaylists = await fetch('/api/spotify/browse/featured-playlists?limit=10');
};
