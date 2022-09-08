<script lang="ts">
  import { onDestroy } from 'svelte'

  import Button from './Button.svelte'

  import { addressFormatter } from '~/utils'
  import {
    account,
    provider,
    setAccount,
    setProvider,
    showNoEthereumAlert,
  } from '~/store'

  async function connect() {
    if (!window.ethereum) return showNoEthereumAlert.set(true)

    setProvider(window.ethereum)

    await setAccount()
  }

  const unSubscribe = provider.subscribe(currentProvider => {
    if (!currentProvider) return

    currentProvider.on('accountsChanged', async accounts => {
      const [newAccount] = accounts

      setAccount(newAccount)
    })
  })

  onDestroy(unSubscribe)
</script>

<Button on:click={connect}>
  {#if $account}
    {addressFormatter($account)}
  {:else}
    Connect wallet
  {/if}
</Button>
