import { get, writable } from 'svelte/store'
import { Contract, providers } from 'ethers'

import { VotingContractAbi } from './abis'

export interface Proposal {
  name: string
  votes: number
}

export const account = writable<string>(localStorage.getItem('account') || '')
export const avaibleVotes = writable<number>(0)
export const isVoted = writable<boolean>(false)
export const yourVote = writable<string>()
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

export function setContract(
  newProvider: providers.ExternalProvider | providers.JsonRpcFetchFunc
) {
  // const goerliProvider = new providers.JsonRpcProvider(
  //   `https://goerli.infura.io/v3/${import.meta.env.VITE_API_KEY}`
  // )

  const singer = new providers.Web3Provider(newProvider).getSigner()

  contract.set(
    new Contract(
      import.meta.env.VITE_CONTRACT_ADDRESS,
      VotingContractAbi,
      singer
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

export async function getStats() {
  if (!get(account)) return
  if (!get(contract)) return setTimeout(getStats, 1000)

  const { vote, voted, weight } = await get(contract).voters(get(account))

  isVoted.set(voted)

  if (voted) {
    const { name: votedProposalName } = await get(contract).proposals(
      vote.toNumber()
    )

    yourVote.set(votedProposalName)
    avaibleVotes.set(0)
  } else {
    avaibleVotes.set(weight.toNumber())
  }
}

export async function vote(proposal: number) {
  if (!get(account)) return

  const response = await get(contract).vote(proposal)

  console.log(response)
}

export async function disconnect() {
  account.set('')
  provider.set(undefined)
  isVoted.set(false)
  yourVote.set(undefined)
  avaibleVotes.set(0)

  localStorage.removeItem('account')
}

export async function addVoter() {
  await get(contract).addVoter()
}
