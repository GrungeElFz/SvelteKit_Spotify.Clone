<script lang="ts">
	import type { Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface $$Props extends HTMLButtonAttributes {
		icon: ComponentType<Icon>;
		label: string;
	}

	export let icon: ComponentType<Icon>;
	export let label: string;
</script>

<button on:click on:mouseover on:focus on:keydown {...$$restProps}>
	<svelte:component this={icon} focusable="false" />
	<span>{label}</span>
</button>
