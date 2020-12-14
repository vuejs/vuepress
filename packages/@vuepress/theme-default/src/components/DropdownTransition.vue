<template>
  <Transition
    name="dropdown"
    @enter="setHeight"
    @after-enter="unsetHeight"
    @before-leave="setHeight"
  >
    <slot />
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DropdownTransition',

  setup() {
    const setHeight = (items): void => {
      // explicitly set height so that it can be transitioned
      items.style.height = items.scrollHeight + 'px'
    }

    const unsetHeight = (items): void => {
      items.style.height = ''
    }

    return {
      setHeight,
      unsetHeight,
    }
  },
})
</script>
