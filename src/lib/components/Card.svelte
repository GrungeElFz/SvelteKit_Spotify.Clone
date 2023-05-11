<script lang="ts">
	type AlbumType = SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified;
	type PlaylistsType = SpotifyApi.PlaylistObjectFull | SpotifyApi.PlaylistObjectSimplified;
	type ArtistType = SpotifyApi.ArtistObjectFull | SpotifyApi.ArtistObjectSimplified;

	export let item: AlbumType | PlaylistsType | ArtistType;
</script>
