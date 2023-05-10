<script lang="ts">
	import { select_options } from 'svelte/internal';
	import type { PageData } from './$types';

	export let data: PageData;

	let section: {
		title: string;
		path: string;
		items: (SpotifyApi.AlbumObjectSimplified | SpotifyApi.PlaylistObjectSimplified)[];
	}[] = [];

	$: {
		if (data.newReleases) {
			section.push({
				title: 'New Releases',
				path: '/sections/new-releases',
				items: data.newReleases.albums.items
			});
		}
		if (data.featuredPlaylists) {
			section.push({
				title: 'Featured Playlists',
				path: '/section/featured-playlists',
				items: data.featuredPlaylists.playlists.items
			});
		}
		data.homeCategories.forEach((category, index) => {
			const categoryPlaylist = data.categoriesPlaylists[index];
			if (categoryPlaylist) {
				section.push({
					title: category.name,
					path: `/category/${category.id}`,
					items: categoryPlaylist.playlists.items
				});
			}
		});
		if (data.userPlaylists) {
			section.push({
				title: 'Your Playlists',
				path: '/playlists',
				items: data.userPlaylists.items
			});
		}
	}
</script>

<h1>Home</h1>
