<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: album = data.album;
	$: console.log(album);
</script>

<h5>{album.album_type}</h5>
<h1>{album.name}</h1>
