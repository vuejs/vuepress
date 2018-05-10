<template>
  <transition name="fade">
    <div v-if="show" class="go-to-top" @click="scrollToTop">⬆</div>
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

$iconSize = 2.3rem

.go-to-top
  cursor pointer
  font-size $iconSize
  border 1px solid $textColor
  border-radius 0.2rem
  position fixed
  bottom 3rem
  right 3rem
  text-align center
  line-height $iconSize
  width $iconSize
  background white
  z-index 1

@media (max-width: $MQNarrow)
  .go-to-top
    display none

.fade-enter-active, .fade-leave-active
  transition opacity .3s

.fade-enter, .fade-leave-to
  opacity 0
</style>
