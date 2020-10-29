import { createSSRApp } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { createVueApp } from './app'
import type { CreateVueAppResult } from './app'

export interface ServerEntry {
  createServerApp: () => Promise<CreateVueAppResult>
}

/**
 * Server entry point, used for SSR
 */
export const createServerApp = async (): Promise<CreateVueAppResult> =>
  createVueApp({
    appCreator: createSSRApp,
    historyCreator: createMemoryHistory,
  })
