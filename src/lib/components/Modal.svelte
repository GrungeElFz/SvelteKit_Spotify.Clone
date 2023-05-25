<script lang="ts">
	import { X } from 'lucide-svelte';

	export let id: string;
	export let title: string;
</script>

<div {id} aria-hidden="true" class="modal">
	<div tabindex="-1" data-micromodal-close class="modal-overlay">
		<div class="modal-content" role="dialog" aria-modal="true" aria-labelledby="{id}-title">
			<!-- ↓ header ↓ -->
			<header>
				<h2 id="{id}-title">{title}</h2>
				<button class="close-button" aria-label="Close modal" data-micromodal-close>
					<X aria-hidden focusable="false" />
				</button>
			</header>
			<!-- ↑ header↑  -->
			<div id="{id}-content">
				<slot />
			</div>
		</div>
	</div>
</div>
