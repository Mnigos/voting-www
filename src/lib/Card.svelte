<script lang="ts">
  export let title: string
  export let slotClass = ''
</script>

<div class="bg-dark-600 p-4 rounded-xl flex flex-col items-center gap-5">
  <header class="text-2xl">
    <h3>{title}</h3>
  </header>

  <main class={slotClass}>
    <slot />
  </main>
</div>
