<script lang="ts">
  import Button from './Button.svelte'
  import Input from './Input.svelte'

  import { addProposal } from '~/store'

  let proposalName: string

  async function submit() {
    if (!proposalName) return

    await addProposal(proposalName)
  }
</script>

<div class="bg-dark-600 rounded-lg p-4 flex flex-col gap-6">
  <header class="text-2xl">
    <h3>Add new proposal</h3>
  </header>

  <form class="flex flex-col gap-3" on:submit|preventDefault={submit}>
    <Input label="Name" bind:value={proposalName} />

    <Button>Submit</Button>
  </form>
</div>
