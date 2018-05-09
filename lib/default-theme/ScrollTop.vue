<template>
  <main v-if="show">
    <button>Go To Top</button>
  </main>
</template>

<script>
import debounce from 'lodash.debounce'

export default {
  props: {
    threshold: {
      type: Number,
      default
    }
  },

  data: () => ({
    isShow: false
  }),
  mounted () {
    window.addEventListener('scroll', debounce(() => {
      if (this.getScrollTop() < 300) return this.hide()
      this.show()
    }, 300))
  },
  methods: {
    getScrollTop () {
      return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    },

    show () {
      this.isShow = true
    },

    hide () {
      this.isShow = false
    }
  }
}
</script>

<style>

</style>
