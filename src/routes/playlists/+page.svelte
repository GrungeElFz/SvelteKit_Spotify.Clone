<script lang="ts">
	import { Button, Card } from '$components';
	import type { PageData } from './$types';

	export let data: PageData;

	$: playlists = data.userPlaylists;
</script>

<div class="content">
	{#if playlists.items.length > 0}
		<div class="title">
			<h1>{data.title}</h1>
			<Button element="a">+ Add New</Button>
		</div>

		<div class="grid-items">
			{#each playlists.items as item}
				<Card {item} />
			{/each}
		</div>
	{:else}
		<div class="empty">
			<p>No Playlists Yet!</p>
			<Button element="a">+ Add New</Button>
		</div>
	{/if}
</div>
