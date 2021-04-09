import mediumZoom from 'medium-zoom'
import type { ZoomOptions } from 'medium-zoom'
import { defineClientAppEnhance } from '@vuepress/client'
import { mediumZoomSymbol } from './composables'

import './styles/medium-zoom.css'

declare const __SSR__: boolean
declare const MZ_SELECTOR: string
declare const MZ_ZOOM_OPTIONS: ZoomOptions
declare const MZ_DELAY: number

const selector = MZ_SELECTOR
const zoomOptions = MZ_ZOOM_OPTIONS
const delay = MZ_DELAY

export default defineClientAppEnhance(({ app, router }) => {
  if (__SSR__ || !selector) return

  // create zoom instance and provide it
  const zoom = mediumZoom(zoomOptions)
  zoom.refresh = (sel = selector) => {
    zoom.detach()
    zoom.attach(sel)
  }
  app.provide(mediumZoomSymbol, zoom)

  router.afterEach(() => {
    setTimeout(() => zoom.refresh(), delay)
  })
})
