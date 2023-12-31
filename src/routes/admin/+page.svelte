<script lang="ts">
    import { goto } from '$app/navigation';
    import SlideLeftRight from '$lib/components/transitions/SlideLeftRight.svelte';

    function navigateTo(url : string) {
        goto(`/admin/${url}`);
    }
</script>

<svelte:head>
    <title>Administration | Books4You</title>
</svelte:head>

<SlideLeftRight>
    <div class="row">
        <div class="col-12 mb-5">
            <h1><i class="fa-solid fa-screwdriver-wrench"></i> Administration</h1>
            <div class="btn-group" role="group" aria-label="Admin Tabs">
                <button class="btn btn-secondary" on:click={() => navigateTo('orders')}>Bestellungen</button>
                <button class="btn btn-secondary" on:click={() => navigateTo('inventory')}>Lagerbestände</button>
            </div>
        </div>
    </div>
</SlideLeftRight>
