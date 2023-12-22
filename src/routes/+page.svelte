<script>
	import BookCard from '$lib/components/BookCard.svelte';
	
	export let data;
	$: books = data.books.books;
</script>

<main class="container">
	<div class="row">
		{#each books as book}
			<div class="col-md-3 p-2">
				<BookCard {book} />
			</div>
		{/each}
	</div>
</main>