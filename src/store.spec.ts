import { get } from 'svelte/store'
import { describe, expect, test } from 'vitest'

import { account } from './store'

describe('store', () => {
  test('account', () => {
    expect(get(account)).toEqual('')

    account.set('foo')

    expect(get(account)).toEqual('foo')
  })
})
