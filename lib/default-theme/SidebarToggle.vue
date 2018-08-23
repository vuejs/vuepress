<template>
  <div
    class="sidebar__toggle"
    v-if="!isToggleHidden">
    <span class="arrow"
      :class="[isSidebarHidden ? 'right' : 'left']"/>
    <span class="sidebar__toggle-label" @click="toggleSidebar()">
      {{ isSidebarHidden ? this.showTextLabel : this.hideTextLabel }}
    </span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isSidebarHidden: false,
      isToggleHidden: false,
      pageClassList: null,
      sidebarClassList: null,
      showTextLabel: null,
      hideTextLabel: null
    }
  },
  methods: {
    getSidebarToggleLabels () {
      try {
        this.showTextLabel = this.$themeLocaleConfig.sidebar.toggle.showText
        this.hideTextLabel = this.$themeLocaleConfig.sidebar.toggle.hideText
      }
      catch {
        this.showTextLabel = 'Show sidebar'
        this.hideTextLabel = 'Hide sidebar'
      }
    },
    setPageClassList () {
      this.pageClassList = this.$parent.$parent.$refs.page.$el.classList
    },
    setSidebarClassList () {
      this.sidebarClassList = this.$parent.$el.classList
    },
    toggleSidebar () {
      this.setPageClassList()
      this.setSidebarClassList()

      if (this.isSidebarHidden) {
        this.sidebarClassList.remove('shrink')
        this.pageClassList.remove('widen')
      } else {
        this.sidebarClassList.add('shrink')
        this.pageClassList.add('widen')
      }

      this.isSidebarHidden = !this.isSidebarHidden
    },
  },
  mounted () {
    this.getSidebarToggleLabels()
  },
  watch: {
    '$route' () {
      if (!Object.keys(this.$site.themeConfig.locales).includes(this.$route.path)) {
        this.setPageClassList()
        this.setSidebarClassList()
        this.getSidebarToggleLabels()
        if (this.sidebarClassList.contains('shrink')) {
          this.pageClassList.add('widen')
        }
      }
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.page
  transition all .2s ease
  &.widen
    padding-left 0rem

.content
  position relative

.sidebar
  white-space nowrap
  transition all .2s ease

  &__toggle
    transition all .2s ease
    padding-right .25rem
    display inline-block
    position fixed
    top 0
    left 16.4rem
    height 100%
    writing-mode vertical-lr
    text-align center
    @media (min-width: $MQNarrow)
      left 20rem

    &-label
      cursor pointer
      font-size small
      font-weight 500
      color lighten($textColor, 25%)
      margin-left .25rem

  &.shrink
    margin-left -16.4rem
    @media (min-width: $MQNarrow)
      margin-left -20rem
    & > ^[0]__toggle
      transition all .2s ease
      left 0
      

::-webkit-scrollbar
    width 5px
    height @width

::-webkit-scrollbar-track
    background $borderColor

::-webkit-scrollbar-thumb
    background $accentColor
</style>
