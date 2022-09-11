<script lang="ts">
  import { onMount } from 'svelte'

  import Card from './Card.svelte'
  import ProposalCard from './ProposalCard.svelte'

  import { setContract, getProposals, proposals } from '~/store'

  onMount(async () => {
    setContract()

    await getProposals()
  })
</script>

<div class="w-full">
  <Card title="Proposals" slotClass="w-full">
    <div
      class="flex flex-col md:flex-row gap-4 w-full items-center md:items-stretch"
    >
      {#each $proposals as { name, votes }}
        <ProposalCard {name} {votes} class="w-full" />
      {/each}
    </div>
  </Card>
</div>
