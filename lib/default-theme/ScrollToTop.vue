<template>
  <transition name="fade" v-if="$site.themeConfig.showScrollToTop">
    <svg v-if="show"
      class="go-to-top"
      @click="scrollToTop"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 261.9 226.7">
      <g transform="matrix(1.3333333,0,0,-1.3333333,0,400) translate(178.0626,235.0086)">
        <path fill="currentColor" d="M-138.8-105L-79.9-3L-21-105h39.3L-79.9,65l-98.2-170H-138.8z"/>
      </g>
    </svg>
  </transition>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  props: {
    threshold: {
      type: Number,
      default: 300
    }
  },

  data () {
    return {
      scrollTop: this.getScrollTop()
    }
  },

  mounted () {
    window.addEventListener('scroll', debounce(() => {
      this.scrollTop = this.getScrollTop()
    }, 100))
  },

  methods: {
    getScrollTop () {
      return window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop || 0
    },
    scrollToTop () {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.scrollTop = 0
    }
  },

  computed: {
    show () {
      return this.scrollTop > this.threshold
    }
  }
}
</script>

<style lang="stylus" scoped>
@import './styles/config.styl'

$iconSize = 2rem

.go-to-top
  cursor pointer
  position fixed
  bottom 2rem
  right 2.5rem
  width $iconSize
  color  lighten($accentColor, 30%)
  z-index 1
  &:hover
    color $accentColor

@media (max-width: $MQNarrow)
  .go-to-top
    display none

.fade-enter-active, .fade-leave-active
  transition opacity 0.3s

.fade-enter, .fade-leave-to
  opacity 0
</style>
