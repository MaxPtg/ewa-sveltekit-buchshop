<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
	$: authenticatedUser = data.authenticatedUser;
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark mb-5">
	<div class="container-fluid text-white">

		<!-- Navbar Toggle on low display width -->
		<a class="navbar-brand" href="/">Books<b>4</b>You</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarText"
			aria-controls="navbarText"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon"></span>
		</button>

		<div class="collapse navbar-collapse" id="navbarText">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">

				<!-- Navbar Items -->
				<li class="nav-item">
					<a class="nav-link active" aria-current="page" href="/">Katalog</a>
				</li>
				<li class="nav-item">
					<a class="nav-link" href="/shopping-cart">Warenkorb</a>
				</li>

				{#if !authenticatedUser}
					<li class="nav-item">
						<a class="nav-link" href="/login">Anmelden</a>
					</li>
				{:else}

					{#if authenticatedUser.user.bookstore_role === 'ADMIN'}
						<li class="nav-item">
							<a class="nav-link" href="/admin">Administration</a>
						</li>
					{/if}

					<li class="nav-item">
						<form
							action="/logout"
							method="post"
							use:enhance={() => {
								return async ({ result }) => {
									invalidateAll();
									goto('/');
								};
							}}
						>
							<button type="submit" class="nav-link">Abmelden</button>
						</form>
					</li>
					
				{/if}

			</ul>

			<!-- Search Form -->
			<form class="d-flex">
				{#if authenticatedUser}
					<span class="navbar-text">
						{authenticatedUser.user.username}&nbsp;&nbsp;&nbsp;
					</span>
				{/if}
				<input
					class="form-control me-4 ml-5"
					type="search"
					placeholder="Suchen ..."
					aria-label="Search"
				/>
				<button class="btn btn-outline-success" type="submit">Suchen</button>
			</form>

		</div>
	</div>
</nav>

<slot />

<style>
	button.nav-link {
		background: none;
		color: inherit;
		border: none;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	}
</style>
