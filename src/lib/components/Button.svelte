<script lang="ts">
	export let element: 'button' | 'a';
	export let variant: 'solid' | 'outline' | 'danger' = 'solid';
	export let className: string = '';
</script>

<svelte:element
	this={element}
	class="button button-{variant} {className}"
	on:click
	{...$$restProps}
>
	<slot />
</svelte:element>
