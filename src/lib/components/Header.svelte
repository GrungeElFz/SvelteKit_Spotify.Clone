<script lang="ts">
	import { browser } from '$app/environment';
	import { Navigation } from '$components';
	import { page } from '$app/stores';

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
</style>
