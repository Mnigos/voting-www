<script lang="ts">
  import { onMount } from 'svelte'

  import Button from './Button.svelte'

  import {
    getAvaibleVotes,
    avaibleVotes,
    getIsVoted,
    account,
    isVoted,
    yourVote,
    addVoter,
  } from '~/store'

  onMount(async () => {
    await getAvaibleVotes()
    await getIsVoted()
  })
</script>

{#if $account}
  <div class="flex flex-col gap-4">
    <div class="bg-dark-600 p-2 rounded-lg shadow-xl flex gap-2">
      <p class="text-gray-400">Avaible votes:</p>
      <div class="rounded-lg text-center bg-gray-600 px-2">{$avaibleVotes}</div>
    </div>

    <div class="bg-dark-600 p-2 rounded-lg shadow-xl flex gap-2">
      {#if $isVoted}
        <p class="text-gray-400">You have voted for: {$yourVote}</p>
      {:else}
        <span class="flex flex-col gap-2">
          <p class="text-gray-400">You haven't voted yet</p>

          {#if !$avaibleVotes}
            <Button on:click={addVoter}>Sign In for voting</Button>
          {/if}
        </span>
      {/if}
    </div>
  </div>
{/if}
