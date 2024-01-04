<script lang="ts">
	import SlideLeftRight from '$lib/components/transitions/SlideLeftRight.svelte';
	import type { PageData } from './$types';

	import { cartStore } from '$lib/store';
	import type { CartItem } from '$lib/api.types';
	import { onMount } from 'svelte';
	import { log } from '$lib/util';

	let cartItems: CartItem[] = [];

	onMount(() => {
		// Load cart from localStorage
		const savedCart = localStorage.shoppingCart;
		if (savedCart && savedCart.length > 0 && savedCart !== 'undefined') {
			cartItems = JSON.parse(savedCart);
			cartStore.set(cartItems);
		}
	});

	export let data: PageData;

	let formData = {
		email: '',
		address: '',
		zipcode: '',
		city: '',
		country: ''
	};

	let errorMessages = {
		email: '',
		address: '',
		zipcode: '',
		city: '',
		country: ''
	};

	function validateField(field: keyof typeof formData) {
		if (!formData[field]) {
			errorMessages[field] = 'Dieses Feld darf nicht leer sein';
			return false;
		} else {
			errorMessages[field] = '';
			return true;
		}
	}

	function validateFormData() {
		let isValid = true;

		isValid = validateField('email') && isValid;
		isValid = validateField('address') && isValid;
		isValid = validateField('zipcode') && isValid;
		isValid = validateField('city') && isValid;
		isValid = validateField('country') && isValid;

		return isValid;
	}

	function handleSubmit() {
		if (validateFormData()) {
			// TODO: stripe logic
			console.log('Formulardaten:', formData);

			// log('checkout', {
			//     cart: cartItems,
			//     formData
			// });

			checkout();
		}
	}

	async function checkout() {
		const data = await fetch('/checkout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				items: cartItems
			})
		}).then((data) => data.json());
		window.location.replace(data.url);
	}

	const countries = ['Deutschland', 'Österreich', 'Schweiz'];
</script>

<svelte:head>
	<title>Kasse | Books4You</title>
</svelte:head>

<SlideLeftRight>
	<div class="row">
		<div class="col-12 mb-5">
			<h1><i class="fa-solid fa-money-check-dollar"></i> Kasse</h1>
			<form on:submit|preventDefault={handleSubmit}>
				<div class="mb-3">
					<label for="email" class="form-label">Email*</label>
					<input type="email" class="form-control" id="email" bind:value={formData.email} />
					{#if errorMessages.email}
						<div class="text-danger">{errorMessages.email}</div>
					{/if}
				</div>
				<div class="mb-3">
					<label for="address" class="form-label">Adresse*</label>
					<input type="text" class="form-control" id="address" bind:value={formData.address} />
					{#if errorMessages.address}
						<div class="text-danger">{errorMessages.address}</div>
					{/if}
				</div>
				<div class="mb-3">
					<label for="zipcode" class="form-label">PLZ*</label>
					<input type="text" class="form-control" id="zipcode" bind:value={formData.zipcode} />
					{#if errorMessages.zipcode}
						<div class="text-danger">{errorMessages.zipcode}</div>
					{/if}
				</div>
				<div class="mb-3">
					<label for="city" class="form-label">Stadt*</label>
					<input type="text" class="form-control" id="city" bind:value={formData.city} />
					{#if errorMessages.city}
						<div class="text-danger">{errorMessages.city}</div>
					{/if}
				</div>
				<div class="mb-3">
					<label for="country" class="form-label">Land*</label>
					<select class="form-control" id="country" bind:value={formData.country}>
						<option value="">Wählen Sie ein Land</option>
						{#each countries as country}
							<option value={country}>{country}</option>
						{/each}
					</select>
					{#if errorMessages.country}
						<div class="text-danger">{errorMessages.country}</div>
					{/if}
				</div>
				<button type="submit" class="btn btn-primary w-100 mb-3">
					<i class="fa-solid fa-right-to-bracket"></i> Weiter zur Bezahlung
				</button>
			</form>
		</div>
	</div>
</SlideLeftRight>
