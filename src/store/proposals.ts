import { get, writable } from 'svelte/store'

import { contract } from '.'

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
      console.log(await get(contract).proposals(index))
      const { name, voteCount } = await get(contract).proposals(index)

      newProposals.push({
        name,
        votes: voteCount.toNumber(),
      })
      proposals.set(newProposals)

      index++
    } catch {
      console.log('e')
      error = true
      index = 0
    }
  }
}
