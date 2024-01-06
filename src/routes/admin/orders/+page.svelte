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
		console.log('API response for order details:', response);
		if (response?.success) {
			const orderDetails = response.data;
			console.log('Extracted order details:', orderDetails);
			orders = orders.map((order) => {
				if (order.id === orderId) {
					return { ...order, details: orderDetails, detailsVisible: true };
				}
				return order;
			});
		}
	}

	function toggleDetails(orderId: number) {
		console.log('Toggle details for order ID:', orderId);
		const order = orders.find((order) => order.id === orderId);
		console.log('Found order:', order);
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
	<button class="btn btn-secondary mt-3" on:click={navigateToAdmin}
		>Zurück zur Administration</button
	>
	<h1>Bestellungen</h1>
	{#if orders.length > 0}
		<table class="table">
			<thead>
				<tr>
					<th>Bestell-ID</th>
					<th>Status</th>
					<th>Erstellt am</th>
					<!-- <th>Details</th> -->
				</tr>
			</thead>
			<tbody>
				{#each orders as order}
					<tr>
						<td>{order.id}</td>
						<td>{order.attributes.status}</td>
						<td>{new Date(order.attributes.createdAt).toLocaleString()}</td>

						<!--
						Kommentar: Details hinfällig, da Bestellungn i.d.R. als Gast durchgeführt werden
						
						<td>
							<button class="btn btn-secondary" on:click={() => toggleDetails(order.id)}
								>Details</button
							>
						</td>
						-->
					</tr>
					{#if order.detailsVisible}
						<tr>
							<td colspan="4">
								<h3>Adresse:</h3>
								<ul>
									<!-- Lieferadresse liegt bei Stripe -->
								</ul>
							</td>
						</tr>
					{/if}
				{/each}
			</tbody>
		</table>
	{:else}
		<p>Keine Bestellungen vorhanden.</p>
	{/if}
</div>
