<script lang="ts">
  import { onDestroy, onMount } from 'svelte'
  import { get } from 'svelte/store'

  import Button from './Button.svelte'

  import { addressFormatter } from '~/utils'
  import {
    account,
    setAccount,
    connect,
    disconnect,
    provider,
    showNoEthereumAlert,
    tryAutoConnect,
  } from '~/store'

  async function connectWallet() {
    if (!window.ethereum) return showNoEthereumAlert.set(true)
    if ($account) return disconnect()

    await connect(window.ethereum)
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

    if (window.ethereum) tryAutoConnect(window.ethereum)
  })

  onDestroy(unSubscribe)
</script>

<Button on:click={connectWallet} class="group hover:scale-x-105">
  {#if $account}
    <span class="group-hover:hidden">
      {addressFormatter($account)}
    </span>

    <span class="hidden group-hover:block"> Disconnect wallet </span>
  {:else}
    Connect wallet
  {/if}
</Button>
