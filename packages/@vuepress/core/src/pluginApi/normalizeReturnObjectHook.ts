import { isFunction } from '@vuepress/shared'
import type { ReturnObjectHook } from '../types'

/**
 * Normalize hook that returns an object
 */
export const normalizeReturnObjectHook = (
  hook: ReturnObjectHook['exposed']
): ReturnObjectHook['normalized'] => (app) =>
  isFunction(hook) ? hook(app) : hook
