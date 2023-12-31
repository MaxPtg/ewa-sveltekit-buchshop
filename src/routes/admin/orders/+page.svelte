<script lang="ts">
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { getOrders, getOrderDetails } from '$lib/api';
	import type { Orders } from '$lib/api.types';

	let orders: Orders = [];

	onMount(async () => {
		const response = await getOrders();
		if (response.success) {
			orders = response.orders;
		} else {
			console.error('Fehler beim Abrufen der Bestellungen');
		}
	});

	async function loadOrderDetails(orderId: number) {
		const response = await getOrderDetails(orderId);
		if (response.success) {
			// TO DO
		}
	}

	function toggleDetails(orderId: number) {
		const order = orders.find((order) => order.id === orderId);
		if (order && !order.detailsVisible) {
			loadOrderDetails(orderId);
		} else {
			orders = orders.map((order) => ({
				...order,
				detailsVisible: order.id === orderId ? !order.detailsVisible : order.detailsVisible
			}));
		}
	}

	function navigateToAdmin() {
		goto('/admin');
	}
</script>

<svelte:head>
	<title>Bestellungen | Books4You</title>
</svelte:head>

<div class="container">
	<button class="btn btn-secondary mt-3" on:click={navigateToAdmin}>Zurück zur Administration</button>
	<h1>Bestellungen</h1>
	{#if orders.length > 0}
		<table class="table">
			<thead>
				<tr>
					<th>Bestell-ID</th>
					<th>Status</th>
					<th>Erstellt am</th>
					<th>Details</th>
				</tr>
			</thead>
			<tbody>
				{#each orders as order}
					<tr>
						<td>{order.id}</td>
						<td>{order.attributes.status}</td>
						<td>{new Date(order.attributes.createdAt).toLocaleString()}</td>
						<td>
							<button class="btn btn-secondary" on:click={() => toggleDetails(order.id)}
								>Details</button
							>
						</td>
					</tr>
					{#if order.detailsVisible}
						<p>TO DO</p>
					{/if}
				{/each}
			</tbody>
		</table>
	{:else}
		<p>Keine Bestellungen vorhanden.</p>
	{/if}
</div>
