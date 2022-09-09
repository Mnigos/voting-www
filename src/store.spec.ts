import { get } from 'svelte/store'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { generateTestingUtils } from 'eth-testing'

import {
  account,
  setProvider,
  provider,
  setAccount,
  showNoEthereumAlert,
  tryAutoConnect,
} from './store'

describe('store', () => {
  const ethersTestUtils = generateTestingUtils({ providerType: 'MetaMask' })
  const testAccount = '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
  const providerMock = {
    ...ethersTestUtils.getProvider(),
    request: vi.fn().mockImplementation(() => [testAccount]),
  }

  beforeEach(() => {
    account.set('')
    provider.set(undefined)
  })

  test('setProvider', async () => {
    setProvider(providerMock)

    const [mockAccount] = await get(provider).request({ method: '' })

    expect(mockAccount).toEqual(testAccount)
  })

  test('setAccount', async () => {
    await setProvider(providerMock)
    await setAccount()

    expect(await get(account)).toEqual(testAccount)
  })

  test('showNoEthereumAlert', () => {
    expect(get(showNoEthereumAlert)).toEqual(false)

    showNoEthereumAlert.set(true)

    expect(get(showNoEthereumAlert)).toEqual(true)
  })

  test('tryAutoConnect', () => {
    account.set(testAccount)

    tryAutoConnect(providerMock)

    expect(get(provider)).toEqual(providerMock)
  })
})
