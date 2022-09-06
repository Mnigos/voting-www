<script lang="ts">
  import Button from './lib/Button.svelte'
</script>

<main
  class="bg-dark-800 min-h-screen text-white flex flex-col items-center justify-center"
>
  <header class="text-center p-4">
    <h1 class="text-5xl p-2">Voting App</h1>

    <p>Connect your metamask wallet to get involved into voting</p>
  </header>

  <div class="card text-gray-500">
    <Button>Connect wallet</Button>
  </div>
</main>

<style windi:preflights:global windi:safelist:global></style>
