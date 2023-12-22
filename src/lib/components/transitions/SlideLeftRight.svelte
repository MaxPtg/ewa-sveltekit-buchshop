<script type="ts">
    import { slide, fly } from 'svelte/transition';
    import { quintOut } from 'svelte/easing';
</script>

<div in:slide={{ delay: 300, duration: 700, easing: quintOut, axis: "y"}} out:fly={{ duration: 300, easing: quintOut, x: "100%"}}>
    <slot></slot>
</div>