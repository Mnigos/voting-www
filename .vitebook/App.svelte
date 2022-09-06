<script lang="ts">
  import type { SvelteComponent } from 'svelte'

  export let component: typeof SvelteComponent
</script>

<svelte:component this={component} />

<style windi:preflights:global windi:safelist:global></style>
