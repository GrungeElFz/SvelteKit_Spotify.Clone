import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, parent }) => {
	const { user } = await parent();

	const newReleases = fetch('/api/spotify/browse/new-releases?limit=10');
	const featuredPlaylists = fetch('/api/spotify/browse/featured-playlists?limit=10');
	const userPlaylists = fetch('/api/spotify/user/${user?.id}/playlists?limit=10');

	const [newReleasesResponse, featuredPlaylistsResponse, userPlaylistsResponse] = await Promise.all(
		[newReleases, featuredPlaylists, userPlaylists]
	);

	return {
		newReleases: newReleasesResponse.ok ? newReleasesResponse.json() : undefined,
		featuredPlaylists: featuredPlaylistsResponse.ok ? featuredPlaylistsResponse.json() : undefined,
		userPlaylists: userPlaylistsResponse.ok ? userPlaylistsResponse.json() : undefined
	};
};
