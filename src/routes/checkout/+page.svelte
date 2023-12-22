<script lang="ts">
	import SlideLeftRight from '$lib/components/transitions/SlideLeftRight.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<svelte:head>
	<title>Kasse | Books4You</title>
</svelte:head>

<SlideLeftRight>
	<div class="row">
		<div class="col-12 mb-5">
			<h1><i class="fa-solid fa-money-check-dollar"></i> Kasse</h1>
		</div>
	</div>
</SlideLeftRight>
