import { afterEach, describe, expect, test } from 'vitest'
import { cleanup, render } from '@testing-library/svelte'

import Counter from './Counter.svelte'

describe('Counter', () => {
  afterEach(() => cleanup())

  test('should click and increment', async () => {
    const { container } = render(Counter)

    const button = container.querySelector('button')

    await button.click()

    expect(button.innerHTML).toEqual('count is 1')
  })
})
