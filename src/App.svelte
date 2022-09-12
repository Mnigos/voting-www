<script lang="ts">
  import Alert from './lib/Alert.svelte'
  import ProposalsCard from './lib/ProposalsCard.svelte'
  import ConnectWalletButton from './lib/ConnectWalletButton.svelte'
  import Footer from './lib/Footer.svelte'
  import { showNoEthereumAlert, account, getStats } from './store'
  import StatsCard from './lib/StatsCard.svelte'

  account.subscribe(async newAccount => {
    localStorage.setItem('account', newAccount)

    await getStats()
  })
</script>

<main
  class="bg-dark-800 min-h-screen text-white grid justify-items-center grid-rows-3 px-4 gap-8"
>
  <div class="flex flex-col items-center gap-8">
    <header class="text-center p-4">
      <h1 class="text-5xl p-2">Voting App</h1>

      <p>Connect your metamask wallet to get involved into voting</p>
    </header>

    <ConnectWalletButton />

    <StatsCard />
  </div>

  <div class="w-full max-w-[450px] md:max-w-[900px]">
    <ProposalsCard />
  </div>

  <div class="self-end">
    <Footer />
  </div>

  <Alert
    isOpen={$showNoEthereumAlert}
    class="absolute bottom-12 md:left-1/3 md:right-1/3 mx-2 md:mx-auto"
    onClick={() => showNoEthereumAlert.set(false)}
    message="Oops... It seems like you don't have metamask extension installed ;//"
  />
</main>

<style windi:preflights:global windi:safelist:global></style>
