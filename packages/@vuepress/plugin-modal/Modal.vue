<template>
  <div>
    <div class="ModalContainer">
      <button
        type="button"
        @click="open">
        <slot name="modalaction"></slot>
      </button>
    </div>
    <div
      class="Modal"
      v-if="isOpen"
      @keydown.esc="close">

      <div class="Modal-Overlay" @click="close"></div>
      <div class="Modal-Body">

        <div class="Modal-Body-header">
          <h3 class="title">
            <slot name="title"></slot>
          </h3>
          <slot name="description"></slot>
          <button
            type="button"
            class="modal-close-button"
            @click="close">
            &times;
        </button>

        </div>
        <div class="Modal-Body-content">
          <slot name="content"></slot>

        </div>
        <div class="Modal-Body-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {

  data () {
    return {
      isOpen: false
    }
  },

  methods: {
    close () {
      this.isOpen = false
      this.$emit('closeModal', this.isOpen)
    },

    open () {
      this.isOpen = true
      this.$emit('OpenModal', this.isOpen)
    }
  }
}
</script>
<style lang="stylus">
.Modal
  &, &-Overlay
    position: fixed
    top: 0
    left: 0
    width: 100vw
    height: 100vh
    z-index: 100
  &-Overlay
    background-color: #000
    transition-duration: .4s
    animation: modal-fade .4s forwards
    opacity: .5
  &-Body
    position: absolute
    left: 50%
    top: 50%
    z-index: 99999
    transform: translateY(-50%) translateX(-50%)
    background: white
    box-shadow: 0 5px 25px 0 rgba(0, 0, 0, 0.25)
    transition-duration: .4s
    animation: slide-body-top .4s forwards
    border-radius: $border-radius
    padding: 20px
    &-header
      position: relative
      margin-bottom: 20px
      .title
        font-size: 1.75em;
      .modal-close-button
        position: absolute;
        right: 0;
        top: -10px;
        background: transparent;
        padding: 0;
        border-radius: 0;
        display: flex;
        align-items: center;
        line-height: 0;
        justify-content: center;
        font-size: 1.75em;
        width: 1em;
        height: 1em;
        font-weight: bold;
        border: 0;
    &-content
      height: 50vh
      width: 50vw
      overflow-y: scroll
    &-footer
      box-shadow: 0 -5px 16px 0 rgba(0, 0, 0, 0.02)
      padding-top: 18px
@keyframes
  0$
    opacity: 0
  100$
    opacity: 0.53
@keyframes
  0$
    transform: translateX(-50%) translateY(-100%)
  100$
    transform: translateX(-50%) translateY(-50%)
</style>
