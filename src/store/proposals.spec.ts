import type { Contract } from 'ethers'
import { get } from 'svelte/store'
import { describe, expect, test, vi } from 'vitest'

import { contract, getProposals } from '.'

describe('Store - proposals', () => {
  test('getProposals', async () => {
    contract.set({
      proposals: vi.fn().mockResolvedValue(['e']),
    } as unknown as Contract)

    await getProposals()

    expect(get(contract).proposals).toHaveBeenCalled()
  })
})
