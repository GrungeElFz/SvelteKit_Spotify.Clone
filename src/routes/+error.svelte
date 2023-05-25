<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { page } from '$app/stores';
	import { Button, LogoutButton } from '$components';

	let isRetrying = false;
	const retryRoutes = [
		'/album/[id]',
		'/playlist/[id]',
		'/artist/[id]',
		'/search/[query]',
		'/{list=list=/[...rest]'
	];
</script>

<svelte:head>
	<title>{$page.status}</title>
</svelte:head>

<div class="content">
	<h1>{$page.error?.message}</h1>

	{#if $page.status === 404}
		<p>The page you are trying to access cannot be found.</p>
		<div class="buttons">
			<Button element="a" href="/">Home</Button>
			<Button element="a" href="/search">Search</Button>
		</div>
	{/if}

	{#if $page.status === 401}
		<p>Your current session has expired, please logout and login again.</p>
		<div class="buttons">
			<LogoutButton />
		</div>
	{/if}

	{#if $page.status === 500}
		<p>Oops! Something went wrong on the server. It's on us, not you.</p>
		<div class="buttons">
			<Button element="button" on:click={() => window.location.reload()}>Refresh</Button>
		</div>
	{/if}

	{#if ![404, 401].includes($page.status) && $page.route.id && retryRoutes.includes($page.route.id) && $page.status !== 500}
		<div class="buttons">
			<Button
				disabled={isRetrying}
				element="button"
				on:click={async () => {
					isRetrying = true;
					await invalidate(`app:${$page.route.id}`);
					isRetrying = false;
				}}>Retry</Button
			>
		</div>
	{/if}
</div>

<style lang="scss">
	.content {
		text-align: center;
	}
	h1 {
		font-size: functions.toREM(40);
	}
	p {
		font-size: functions.toREM(20);
	}
	.buttons {
		margin-top: 40px;
		:global(a) {
			margin: 0 5px;
		}
	}
</style>
