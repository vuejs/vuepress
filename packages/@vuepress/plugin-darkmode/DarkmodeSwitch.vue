<template>
  <div class="toggle toggle--daynight">
    <input
      id="toggle--daynight"
      class="toggle--checkbox"
      type="checkbox"
      :checked="isNotDarkmode"
      @click="toggleDarkmode"
    >
    <label
      class="toggle--btn"
      for="toggle--daynight"
    >
      <span class="toggle--feature" />
    </label>
  </div>
</template>

<script>
export default {
  data: () => ({
    isDarkmode: { type: Boolean, default: false }
  }),

  computed: {
    isNotDarkmode () {
      return !this.isDarkmode
    }
  },

  mounted () {
    const darkmode = localStorage.getItem('darkmode')
    const classes = document.body.classList

    this.isDarkmode = darkmode === 'true'
    if (darkmode === 'true') classes.add('theme-night')
  },

  methods: {
    toggleDarkmode () {
      this.isDarkmode = !this.isDarkmode

      const classes = document.body.classList

      if (this.isDarkmode) {
        const oldColor = [...classes]

        classes.value = ''
        classes.add('theme-night')
        oldColor.forEach(item => classes.add(item))
      } else classes.remove('theme-night')

      localStorage.setItem('darkmode', String(this.isDarkmode))
    }
  }
}
</script>

<style lang="stylus" scoped>
.toggle
  display block
  align-self center
  text-align center
  user-select none
  margin-right .5rem

.toggle--checkbox
  display none

.toggle--btn
  display block
  margin 0 auto
  font-size 1.4em
  transition all 350ms ease-in

.toggle--btn:hover
  cursor pointer

.toggle--btn, .toggle--btn:before, .toggle--btn:after, .toggle--checkbox, .toggle--checkbox:before, .toggle--checkbox:after, .toggle--feature, .toggle--feature:before, .toggle--feature:after
  transition all 250ms ease-in

.toggle--btn:before, .toggle--btn:after, .toggle--checkbox:before, .toggle--checkbox:after, .toggle--feature:before, .toggle--feature:after
  content ''
  display block

.toggle--daynight .toggle--btn, .toggle--like .toggle--btn
  position relative
  height 17.5px
  width 31.25px
  border-radius 17.5px

.toggle--daynight .toggle--btn:before, .toggle--like .toggle--btn:before
  position absolute
  top 0.5px
  left 1px
  width 14px
  height 14px
  border-radius 50%

.toggle--daynight .toggle--btn
  border 1px solid #1c1c1c
  background-color #3c4145

.toggle--daynight .toggle--btn:before
  background-color #fff
  border 1.25px solid #e3e3c7

.toggle--daynight .toggle--btn:after
  position absolute
  top 62%
  left 9.75px
  z-index 10
  width 2.8px
  height 2.8px
  opacity 0
  background-color #fff
  border-radius 50%
  box-shadow #fff 0 0, #fff 0.75px 0, #fff 1.5px 0, #fff 2.25px 0, #fff 2.75px 0, #fff 3.5px 0, #fff 4px 0, #fff 5.25px -0.25px 0 0.25px, #fff 4px -1.75px 0 -0.5px, #fff 1.75px -1.75px 0 0.25px, #d3d3d3 0 0 0 1px, #d3d3d3 1.5px 0 0 1px, #d3d3d3 2.75px 0 0 1px, #d3d3d3 4px 0 0 1px, #d3d3d3 5.25px -0.25px 0 1.25px, #d3d3d3 4px -1.75px 0 0.25px, #d3d3d3 1.75px -1.75px 0 1.25px
  transition opacity 100ms ease-in

@keyframes starry_star
  50%
    background-color rgba(255, 255, 255, 0.1)
    box-shadow #fff 7.5px -0.75px 0 0, #fff 3px 2.5px 0 -0.25px, rgba(255, 255, 255, 0.1) 9.5px 4.5px 0 0.25px, #fff 8px 8.5px 0 0, rgba(255, 255, 255, 0.1) 5px 6px 0 -0.375px, #fff 1.25px 9.5px 0 0.25px

@keyframes bounceIn
  0%
    opacity 0
    transform scale(0.3)

  50%
    opacity 100
    transform scale(1.1)

  55%
    transform scale(1.1)

  75%
    transform scale(0.9)

  100%
    opacity 100
    transform scale(1)

.toggle--daynight .toggle--feature
  display block
  position absolute
  top 2.25px
  left 52.5%
  z-index 20
  width 1px
  height 1px
  border-radius 50%
  background-color #fff
  box-shadow rgba(255, 255, 255, 0.1) 7.5px -0.75px 0 0, rgba(255, 255, 255, 0.1) 3px 2.5px 0 -0.25px, #fff 9.5px 4.5px 0 0.25px, rgba(255, 255, 255, 0.1) 8px 8.5px 0 0, #fff 5px 6px 0 0.375px, rgba(255, 255, 255, 0.1) 1.25px 9.5px 0 0.25px
  animation starry_star 5s ease-in-out infinite

.toggle--daynight .toggle--feature:before
  position absolute
  top -0.5px
  left -6.25px
  width 4.5px
  height 4.5px
  background-color #fff
  border-radius 50%
  border 1.25px solid #e3e3c7
  box-shadow #e3e3c7 -7px 0 0 -0.75px, #e3e3c7 -2px 6px 0 -0.5px
  transform-origin -1.5px 130%

.toggle--daynight .toggle--checkbox:checked+.toggle--btn
  background-color #9ee3fb
  border 1px solid #86c3d7

.toggle--daynight .toggle--checkbox:checked+.toggle--btn:before
  left 13.75px
  background-color #ffdf6d
  border 1.25px solid #e1c348

.toggle--daynight .toggle--checkbox:checked+.toggle--btn:after
  opacity 100
  animation-name bounceIn
  animation-duration 0.6s
  animation-delay 0.1s
  animation-fill-mode backwards
  animation-timing-function ease-in-out

.toggle--daynight .toggle--checkbox:checked+.toggle--btn>.toggle--feature
  opacity 0
  box-shadow rgba(255, 255, 255, 0.1) 7.5px -0.75px 0 -1px, rgba(255, 255, 255, 0.1) 3px 2.5px 0 -1.25px, #fff 9.5px 4.5px 0 -0.75px, rgba(255, 255, 255, 0.1) 8px 8.5px 0 -1px, #fff 5px 6px 0 -1.375px, rgba(255, 255, 255, 0.1) 1.25px 9.5px 0 -0.75px
  animation none

.toggle--daynight .toggle--checkbox:checked+.toggle--btn>.toggle--feature:before
  left 6.25px
  transform rotate(70deg)
</style>
