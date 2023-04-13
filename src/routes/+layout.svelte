<script lang="ts">
	import 'modern-normalize/modern-normalize.css';
	import '../styles/main.scss';
	import type { LayoutData } from './$types';
	import { LogoutButton } from '$components';

	export let data: LayoutData;

	$: user = data.user;
</script>

{#if user}
	<p>Hi, {user.display_name}</p>
	<LogoutButton />
{/if}

<slot />
