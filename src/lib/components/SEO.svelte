<script lang="ts">
	import { page } from '$app/stores';

	$: url = $page.url.href;

	export const title: string = 'Spotify Clone';
	export const description: string = 'Spotify Clone, built by SvelteKit';
	export const type: string = 'website';
	export const image: string = '/Banner-SvelteKit_Spotify.Clone.png';
	export const canonicalURL: string = `${url}`;
</script>

<svelte:head>
	<!-- Primary Meta Tags -->
	<title>{title}{$page.data.title ? ` - ${$page.data.title}` : ''}</title>
	<meta charset="utf-8" />
	<meta name="title" content={title} />
	<meta name="description" content={description} />
	<meta name="viewport" content="width=device-width" />

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content={type} />
	<meta property="og:url" content={canonicalURL} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:image" content={image} />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content={canonicalURL} />
	<meta property="twitter:title" content={title} />
	<meta property="twitter:description" content={description} />
	<meta property="twitter:image" content={image} />
</svelte:head>
