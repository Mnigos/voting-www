import { Contract, providers } from 'ethers'
import { get, writable } from 'svelte/store'

import { singer } from '.'

import { VotingContractAbi } from '~/abis'

export const contract = writable<Contract>()

export function setContract() {
  const goerliProvider = new providers.JsonRpcProvider(
    `https://goerli.infura.io/v3/${import.meta.env.VITE_API_KEY}`
  )
  contract.set(
    new Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      VotingContractAbi,
      get(singer) ?? goerliProvider
    )
  )
}
