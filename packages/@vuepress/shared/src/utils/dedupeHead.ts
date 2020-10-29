import type { HeadConfig } from '../types'
import { resolveHeadIdentifier } from './resolveHeadIdentifier'

/**
 * Dedupe head config with identifier
 *
 * Items that appear earlier have higher priority
 */
export const dedupeHead = (head: HeadConfig[]): HeadConfig[] => {
  const identifierSet = new Set<string>()
  const result: HeadConfig[] = []

  head.forEach((item) => {
    const identifier = resolveHeadIdentifier(item)
    if (!identifierSet.has(identifier)) {
      identifierSet.add(identifier)
      result.push(item)
    }
  })

  return result
}
