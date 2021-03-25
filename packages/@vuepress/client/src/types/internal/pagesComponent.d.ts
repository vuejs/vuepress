import type { ComponentOptions } from 'vue'

declare module '@internal/pagesComponent' {
  export const pagesComponent: Record<string, ComponentOptions>
}
