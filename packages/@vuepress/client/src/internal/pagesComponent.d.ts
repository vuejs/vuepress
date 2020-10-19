import type { AsyncComponentLoader } from 'vue'

declare module '@internal/pagesComponent' {
  export const pagesComponent: Record<string, AsyncComponentLoader>
}
