import { describe, vi, test, expect } from 'vitest'
import { generateTestingUtils } from 'eth-testing'
import { get } from 'svelte/store'

import { provider, setProvider, connect, disconnect, contract } from '.'

describe('Store - index', () => {
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

  test('connect', async () => {
    await connect(providerMock)

    const [mockAccount] = await get(provider).request({ method: '' })

    expect(mockAccount).toEqual(testAccount)
    expect(get(contract)).toBeDefined()
  })

  test('disconnect', async () => {
    setProvider(providerMock)

    expect(get(provider)).toBeDefined()

    await disconnect()

    expect(get(provider)).toBeUndefined()
  })
})
