import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, parent }) => {
	const { user } = await parent();
	const newReleases = fetch('/api/spotify/browse/new-releases?limit=10');
	const featuredPlaylists = fetch('/api/spotify/browse/featured-playlists?limit=10');
	const userPlaylists = fetch('/api/spotify/user/${user?.id}/playlists?limit=10');

	const categoriesResponse = await fetch('/api/spotify/browse/categories');
	const categoriesResponseJSON: SpotifyApi.MultipleCategoriesResponse | undefined =
		categoriesResponse.ok ? await categoriesResponse.json() : undefined;

	/**
	 * Randomize the order of the categories
	 *
	 * @param categoriesResponseJSON - The JSON response containing an array of category objects.
	 * @return An array of 0-3 categories, randomly sorted and sliced.
	 * @return An empty array, if the response is undefined.
	 */
	const randomCategories = categoriesResponseJSON
		? categoriesResponseJSON.categories.items.sort(() => 0.5 - Math.random()).slice(0, 3)
		: [];

	const randomCategoriesPromises = randomCategories.map((category) =>
		fetch(`/api/spotify/browse/categories/${category.id}/playlists?limit=10`)
	);

	const [
		newReleasesResponse,
		featuredPlaylistsResponse,
		userPlaylistsResponse,
		...randomCategoriesResponse
	] = await Promise.all([
		newReleases,
		featuredPlaylists,
		userPlaylists,
		...randomCategoriesPromises
	]);

	return {
		newReleases: newReleasesResponse.ok
			? (newReleasesResponse.json() as Promise<SpotifyApi.ListOfNewReleasesResponse>)
			: undefined,
		featuredPlaylists: featuredPlaylistsResponse.ok
			? (featuredPlaylistsResponse.json() as Promise<SpotifyApi.ListOfFeaturedPlaylistsResponse>)
			: undefined,
		userPlaylists: userPlaylistsResponse.ok
			? (userPlaylistsResponse.json() as Promise<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>)
			: undefined,
		homeCategories: randomCategories,
		categoriesPlaylists: Promise.all(
			randomCategoriesResponse.map((response) =>
				response.ok ? (response.json() as Promise<SpotifyApi.CategoryPlaylistsResponse>) : undefined
			)
		)
	};
};
