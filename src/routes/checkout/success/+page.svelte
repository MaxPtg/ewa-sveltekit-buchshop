<script lang="ts">
    import { onMount } from 'svelte';
    import { cartStore } from '$lib/store';

    onMount(() => {
        cartStore.set([]);
        localStorage.removeItem('shoppingCart');
    });
</script>

<h1>Zahlung erfolgreich, vielen Dank!</h1>