<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { get } from 'svelte/store'

  import Button from './Button.svelte'

  import { addressFormatter } from '~/utils'
  import {
    account,
    provider,
    setAccount,
    setProvider,
    showNoEthereumAlert,
    tryAutoConnect,
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

  onMount(() => {
    if (get(account)) return

    tryAutoConnect(window.ethereum)
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
