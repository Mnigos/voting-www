import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/svelte'

import Alert from './Alert.svelte'

const message = 'Example message'

describe('Alert', () => {
  test('should render alert with message', () => {
    let isOpen = true
    const onClick = () => (isOpen = false)

    render(Alert, { message, isOpen, onClick })

    expect(screen.getByText(message)).toBeInTheDocument()
  })

  test('should close alert after click', async () => {
    let isOpen = true
    const onClick = () => (isOpen = false)

    const { container } = render(Alert, { message, isOpen, onClick })

    const button = container.querySelector<HTMLButtonElement>('.border-2')

    await button.click()

    expect(isOpen).toBe(false)
  })
})
