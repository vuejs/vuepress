<template>
  <transition name="sw-update-popup">
    <slot
      :reload="reload"
      :enabled="enabled"
      :message="message"
      :buttonText="buttonText"
    >
      <div
        v-if="enabled"
        class="sw-update-popup"
      >
        {{ message }}<br>
        <button @click="reload">{{ buttonText }}</button>
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
  data () {
    return {
      rawPopupConfig: SW_UPDATE_POPUP,
      updateEvent: null
    }
  },

  created () {
    event.$on('sw-updated', this.onSWUpdated)
    if (SW_UPDATE_POPUP === true) {
      this.rawPopupConfig = defaultPopupConfig
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

<style scoped>
.sw-update-popup {
  position: fixed;
  right: 1em;
  bottom: 1em;
  padding: 1em;
  border: 1px solid #3eaf7c;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
  text-align: center;
  z-index: 2;
}

.sw-update-popup > button {
  margin-top: 0.5em;
  padding: 0.25em 2em;
}

.sw-update-popup-enter-active, .sw-update-popup-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.sw-update-popup-enter, .sw-update-popup-leave-to {
  opacity: 0;
  transform: translate(0, 50%) scale(0.5);
}
</style>
