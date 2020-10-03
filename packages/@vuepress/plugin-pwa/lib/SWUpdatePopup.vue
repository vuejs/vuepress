<template>
  <transition name="sw-update-popup">
    <slot
      :reload="reload"
      :enabled="enabled"
      :message="message"
    >
      <div
        v-if="enabled"
        class="sw-update-popup"
        @click="reload"
      >
        <span class="text">{{ message }}</span>
        <span class="refresh">
          <svg
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="84"
            height="84"
          >
            <path
              d="M949.948959 146.249899l0 255.82655c0 21.980617-13.988596 35.969213-35.969213 35.969213l-255.82655
              0c-13.988596 0-25.982768-7.992021-33.972742-21.980617-5.997598-13.988596-4.001127-27.977191
              7.990998-39.97034l79.941704-77.945233c-55.954383-51.973722-121.917724-77.955466-199.862957-77.955466-37.974893 0-75.949786 8.002254-113.924679 21.99085-37.974893 15.984043-67.947532 37.974893-91.933829
              63.956637-25.981744 23.986297-47.972595 53.958936-63.956637 91.933829-29.982872 73.954339-29.982872
              153.895019 0 227.849358 15.984043 37.975916 37.974893 67.947532 63.956637 91.933829 23.986297 25.982768
              53.958936 47.973618 91.933829 63.956637 37.974893 13.988596 75.949786 21.99085 113.924679 21.99085
              45.966914 0 87.941911-9.997702 127.913275-29.981848 41.97602-17.989723 75.950809-45.966914
              101.930507-83.942831 7.993045-4.001127 11.994172-5.995551 13.988596-5.995551 5.997598 0 9.998725
              1.994424 13.988596 5.995551l77.957513 77.945233c3.988848 4.001127 5.986341 7.993045 5.986341
              11.994172 0 1.994424-1.99647 5.995551-3.990894 11.994172-43.972491 51.962465-93.940532
              91.933829-151.898549 117.91455-53.958936 25.982768-115.921149 39.971363-185.874361
              39.971363-61.96119 0-119.921253-11.983939-169.889295-33.972742C284.40084 889.74325 236.438479
              857.764931 202.464713
              821.785485c-35.979446-33.972742-67.957765-81.936127-93.939509-139.897214-45.966914-101.930507-45.966914-237.846036 0-339.777567 25.981744-57.960063 57.960063-105.922425 93.939509-139.89619
              33.973766-35.979446 81.936127-67.957765 139.89619-93.939509 49.968042-21.99085
              107.928105-33.973766 169.889295-33.973766 55.963593 0 109.923552 9.987468 161.886017
              29.972639 53.969169 21.99085 101.932554 51.963489 139.907447 89.938382l73.954339-73.944106c9.987468-9.997702 23.987321-13.988596 39.971363-8.002254C941.956937 120.268154 949.948959 132.261303
              949.948959 146.249899z"
            />
          </svg>
        </span>
      </div>
    </slot>
  </transition>
</template>

<script>
/* global SW_UPDATE_POPUP */
import event from './event'
import { normalizeConfig } from '@app/util'
import { popupConfig as defaultPopupConfig } from './i18n'

export default {
  name: 'SWUpdatePopup',

  data () {
    return {
      rawPopupConfig: SW_UPDATE_POPUP,
      updateEvent: null
    }
  },

  computed: {
    popupConfig () {
      return normalizeConfig(this, this.rawPopupConfig)
    },

    enabled () {
      return Boolean(this.popupConfig && this.updateEvent)
    },

    message () {
      const c = this.popupConfig
      return (c && c.message) || defaultPopupConfig['/'].message
    },

    buttonText () {
      const c = this.popupConfig
      return (c && c.buttonText) || defaultPopupConfig['/'].buttonText
    }
  },

  created () {
    event.$on('sw-updated', this.onSWUpdated)
    if (SW_UPDATE_POPUP === true) {
      this.rawPopupConfig = defaultPopupConfig
    }
  },

  methods: {
    onSWUpdated (e) {
      this.updateEvent = e
    },

    reload () {
      if (this.updateEvent) {
        this.updateEvent.skipWaiting().then(() => {
          location.reload(true)
        })
        this.updateEvent = null
      }
    }
  }
}
</script>

<style lang="stylus">
@keyframes rotate
  0%
    -webkit-transform rotate(0deg)
    transform rotate(0deg)

  50%
    -webkit-transform rotate(360deg)
    transform rotate(360deg)

  100%
    -webkit-transform rotate(360deg)
    transform rotate(360deg)

.sw-update-popup
  position fixed
  right 1.5em
  bottom 1.5em
  padding 10px 12px
  display flex
  justify-content center
  align-items center
  border-radius 6px
  background #fff
  box-shadow 2px 2px 8px 4px rgba(0, 0, 0, 0.15)
  z-index 2
  cursor pointer

  .text
    font-size 15px

  .refresh
    width 24px
    height 24px
    margin-left 6px
    background-color $accentColor
    border-radius 50%

    svg
      animation rotate 3s ease infinite
      width 70%
      height 70%
      margin 15%
      fill #fff

.sw-update-popup-enter-active, .sw-update-popup-leave-active
  transition opacity 0.3s, transform 0.3s

.sw-update-popup-enter, .sw-update-popup-leave-to
  opacity 0
  transform translate(0, 50%) scale(0.5)
</style>
