<script lang="ts">
	import { Navigation, Header, Toasts, SearchForm, SEO } from '$components';
	import { page } from '$app/stores';
	import NProgress from 'nprogress';
	import MicroModal from 'micromodal';
	import 'nprogress/nprogress.css';
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { LayoutData } from './$types';
	import { afterNavigate, beforeNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { X } from 'lucide-svelte';

	export let data: LayoutData;

	let topbar: HTMLElement;
	let scrollY: number;
	let headerOpacity = 0;

	$: if (topbar) {
		headerOpacity = scrollY / topbar.offsetHeight < 1 ? scrollY / topbar.offsetHeight : 1;
	}

	$: user = data.user;
	$: userAllPlaylists = data.userAllPlaylists;

	$: hasError = $page.url.searchParams.get('error');
	$: hasSuccess = $page.url.searchParams.get('success');

	NProgress.configure({ showSpinner: false });

	if (browser) {
		MicroModal.init();
	}

	beforeNavigate(() => {
		NProgress.start();
	});

	afterNavigate(() => {
		NProgress.done();
	});
</script>

<svelte:window bind:scrollY />

<SEO />

<Toasts />

<div id="main">
	{#if user}
		<div id="sidebar">
			<Navigation desktop={true} {userAllPlaylists} />
		</div>
	{/if}
	<div id="content">
		{#if hasError || hasSuccess}
			<div class="message" role="status" class:error={hasError} class:success={hasSuccess}>
				{hasError ?? hasSuccess}
				<a href={$page.url.pathname} class="close">
					<X aria-hidden focusable="false" />
					<span class="visually-hidden">Close Message</span>
				</a>
			</div>
		{/if}
		{#if user}
			<div id="topbar" bind:this={topbar}>
				<div
					class="topbar-bg"
					style:background-color={$page.data.color ? $page.data.color : 'var(--header-color)'}
					style:opacity={`${headerOpacity}`}
				/>
				<Header {userAllPlaylists} />
			</div>
		{/if}
		<main id="main-content" class:logged-in={user}>
			{#if $page.url.pathname.startsWith('/search')}
				<div class="search-form">
					<SearchForm />
				</div>
			{/if}
			<slot />
		</main>
	</div>
</div>

<style lang="scss">
	#main {
		display: flex;
		#content {
			flex: 1;
			.message {
				position: sticky;
				z-index: 9999;
				padding: 10px 20px;
				top: 0;
				.close {
					position: absolute;
					right: 10px;
					top: 5px;
					&:focus {
						outline-color: #fff;
					}
					:global(svg) {
						stroke: var(--text-color);
						vertical-align: middle;
					}
				}
				&.error {
					background-color: var(--error);
				}
				&.success {
					background-color: var(--accent-color);
				}
			}
			#topbar {
				position: fixed;
				height: var(--header-height);
				padding: 0 15px;
				display: flex;
				align-items: center;
				width: 100%;
				z-index: 100;
				.topbar-bg {
					position: absolute;
					width: 100%;
					height: 100%;
					top: 0;
					left: 0;
					z-index: -1;
					background-image: linear-gradient(rgba(0, 0, 0, 0.2));
				}
				@include breakpoint.up('md') {
					padding: 0 30px;
					width: calc(100% - var(--sidebar-width));
				}
			}
			main#main-content {
				padding: 30px 15px 60px;
				.search-form {
					margin-bottom: 40px;
					@include breakpoint.up('lg') {
						display: none;
					}
					:global(input) {
						width: 100%;
					}
				}
				@include breakpoint.up('md') {
					padding: 30px 30px 60px;
				}
				&.logged-in {
					padding-top: calc(30px + var(--header-height)) !important;
				}
			}
		}
	}
</style>
