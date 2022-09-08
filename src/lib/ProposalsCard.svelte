<script lang="ts">
  import Card from './Card.svelte'
  import ProposalCard from './ProposalCard.svelte'

  const proposals = [
    {
      name: 'p1',
      votes: 2,
    },
    {
      name: 'p2',
      votes: 1,
    },
    {
      name: 'p3',
      votes: 0,
    },
  ]
</script>

<div>
  <Card title="Proposals">
    <div class="flex gap-4">
      {#each proposals as { name, votes }}
        <ProposalCard {name} {votes} />
      {/each}
    </div>
  </Card>
</div>
