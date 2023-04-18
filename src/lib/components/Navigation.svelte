<script lang="ts">
	import { Home, Search, ListMusic, type Icon } from 'lucide-svelte';
	import type { ComponentType } from 'svelte';
	import { page } from '$app/stores';
	import logo from '$assets/Spotify_White.Logo.png';

	export let desktop: boolean;

	let isMobileMenuOpen = false;
	$: isOpen = desktop || isMobileMenuOpen;

	const menuItems: { path: string; label: string; icon: ComponentType<Icon> }[] = [
		{
			path: '/',
			label: 'Home',
			icon: Home
		},
		{
			path: '/search',
			label: 'Search',
			icon: Search
		},
		{
			path: '/playlists',
			label: 'Playlists',
			icon: ListMusic
		}
	];

	const openMenu = () => {
		isMobileMenuOpen = true;
	};

	const closeMenu = () => {
		isMobileMenuOpen = false;
	};
</script>

<div class="nav-content" class:desktop class:mobile={!desktop}>
	<nav aria-label="Main">
		{#if !desktop}
			<button on:click={openMenu}>Open</button>
		{/if}
		<div class="nav-content-inner" class:is-hidden={!isOpen}>
			{#if !desktop}
				<button on:click={closeMenu}>Close</button>
			{/if}
			<img src={logo} class="logo" alt="Spotify" />
			<ul>
				{#each menuItems as item}
					<li class:active={item.path === $page.url.pathname}>
						<a href={item.path}>
							<svelte:component this={item.icon} size={26} />
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</nav>
</div>

<style lang="scss">
	.nav-content {
		.logo {
			max-width: 100%;
			width: 130px;
		}
		.nav-content-inner {
			padding: 20px;
			min-width: var(--sidebar-width);
			background-color: var(--sidebar-color);
			height: 100vh;
			overflow: auto;
			display: none;
			ul {
				padding: 0;
				margin: 20px 0 0;
				list-style: none;
				li {
					&.active {
						a {
							opacity: 1;
						}
					}
				}
				a {
					display: flex;
					align-items: center;
					text-decoration: none;
					color: var(--text-color);
					font-size: functions.toREM(14);
					font-weight: 500;
					padding: 5px;
					margin: 10px 0;
					opacity: 0.7;
					transition: opacity 0.2s;
					&:hover,
					&:focus {
						opacity: 1;
					}
					:global(svg) {
						margin-right: 12px;
					}
				}
			}
		}
		&.desktop {
			position: sticky;
			top: 0;
			.nav-content-inner {
				@include breakpoint.up('md') {
					display: block;
				}
			}
		}
	}
</style>
