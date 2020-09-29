import { createSSRApp } from 'vue'
import { createMemoryHistory } from 'vue-router'
import { createVueApp } from './createVueApp'
import type { CreateVueAppResult } from './createVueApp'

export interface CreateServerAppEntry {
  createServerApp: () => Promise<CreateVueAppResult>
}

export const createServerApp = async (): Promise<CreateVueAppResult> =>
  createVueApp({
    appCreator: createSSRApp,
    historyCreator: createMemoryHistory,
  })
