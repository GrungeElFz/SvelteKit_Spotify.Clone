<script lang="ts">
	type Track = SpotifyApi.TrackObjectFull | SpotifyApi.TrackObjectSimplified;
	export let track: Track;

	let audio: HTMLAudioElement;
	let paused: true;
</script>

<div class="player">
	<audio bind:this={audio} bind:paused controls src={track.preview_url} preload="none" />
</div>
