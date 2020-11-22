import type { Zoom } from 'medium-zoom'
import { inject } from 'vue'
import type { InjectionKey } from 'vue'

declare module 'medium-zoom' {
  interface Zoom {
    refresh: (selector?: string) => void
  }
}

export const mediumZoomSymbol: InjectionKey<Zoom> = Symbol('mediumZoom')

/**
 * Inject medium zoom instance
 */
export const useMediumZoom = (): Zoom => {
  const zoom = inject(mediumZoomSymbol)
  if (!zoom) {
    throw new Error('useMediumZoom() is called without provider.')
  }
  return zoom
}
