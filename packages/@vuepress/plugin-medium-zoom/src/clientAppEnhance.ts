import mediumZoom from 'medium-zoom'
import type { ZoomOptions } from 'medium-zoom'
import { nextTick } from 'vue'
import { START_LOCATION } from 'vue-router'
import type { ClientAppEnhance } from '@vuepress/client'
import { mediumZoomSymbol } from './composables'

import '../styles/medium-zoom.css'

declare const MZ_SELECTOR: string
declare const MZ_OPTIONS: ZoomOptions
declare const MZ_DELAY: number

const selector = MZ_SELECTOR
const options = MZ_OPTIONS
const delay = MZ_DELAY

const clientAppEnhance: ClientAppEnhance = ({ app, router }) => {
  if (!selector) return

  // create zoom instance and provide it
  const zoom = mediumZoom(options)
  zoom.refresh = (sel = selector) => {
    zoom.detach()
    zoom.attach(sel)
  }
  app.provide(mediumZoomSymbol, zoom)

  router.afterEach((to, from) => {
    // the initial state does not work with `nextTick`
    // so we have to delay it
    if (from === START_LOCATION) {
      setTimeout(() => zoom.refresh(), delay)
      return
    }

    if (to.path !== from.path) {
      nextTick(() => zoom.refresh())
    }
  })
}

export default clientAppEnhance
