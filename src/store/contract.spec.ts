import { get } from 'svelte/store'
import { describe, test, expect } from 'vitest'

import { contract, setContract } from '.'
describe('Store - contract', () => {
  test('setContract', () => {
    setContract()

    expect(get(contract)).toBeDefined()
  })
})
