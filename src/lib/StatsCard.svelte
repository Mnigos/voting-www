<script lang="ts">
  import { onMount } from 'svelte'

  import Button from './Button.svelte'

  import {
    avaibleVotes,
    isVoted,
    yourVote,
    signInForVoting,
    getStats,
  } from '~/store'

  onMount(async () => {
    await getStats()
  })
</script>

<div class="flex flex-col gap-4">
  <div class="bg-dark-600 p-2 rounded-lg shadow-xl flex gap-2 justify-between">
    <p class="text-gray-400">Avaible votes:</p>
    <div class="rounded-lg text-center bg-gray-600 px-2">{$avaibleVotes}</div>
  </div>

  <div class="bg-dark-600 p-2 rounded-lg shadow-xl flex gap-2 justify-between">
    {#if $isVoted}
      <p class="text-gray-400">You have voted for:</p>

      <div class="rounded-lg text-center bg-gray-600 px-2">{$yourVote}</div>
    {:else}
      <span class="flex flex-col gap-2">
        <p class="text-gray-400">You haven't voted yet</p>

        {#if !$avaibleVotes}
          <Button on:click={signInForVoting}>Sign In for voting</Button>
        {/if}
      </span>
    {/if}
  </div>
</div>
