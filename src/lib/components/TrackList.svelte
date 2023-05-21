<script lang="ts">
	import { Clock8 } from 'lucide-svelte';

	export let tracks: SpotifyApi.TrackObjectFull[] | SpotifyApi.TrackObjectSimplified[];
</script>

<div class="tracks">
	<div class="row header">
		<div class="number-column">
			<span class="number">#</span>
		</div>

		<div class="info-column">
			<span class="track-title">Title</span>
		</div>

		<div class="duration-column">
			<Clock8 aria-hidden focusable="false" />
		</div>

		<div class="actions-column" />
	</div>
</div>
