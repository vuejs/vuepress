<template>
  <transition name="fade" v-if="$site.themeConfig.showScrollToTop">
    <div v-if="show" class="go-to-top" @click="scrollToTop"></div>
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
      window.scrollTo(0, 0)
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
  bottom 1rem
  right 1rem
  text-align center
  line-height $iconSize
  width $iconSize
  height $iconSize
  color $textColor
  z-index 1
  &:hover
    color $accentColor
  &::before
    content ''
    display block
    height "calc(%s / 2 - 3px)" % $iconSize
    width "calc(%s / 2 - 3px)" % $iconSize
    border-top currentColor 5px solid
    border-left currentColor 5px solid
    position absolute
    transform translateY(-33%) rotate(45deg)
    transform-origin 0 0
    left 50%
    top 50%

@media (max-width: $MQNarrow)
  .go-to-top
    display none

.fade-enter-active, .fade-leave-active
  transition opacity 0.3s

.fade-enter, .fade-leave-to
  opacity 0
</style>
