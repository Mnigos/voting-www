import { Contract } from 'ethers'
import { get, writable } from 'svelte/store'

import { singer } from '.'

import { VotingContractAbi } from '~/abis'

export const contract = writable<Contract>()

export function setContract() {
  contract.set(
    new Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      VotingContractAbi,
      get(singer)
    )
  )
}
