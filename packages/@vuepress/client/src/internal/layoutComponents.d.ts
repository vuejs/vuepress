import type { AsyncComponentLoader } from 'vue'

declare module '@internal/layoutComponents' {
  export const layoutComponents: Record<string, AsyncComponentLoader>
}
