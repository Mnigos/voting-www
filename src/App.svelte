<script lang="ts">
  import Button from './lib/Button.svelte'
  import Footer from './lib/Footer.svelte'
</script>

<main
  class="bg-dark-800 min-h-screen text-white grid justify-items-center grid-rows-2"
>
  <div class="flex flex-col items-center gap-8">
    <header class="text-center p-4">
      <h1 class="text-5xl p-2">Voting App</h1>

      <p>Connect your metamask wallet to get involved into voting</p>
    </header>

    <Button>Connect wallet</Button>
  </div>

  <div class="self-end">
    <Footer />
  </div>
</main>

<style windi:preflights:global windi:safelist:global></style>
