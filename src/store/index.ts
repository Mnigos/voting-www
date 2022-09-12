import { providers } from 'ethers'
import { writable } from 'svelte/store'

import {
  account,
  avaibleVotes,
  getStats,
  isVoted,
  setAccount,
  yourVote,
} from './account'
import { setContract } from './contract'

export const provider = writable<providers.ExternalProvider>()
export const singer = writable<providers.JsonRpcSigner>()
export const showNoEthereumAlert = writable<boolean>(false)

export function setProvider(
  newProvider: providers.ExternalProvider | providers.JsonRpcFetchFunc
) {
  const web3Provider = new providers.Web3Provider(newProvider)

  provider.set(web3Provider.provider)
  singer.set(web3Provider.getSigner())
}

export async function connect(
  newProvider: providers.ExternalProvider | providers.JsonRpcFetchFunc
) {
  setProvider(newProvider)
  await setAccount()
  await getStats()
  setContract()
}

export async function disconnect() {
  account.set('')
  provider.set(undefined)
  isVoted.set(false)
  yourVote.set(undefined)
  avaibleVotes.set(0)

  localStorage.removeItem('account')

  setContract()
}

export * from './contract'
export * from './proposals'
export * from './account'
