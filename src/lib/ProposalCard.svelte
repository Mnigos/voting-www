<script lang="ts">
  import IoMdCheckmark from 'svelte-icons/io/IoMdCheckmark.svelte'

  import Button from './Button.svelte'

  import { Colors } from '~/common'
  import { proposals, vote, isVoted, yourVote } from '~/store'

  export let name: string
  export let votes: number

  let showVoteButton = false
</script>

<div
  class={`pb-16 transition-all duration-300 ${$$restProps.class} relative min-h-full`}
  class:pb-16={showVoteButton}
>
  <button
    class="flex flex-col bg-purple-800 p-2 rounded-xl z-50 w-full items-center md:gap-2"
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
    class="absolute delay-100 transition-all duration-300 top-0 opacity-100 opacity-0 transform w-full flex justify-center"
    class:opacity-100={showVoteButton}
    class:opacity-0={!showVoteButton}
    class:-z-10={!showVoteButton}
    class:translate-y-22={showVoteButton}
  >
    <Button
      on:click={() =>
        vote(
          $proposals.indexOf(
            $proposals.find(proposal => proposal.name === name)
          )
        )}
      color={$isVoted
        ? // eslint-disable-next-line unicorn/no-nested-ternary
          name === $yourVote
          ? Colors.GREEN
          : Colors.DARK
        : Colors.PURPLE}
      isDisabled={$isVoted}
      isFilled
    >
      {#if $isVoted}
        <div class="flex gap-2">
          {#if name === $yourVote}
            <div class="w-[24px] h-[24px]">
              <IoMdCheckmark />
            </div>

            <p>Voted</p>
          {:else}
            <p>Already voted</p>
          {/if}
        </div>
      {:else}
        Vote
      {/if}
    </Button>
  </div>
</div>
