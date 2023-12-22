<script lang="ts">
	import { cartStore } from '$lib/store';
	import type { CartItem } from '$lib/api.types';
	import { onMount } from 'svelte';

	let cartItems: CartItem[] = [];

	onMount(() => {
		// Load cart from localStorage
		const savedCart = localStorage.shoppingCart;
		if (savedCart && savedCart.length > 0 && savedCart !== 'undefined') {
			cartItems = JSON.parse(savedCart);
			cartStore.set(cartItems);
		}
	});

	cartStore.subscribe((items) => {
		cartItems = items;

		// Save cart to localStorage if items > 0; prevents empty cart on page reload
		if (items.length > 0) {
			localStorage.setItem('shoppingCart', JSON.stringify(items));
		}
	});

	function increaseQuantity(item: CartItem) {
		cartStore.update((items) => {
			return items.map((i) =>
				i.book_id === item.book_id ? { ...i, quantity: i.quantity + 1 } : i
			);
		});
	}
	function decreaseQuantity(item: CartItem) {
		cartStore.update((items) => {
			return items.map((i) =>
				i.book_id === item.book_id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i
			);
		});
	}
	function removeItem(item: CartItem) {
		cartStore.update((items) => items.filter((i) => i.book_id !== item.book_id));

		// Remove cart from localStorage if empty
		if (cartItems.length === 0) {
			localStorage.removeItem('shoppingCart');
		}
	}

	let totalQuantity: number;
	let totalPrice: number;
	$: {
		totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
		totalPrice = cartItems.reduce(
			(total, item) => total + item.quantity * item.book_attributes.price,
			0
		);
	}
</script>

<div class="container">
	<table class="table">
		<thead>
			<tr>
				<th scope="col">#</th>
				<th scope="col">Titel</th>
				<th scope="col">Autor</th>
				<th scope="col">Preis</th>
				<th scope="col">Anzahl</th>
				<th scope="col"></th>
			</tr>
		</thead>
		<tbody>
			{#each cartItems as item (item.book_id)}
				<tr>
					<th scope="row">{item.book_id}</th>
					<td>{item.book_attributes.title}</td>
					<td>{item.book_attributes.author}</td>
					<td>{item.book_attributes.price} €</td>
					<td>{item.quantity}</td>
					<td>
						<button class="btn btn-primary" on:click={() => increaseQuantity(item)}>+</button>
						<button class="btn btn-primary" on:click={() => decreaseQuantity(item)}>-</button>
						<button class="btn btn-danger" on:click={() => removeItem(item)}>X</button>
					</td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td></td>
				<td colspan="3"><b>Gesamt</b></td>
				<td>{totalQuantity}</td>
				<td>{totalPrice.toFixed(2)} €</td>
			</tr>
		</tfoot>
	</table>
	<a href="/checkout" class="btn btn-primary w-100">Zur Kasse</a>
</div>
