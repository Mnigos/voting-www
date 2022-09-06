<script lang="ts">
  import { providers } from 'ethers'

  import Button from './Button.svelte'

  import { addressFormatter } from '~/utils'
  import { account } from '~/store'

  async function connect() {
    if (!window.ethereum) return

    const provider = new providers.Web3Provider(window.ethereum)

    await provider.send('eth_requestAccounts')

    const singer = provider.getSigner()
    const connectedAccount = await singer.getAddress()

    account.set(connectedAccount)
  }
</script>

<Button on:click={connect}>
  {#if $account}
    {addressFormatter($account)}
  {:else}
    Connect wallet
  {/if}
</Button>
