<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData, PageData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<div class="container">
	<div class="row justify-content-center">
		<div class="col-md-6">
			<h2 class="text-center">Anmelden</h2>
			<form method="POST" use:enhance>
				<div class="form-group mb-3">
					<label for="username">Benutzername</label>
					<input
						type="text"
						class="form-control"
						name="username"
						placeholder="Benutzername eingeben"
						required
					/>
				</div>
				<div class="form-group mb-3">
					<label for="password">Passwort</label>
					<input
						type="password"
						class="form-control"
						name="password"
						placeholder="Passwort eingeben"
						required
					/>
				</div>
				<button type="submit" class="btn btn-primary w-100 mb-3">Einloggen</button>

				{#if form?.incorrect}
					<div class="alert alert-danger text-center" role="alert">
						Ungültige Anmeldeinformationen. Bitte versuchen Sie es erneut.
					</div>
				{/if}
			</form>
		</div>
	</div>
</div>
