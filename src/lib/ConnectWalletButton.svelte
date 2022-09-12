<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { get } from 'svelte/store'

  import Button from './Button.svelte'

  import { addressFormatter } from '~/utils'
  import {
    account,
    disconnect,
    provider,
    setAccount,
    setProvider,
    showNoEthereumAlert,
    tryAutoConnect,
  } from '~/store'

  async function connect() {
    if (!window.ethereum) return showNoEthereumAlert.set(true)
    if ($account) return disconnect()

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

<Button on:click={connect} class="group hover:scale-x-105">
  {#if $account}
    <span class="group-hover:hidden">
      {addressFormatter($account)}
    </span>

    <span class="hidden group-hover:block"> Disconnect wallet </span>
  {:else}
    Connect wallet
  {/if}
</Button>
