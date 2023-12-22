<!-- src/components/BookCard.svelte -->
<script lang="ts">
	import type { Book } from '$lib/api.types';
	import { cartStore } from '$lib/store';

	export let book: Book;

	let isAdded = false;

	function addToCart() {
		isAdded = true;
		setTimeout(() => {
			isAdded = false;
		}, 2000);

		cartStore.update((items) => {
			const bookInCart = items.find((item) => item.book_id === book.id);

			if (bookInCart) {
				return items.map((item) =>
					item.book_id === book.id ? { ...item, quantity: item.quantity + 1 } : item
				);
			} else {
				return [...items, { book_id: book.id, book_attributes: book.attributes, quantity: 1 }];
			}
		});
	}
</script>

<div class="card book-card">
	<img src={book.attributes.cover_url} class="card-img-top" alt={book.attributes.title} />
	<div class="card-body">
		<h5 class="card-title">{book.attributes.title}</h5>
		<p class="card-text">Author: {book.attributes.author}</p>
		<div>
			<button class="btn btn-primary" class:btn-added={isAdded} on:click={addToCart}>
				<i class="fas fa-add"></i> In den Warenkorb
			</button>
			<a href="/book/{book.id}" class="btn btn-primary">
				<i class="fa-solid fa-circle-info"></i> Details
			</a>
		</div>
	</div>
</div>

<style>
	.btn-primary {
		transition: background-color 0.5s ease;
	}

	.btn-added {
		background-color: green !important;
	}
</style>
