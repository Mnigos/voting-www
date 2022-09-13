import { generateTestingUtils } from 'eth-testing'
import { get } from 'svelte/store'
import { describe, expect, test, vi } from 'vitest'
import { BigNumber, type Contract } from 'ethers'

import {
  account,
  avaibleVotes,
  getStats,
  isVoted,
  setAccount,
  signInForVoting,
  vote,
} from './account'

import { contract, provider } from '.'

describe('Store - account', () => {
  const ethersTestUtils = generateTestingUtils({ providerType: 'MetaMask' })
  const testAccount = '0xf61B443A155b07D2b2cAeA2d99715dC84E839EEf'
  const providerMock = {
    ...ethersTestUtils.getProvider(),
    request: vi.fn().mockImplementation(() => [testAccount]),
  }

  test('setAccount', async () => {
    provider.set(providerMock)

    await setAccount()

    expect(get(account)).toEqual(testAccount)
  })

  describe('getStats', () => {
    test("should get stats of user that have't voted yet", async () => {
      provider.set(providerMock)

      await setAccount()

      contract.set({
        proposals: vi.fn().mockResolvedValue(['e']),
        voters: vi.fn().mockResolvedValue({
          vote: BigNumber.from(0),
          voted: false,
          weight: BigNumber.from(0),
        }),
      } as unknown as Contract)

      await getStats()

      expect(get(isVoted)).toEqual(false)
    })

    test("should get stats of user that have't voted yet", async () => {
      provider.set(providerMock)

      await setAccount()

      contract.set({
        proposals: vi.fn().mockResolvedValue([undefined, { name: 'e' }]),
        voters: vi.fn().mockResolvedValue({
          vote: BigNumber.from(1),
          voted: true,
          weight: BigNumber.from(1),
        }),
      } as unknown as Contract)

      await getStats()

      expect(get(isVoted)).toEqual(true)
      expect(get(avaibleVotes)).toEqual(0)
    })
  })

  describe('vote', () => {
    test('should vote', async () => {
      provider.set(providerMock)

      await setAccount()

      contract.set({
        vote: vi.fn().mockResolvedValue(true),
      } as unknown as Contract)

      await vote(1)

      expect(get(contract).vote).toHaveBeenCalled()
    })

    test("shouldn't vote because account is undefined", async () => {
      account.set(undefined)

      contract.set({
        vote: vi.fn().mockResolvedValue(true),
      } as unknown as Contract)

      await vote(1)

      expect(get(contract).vote).not.toHaveBeenCalled()
    })
  })

  test('signInForVoting', async () => {
    contract.set({
      addVoter: vi.fn().mockResolvedValue(true),
    } as unknown as Contract)

    await signInForVoting()

    expect(get(contract).addVoter).toHaveBeenCalled()
  })
})
