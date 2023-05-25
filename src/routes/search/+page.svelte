<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	$: items = data.categories?.categories.items;
</script>

{#if items}
	<h2>Browse Categories</h2>
	<div class="items">
		{#each items as item}
			<div class="item">
				<a href="/category/{item.id}">
					{#if item.icons.length > 0}
						<img src={item.icons[0].url} alt="" />
					{/if}
					<span class="truncate-1">{item.name}</span>
				</a>
			</div>
		{/each}
	</div>
{/if}
