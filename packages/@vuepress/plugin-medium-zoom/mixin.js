/* global SELECTOR */

import './style.css'
import zoom from 'medium-zoom'

export default {
  data: () => ({ zoom: null }),

  mounted () {
    this.updateZoom()
  },

  updated () {
    this.updateZoom()
  },

  methods: {
    updateZoom () {
      setTimeout(() => {
        if (this.zoom) {
          this.zoom.detach()
        }
        this.zoom = zoom(SELECTOR)
      }, 1000)
    }
  }
}
