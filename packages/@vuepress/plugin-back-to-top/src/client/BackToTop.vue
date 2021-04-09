<template>
  <Transition name="back-to-top">
    <svg
      v-if="show"
      class="back-to-top"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 49.484 28.284"
      @click="scrollToTop"
    >
      <g transform="translate(-229 -126.358)">
        <rect
          fill="currentColor"
          width="35"
          height="5"
          rx="2"
          transform="translate(229 151.107) rotate(-45)"
        />
        <rect
          fill="currentColor"
          width="35"
          height="5"
          rx="2"
          transform="translate(274.949 154.642) rotate(-135)"
        />
      </g>
    </svg>
  </Transition>
</template>

<script lang="ts">
import { debounce } from 'ts-debounce'
import { computed, defineComponent, onMounted, ref } from 'vue'

const getScrollTop = (): number =>
  window.pageYOffset ||
  document.documentElement.scrollTop ||
  document.body.scrollTop ||
  0

const scrollToTop = (): void => window.scrollTo({ top: 0, behavior: 'smooth' })

export default defineComponent({
  name: 'BackToTop',

  setup() {
    const scrollTop = ref(0)
    const show = computed(() => scrollTop.value > 300)

    onMounted(() => {
      scrollTop.value = getScrollTop()

      window.addEventListener(
        'scroll',
        debounce(() => {
          scrollTop.value = getScrollTop()
        }, 100)
      )
    })

    return {
      show,
      scrollToTop,
    }
  },
})
</script>

<style>
:root {
  --back-to-top-color: #3eaf7c;
  --back-to-top-color-hover: #71cda3;
}

.back-to-top {
  cursor: pointer;
  position: fixed;
  bottom: 2rem;
  right: 2.5rem;
  width: 2rem;
  color: var(--back-to-top-color);
  z-index: 1;
}

.back-to-top:hover {
  color: var(--back-to-top-color-hover);
}

@media (max-width: 959px) {
  #back-to-top {
    display: none;
  }
}

.back-to-top-enter-active,
.back-to-top-leave-active {
  transition: opacity 0.3s;
}

.back-to-top-enter-from,
.back-to-top-leave-to {
  opacity: 0;
}
</style>
