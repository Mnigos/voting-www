<script lang="ts">
  import Card from './Card.svelte'
  import ProposalCard from './ProposalCard.svelte'

  const proposals = [
    {
      name: 'Firs Proposal',
      votes: 2,
    },
    {
      name: 'Another Proposal',
      votes: 1,
    },
    {
      name: 'Different Proposal',
      votes: 0,
    },
  ]
</script>

<div class="w-full">
  <Card title="Proposals" slotClass="w-full">
    <div
      class="flex flex-col md:flex-row gap-4 w-full items-center md:items-stretch"
    >
      {#each proposals as { name, votes }}
        <ProposalCard {name} {votes} class="w-full" />
      {/each}
    </div>
  </Card>
</div>
