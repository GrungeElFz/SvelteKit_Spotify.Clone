<script lang="ts">
	type AlbumType = SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified;
	type PlaylistsType = SpotifyApi.PlaylistObjectFull | SpotifyApi.PlaylistObjectSimplified;
	type ArtistType = SpotifyApi.ArtistObjectFull;

	export let item: AlbumType | PlaylistsType | ArtistType;
</script>

<div class="card {item.type}">
	{#if item.images.length > 0}
		<img loading="lazy" src={item.images[0].url} alt="{item.type} cover for {item.name}" />
	{/if}
</div>
