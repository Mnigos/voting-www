import { get, writable } from 'svelte/store'

import { contract, setContract } from '.'

export interface Proposal {
  name: string
  votes: number
}

export const proposals = writable<Proposal[]>([])

export async function getProposals() {
  let error = false
  let index = 0
  const newProposals: Proposal[] = []

  while (!error) {
    try {
      const { name, voteCount } = await get(contract).proposals(index)

      newProposals.push({
        name,
        votes: voteCount.toNumber(),
      })
      proposals.set(newProposals)

      index++
    } catch {
      error = true
      index = 0
    }
  }
}

export async function addProposal(name: string) {
  setContract()
  await get(contract).addProposal(name)

  await getProposals()
}
