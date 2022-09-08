import { render } from '@testing-library/svelte'
import { describe, expect, test } from 'vitest'

import ProposalCard from './ProposalCard.svelte'

const opacityClass = 'opacity-100'

describe('ProposalCard', () => {
  const name = 'Proposal 1'
  const votes = 2

  test('should render ProposalCard with given properties', () => {
    const { container } = render(ProposalCard, { name, votes })

    const headerElement =
      container.querySelector<HTMLButtonElement>('header.text-xl > p')
    const votesElement = container.querySelector<HTMLButtonElement>(
      'div.flex.gap-4 > div'
    )

    expect(headerElement.innerHTML).toEqual(name)
    expect(votesElement.innerHTML).toEqual(votes + '')
  })

  test('should open and close vote button on click', async () => {
    const { container } = render(ProposalCard, { name, votes })

    const proposalButton = container.querySelector<HTMLButtonElement>(
      'button.bg-purple-800'
    )
    const voteButtonContainer =
      container.querySelector<HTMLButtonElement>('div.absolute')

    expect(voteButtonContainer.classList.contains(opacityClass)).toBeFalsy()

    await proposalButton.click()

    expect(voteButtonContainer.classList.contains(opacityClass)).toBeTruthy()

    await proposalButton.click()

    expect(voteButtonContainer.classList.contains(opacityClass)).toBeFalsy()
  })

  test('should vote on click vote button', async () => {
    const { container } = render(ProposalCard, { name, votes })

    const proposalButton = container.querySelector<HTMLButtonElement>(
      'button.bg-purple-800'
    )
    const voteButton =
      container.querySelector<HTMLButtonElement>('button.transform')

    await proposalButton.click()

    expect(voteButton.classList.contains('bg-purple-800')).toBeTruthy()
    expect(voteButton.innerHTML).toEqual('Vote')

    await voteButton.click()

    expect(voteButton.classList.contains('bg-green-800')).toBeTruthy()
    expect(voteButton.innerHTML.includes('Voted')).toBeTruthy()
  })
})
