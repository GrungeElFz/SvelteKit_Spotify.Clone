<script lang="ts">
	import { browser } from '$app/environment';
	import { Navigation } from '$components';
	import { page } from '$app/stores';
	import { ChevronDown } from 'lucide-svelte';

	$: user = $page.data.user;
</script>

<div class="content">
	<div class="left">
		<!--
			The Navigation component will only be rendered in the browser environment.
			It will not be rendered during SSR.
		-->
		{#if browser}
			<Navigation desktop={false} />
		{/if}
	</div>
	<div class="right">
		<div id="profile-button">
			<button class="profile-button">
				{#if user?.images && user.images.length > 0}
					<img
						src={user.images[0].url}
						alt={user?.display_name ? `Profile picture of ${user?.display_name}` : ``}
					/>
					{user?.display_name}
					<span class="visually-hidden">Profile Menu</span>
					<ChevronDown class="profile-arrow" />
				{/if}
			</button>
		</div>
	</div>
</div>

<style lang="scss">
	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}
	.profile-button {
		background: none;
		border: 1px solid var(--border);
		padding: 5px;
		border-radius: 25px;
		display: flex;
		align-items: center;
		color: var(--text-color);
		cursor: pointer;
		:global(.profile-arrow) {
			margin-left: 3px;
		}
		img {
			width: 28px;
			height: 28px;
			border-radius: 100%;
			margin-right: 10px;
		}
		&:hover {
			background-color: var(--accent-color);
		}
	}
</style>
