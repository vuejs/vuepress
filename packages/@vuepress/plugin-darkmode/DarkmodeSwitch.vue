<template>
  <div
    class="darkmode-switch"
    @click="toggleDarkmode"
  >
    <div
      class="item day"
      :class="{active: !isDarkmode}"
    >
      <svg
        class="icon"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M512 256a42.666667 42.666667 0 0 0 42.666667-42.666667V128a42.666667 42.666667 0 0 0-85.333334 0v85.333333a42.666667 42.666667 0 0 0 42.666667 42.666667zM896 469.333333h-85.333333a42.666667 42.666667 0 0 0 0 85.333334h85.333333a42.666667 42.666667 0 0 0 0-85.333334zM256 512a42.666667 42.666667 0 0 0-42.666667-42.666667H128a42.666667 42.666667 0 0 0 0 85.333334h85.333333a42.666667 42.666667 0 0 0 42.666667-42.666667zM265.386667 213.333333a42.666667 42.666667 0 0 0-59.306667 62.72l61.44 59.306667a42.666667 42.666667 0 0 0 31.146667 11.946667 42.666667 42.666667 0 0 0 30.72-13.226667 42.666667 42.666667 0 0 0 0-60.16zM725.333333 347.306667a42.666667 42.666667 0 0 0 29.44-11.946667l61.44-59.306667A42.666667 42.666667 0 0 0 758.613333 213.333333l-61.44 60.586667a42.666667 42.666667 0 0 0 0 60.16 42.666667 42.666667 0 0 0 28.16 13.226667zM512 768a42.666667 42.666667 0 0 0-42.666667 42.666667v85.333333a42.666667 42.666667 0 0 0 85.333334 0v-85.333333a42.666667 42.666667 0 0 0-42.666667-42.666667zM756.48 688.64a42.666667 42.666667 0 0 0-59.306667 61.44L758.613333 810.666667a42.666667 42.666667 0 0 0 29.44 11.946666 42.666667 42.666667 0 0 0 30.72-12.8 42.666667 42.666667 0 0 0 0-60.586666zM267.52 688.64l-61.44 59.306667a42.666667 42.666667 0 0 0 0 60.586666 42.666667 42.666667 0 0 0 30.72 12.8 42.666667 42.666667 0 0 0 28.586667-10.666666l61.44-59.306667a42.666667 42.666667 0 0 0-59.306667-61.44zM512 341.333333a170.666667 170.666667 0 1 0 170.666667 170.666667 170.666667 170.666667 0 0 0-170.666667-170.666667z"
        />
      </svg>
    </div>
    <div
      class="item night"
      :class="{ active: isDarkmode }"
    >
      <svg
        class="icon"
        viewBox="0 0 1024 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M935.538601 630.40178c-11.43005-11.432249-28.673759-14.738607-43.531086-8.353536-46.733115 20.10317-96.362866 30.296859-147.50719 30.296859-99.589478 0-193.221796-38.783705-263.640252-109.20316-108.636744-108.636744-139.609745-270.022125-78.9083-411.148441 6.388069-14.85233 3.078713-32.098837-8.353536-43.532285-11.432249-11.432249-28.675758-14.743604-43.532285-8.354536-52.637312 22.64025-100.017388 54.809439-140.82552 95.616372-85.346135 85.346135-132.346869 198.821199-132.346869 319.519766 0 120.699566 47.001733 234.172631 132.347868 319.518766s198.821199 132.349067 319.517567 132.349067c120.699566 0 234.172431-47.002932 319.520765-132.351066 40.808132-40.810131 72.977122-88.190207 95.615373-140.82552C950.282205 659.081735 946.971849 641.834029 935.538601 630.40178z"
          p-id="3638"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    isDarkmode: { type: Boolean, default: false }
  }),

  mounted () {
    const darkmode = localStorage.getItem('darkmode')
    const classes = document.body.classList

    this.isDarkmode = darkmode === 'true'
    if (darkmode === 'true') {
      classes.add('theme-dark')
    } else {
      classes.add('theme-light')
    }
  },

  methods: {
    toggleDarkmode () {
      this.isDarkmode = !this.isDarkmode

      const classes = document.body.classList
      const changeClass = (domClass, insert, remove) => {
        domClass.remove(...remove)
        const oldClasses = [...domClass]
        domClass.value = ''
        domClass.add(...insert, ...oldClasses)
      }

      if (this.isDarkmode) {
        changeClass(classes, ['theme-dark'], ['theme-light'])
      } else {
        changeClass(classes, ['theme-light'], ['theme-dark'])
      }

      localStorage.setItem('darkmode', String(this.isDarkmode))
    }
  }
}
</script>

<style lang="stylus" scoped>
.darkmode-switch
  display flex
  flex-shrink 0
  border-radius 4px
  overflow hidden
  align-self center
  margin-right 0.5rem
  height 22px

  &:hover
    cursor pointer

  .item
    padding 3px
    line-height 1
    border 1px solid $accentColor

    &.day
      border-top-left-radius 4px
      border-bottom-left-radius 4px

    &.night
      border-top-right-radius 4px
      border-bottom-right-radius 4px

    .icon
      width 14px
      height 14px
      fill $accentColor

    &.active
      background-color $accentColor

      &:hover
        cursor default

      .icon
        fill #fff
</style>
