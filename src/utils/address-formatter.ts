import { UnicodeChars } from '~/common'

const { horizontalEllipsis, enDash } = UnicodeChars

export function addressFormatter(hash = '', from = [0, 5], to = -5) {
  if (!hash) return enDash

  const [fromStart, fromEnd] = from

  const startPart = hash.slice(fromStart, fromEnd)

  const endPart = hash.slice(to)

  return `${startPart}${horizontalEllipsis}${endPart}`
}
