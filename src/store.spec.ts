import { get } from 'svelte/store'
import { describe, expect, test, vi } from 'vitest'
import { generateTestingUtils } from 'eth-testing'

import {
  account,
  setProvider,
  provider,
  setAccount,
  showNoEthereumAlert,
} from './store'

describe('store', () => {
  const ethersTestUtils = generateTestingUtils({ providerType: 'MetaMask' })
  const testAccount = '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
  const providerMock = {
    ...ethersTestUtils.getProvider(),
    request: vi.fn().mockImplementation(() => [testAccount]),
  }

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
})
