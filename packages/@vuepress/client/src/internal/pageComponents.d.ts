import type { AsyncComponentLoader } from 'vue'

declare module '@internal/pageComponents' {
  export const pageComponents: Record<string, AsyncComponentLoader>
}
