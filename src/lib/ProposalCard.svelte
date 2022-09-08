<script lang="ts">
  import IoMdCheckmark from 'svelte-icons/io/IoMdCheckmark.svelte'

  import Button from './Button.svelte'

  import { Colors } from '~/common'

  export let name: string
  export let votes: number

  let showVoteButton = false
  let isVoted = false
</script>

<div
  class="relative pb-16 transition-all duration-300"
  class:pb-16={showVoteButton}
>
  <button
    class="flex flex-col bg-purple-800 p-2 rounded-xl z-50"
    on:click={() => (showVoteButton = !showVoteButton)}
  >
    <header class="text-xl">
      <p>{name}</p>
    </header>

    <div class="flex gap-4">
      <p class="text-gray-400">Votes:</p>

      <div class="rounded-lg text-center bg-gray-600 px-2">{votes}</div>
    </div>
  </button>

  <div
    class="absolute transition-all duration-300 -top-10 opacity-100 opacity-0 transform translate-y-31 w-full flex justify-center z-10"
    class:opacity-100={showVoteButton}
    class:opacity-0={!showVoteButton}
    class:translate-y-31={showVoteButton}
  >
    <Button
      on:click={() => (isVoted = true)}
      color={isVoted ? Colors.GREEN : Colors.PURPLE}
      isFilled
    >
      {#if isVoted}
        <div class="flex gap-2">
          <div class="w-[24px] h-[24px]">
            <IoMdCheckmark />
          </div>
          <p>Voted</p>
        </div>
      {:else}
        Vote
      {/if}
    </Button>
  </div>
</div>
