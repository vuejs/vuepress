/* global SELECTOR */

import './style.css'
import zoom from 'medium-zoom'

export default {
  data: () => ({ zoom: null }),

  mounted () {
    const self = this
    setTimeout(() => {
      self.zoom = zoom(SELECTOR)
    }, 1000)
  },

  updated () {
    const self = this
    setTimeout(() => {
      if (self.zoom) {
        self.zoom.detach()
        self.zoom.attach(SELECTOR)
      }
    }, 1000)
  }
}
