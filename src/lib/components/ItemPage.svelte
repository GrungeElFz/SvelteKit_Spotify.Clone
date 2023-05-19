<script lang="ts">
	import { Music } from 'lucide-svelte';

	export let color: string | null;
	export let image: string | undefined;
	export let title: string;
	export let type: string | undefined;
</script>

<div class="banner">
	<div
		class="banner-gradient"
		style="background-image: linear-gradient(0deg, transparent, {color || 'var(--light-grey)'})"
	/>
	<div class="cover">
		{#if image}
			<img src={image} alt={title} />
		{:else}
			<div class="cover-placeholder">
				<Music focusable="false" aria-hidden color="var(--light-grey)" />
			</div>
		{/if}
	</div>

	<div class="info">
		{#if type}
			<p class="type">{type}</p>
		{/if}
		<h1 class="title">{title}</h1>
		<slot name="meta" />
	</div>
</div>

<div class="content">
	<slot />
</div>

<style lang="scss">
	.banner {
		display: flex;
		flex-direction: column;
		@include breakpoint.up('sm') {
			flex-direction: row;
		}
		.info {
			.type {
				text-transform: uppercase;
				font-weight: 600;
				font-size: functions.toREM(12);
				margin: 0;
			}
			.title {
				font-size: functions.toREM(32);
				margin: 5px 0 0;
				@include breakpoint.up('md') {
					font-size: functions.toREM(36);
				}
				@include breakpoint.up('lg') {
					font-size: functions.toREM(54);
				}
			}
		}
		.cover {
			margin-right: 40px;
			img,
			.cover-placeholder {
				width: 100;
				aspect-ratio: 1;
				object-fit: cover;
				box-shadow: 0 0 50px rgba(0, 0, 0, 0.5);
				@include breakpoint.up('sm') {
					width: 230px;
				}
				@include breakpoint.up('md') {
					width: 200px;
				}
				@include breakpoint.up('lg') {
					width: 230px;
				}
			}
			.cover-placeholder {
				display: flex;
				align-items: center;
				justify-content: center;
				background-color: var(--medium-grey);
				:global(svg) {
					width: 40%;
					height: 40%;
				}
			}
		}
	}
</style>
