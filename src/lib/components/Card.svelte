<script lang="ts">
	import { Music } from 'lucide-svelte';

	type AlbumType = SpotifyApi.AlbumObjectFull | SpotifyApi.AlbumObjectSimplified;
	type PlaylistsType = SpotifyApi.PlaylistObjectFull | SpotifyApi.PlaylistObjectSimplified;
	type ArtistType = SpotifyApi.ArtistObjectFull;

	export let item: AlbumType | PlaylistsType | ArtistType;
</script>

<div class="card {item.type}">
	{#if item.images.length > 0}
		<img loading="lazy" src={item.images[0].url} alt="{item.type} cover for {item.name}" />
	{:else}
		<div class="cover-placeholder">
			<Music aria-hidden="true" focusable="false" color="var(--light-grey)" />
		</div>
	{/if}
	<h4><a href="/{item.type}/{item.id}">{item.name}</a></h4>
	{#if item.type === 'album'}
		<p>{item.artists.map((item) => item.name).join(', ')}</p>
	{/if}
	{#if item.type === 'playlist'}
		<p>{item.description}</p>
	{/if}
</div>

<style lang="scss">
	.card {
		background-color: var(--dark-grey);
		padding: 10px;
		box-shadow: 0 0 40px rgba(0, 0, 0, 0.4);
		border-radius: 4px;
		transition: background 0.3s;
		position: relative;
		&:hover {
			background-color: var(--medium-grey);
			.cover-placeholder {
				background-color: var(--dark-grey);
			}
		}
		h4 {
			margin: 0 0 10px;
			font-size: functions.toREM(16);
			font-weight: 600;
			line-height: 1;
			a {
				text-decoration: none;
				color: var(--text-color);
				&:after {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					right: 0;
					bottom: 0;
				}
			}
		}
		p {
			margin: 0;
			color: var(--light-grey);
			font-size: functions.toREM(14);
		}
		img {
			width: 100%;
			aspect-ratio: 1;
			object-fit: cover;
			margin: 0 0 20px;
		}
		.cover-placeholder {
			width: 100%;
			aspect-ratio: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: var(--medium-grey);
			margin: 0 0 20px;
			transition: background 0.3s;
			:global(svg) {
				width: 40%;
				height: 40%;
			}
		}
	}
</style>
