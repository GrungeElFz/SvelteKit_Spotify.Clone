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
		newReleases: newReleasesResponse.ok
			? (newReleasesResponse.json() as Promise<SpotifyApi.ListOfNewReleasesResponse>)
			: undefined,
		featuredPlaylists: featuredPlaylistsResponse.ok
			? (featuredPlaylistsResponse.json() as Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse>)
			: undefined,
		userPlaylists: userPlaylistsResponse.ok
			? (userPlaylistsResponse.json() as Promise<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>)
			: undefined
	};
};
