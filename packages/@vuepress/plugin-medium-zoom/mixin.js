import './style.css'
import zoom from 'medium-zoom'

export default {
  mounted () {
    setTimeout(() => {
      zoom('.content img')
    }, 1000)
  }
}
