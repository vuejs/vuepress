import { ref, onMounted, defineComponent } from 'vue'

export const ClientOnly = defineComponent({
  setup(_, ctx) {
    const isMounted = ref(false)
    onMounted(() => {
      isMounted.value = true
    })
    return () => (isMounted.value ? ctx.slots.default?.() : null)
  },
})
