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

	let button: HTMLButtonElement;

	export function getButton() {
		return button;
	}
</script>

<button bind:this={button} on:click on:focus on:keydown {...$$restProps}>
	<svelte:component this={icon} focusable="false" aria-hidden="true" color="var(--text-color)" />
	<span class="visually-hidden">{label}</span>
</button>

<style lang="scss">
	button {
		border: none;
		background: none;
		cursor: pointer;
		padding: 0;
		width: 38px;
		height: 38px;
		:global(svg) {
			vertical-align: middle;
		}
		&:disabled {
			opacity: 0.6;
			cursor: not-allowed;
		}
		&:active {
			background-color: var(--menu-background-color);
		}
	}
</style>
