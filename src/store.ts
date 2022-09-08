import { get, writable } from 'svelte/store'
import { providers } from 'ethers'

export const account = writable<string>()
export const provider = writable<providers.ExternalProvider>()
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
