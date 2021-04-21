import type { ComponentOptions } from 'vue'

declare module '@internal/pagesComponents' {
  export const pagesComponents: Record<string, ComponentOptions>
}
