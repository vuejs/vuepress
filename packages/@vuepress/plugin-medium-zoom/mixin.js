/* global SELECTOR */

import './style.css'
import zoom from 'medium-zoom'

export default {
  mounted () {
    setTimeout(() => {
      zoom(SELECTOR)
    }, 1000)
  }
}
