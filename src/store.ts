import { writable } from 'svelte/store'

export const account = writable<string>('')
export const showNoEthereumAlert = writable<boolean>(false)
