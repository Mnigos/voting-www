import { get, writable } from 'svelte/store'
import { Contract, providers } from 'ethers'

import { VotingContractAbi } from './abis'

export interface Proposal {
  name: string
  votes: number
}

export const account = writable<string>(localStorage.getItem('account') || '')
export const provider = writable<providers.ExternalProvider>()
export const contract = writable<Contract>()
export const proposals = writable<Proposal[]>([])
export const showNoEthereumAlert = writable<boolean>(false)

export function setProvider(
  newProvider: providers.ExternalProvider | providers.JsonRpcFetchFunc
) {
  const web3Provider = new providers.Web3Provider(newProvider)

  provider.set(web3Provider.provider)
}

export async function setAccount() {
  const currentProvider = get(provider)

  const [currentAccount]: string = await currentProvider.request({
    method: 'eth_requestAccounts',
  })

  account.set(currentAccount)
}

export function tryAutoConnect(
  newProvider: providers.ExternalProvider | providers.JsonRpcFetchFunc
) {
  if (!account) return

  setProvider(newProvider)
}

export function setContract() {
  const goerliProvider = new providers.JsonRpcProvider(
    `https://goerli.infura.io/v3/${import.meta.env.VITE_API_KEY}`
  )

  contract.set(
    new Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      VotingContractAbi,
      goerliProvider
    )
  )
}

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

account.subscribe(newAccount => {
  localStorage.setItem('account', newAccount)
})
