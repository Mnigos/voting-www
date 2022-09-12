import type { providers } from 'ethers'
import { get, writable } from 'svelte/store'

import { contract, provider, setProvider } from '.'

export const account = writable<string>(localStorage.getItem('account') || '')
export const avaibleVotes = writable<number>(0)
export const isVoted = writable<boolean>(false)
export const yourVote = writable<string>()

export async function setAccount() {
  const [currentAccount]: string = await get(provider).request({
    method: 'eth_requestAccounts',
  })

  account.set(currentAccount)
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

  await get(contract).vote(proposal)
}

export async function signInForVoting() {
  await get(contract).addVoter()
}

export function tryAutoConnect(
  newProvider: providers.ExternalProvider | providers.JsonRpcFetchFunc
) {
  if (!account) return

  setProvider(newProvider)
}
