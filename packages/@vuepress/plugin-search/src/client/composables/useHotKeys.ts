import { onMounted, onBeforeUnmount } from 'vue'
import type { Ref } from 'vue'

export const useHotKeys = ({
  input,
  hotKeys,
}: {
  input: Ref<HTMLInputElement | null>
  hotKeys: Ref<string[]>
}): void => {
  const onKeydown = (event: KeyboardEvent): void => {
    if (!input.value || hotKeys.value.length === 0) return
    if (event.target === document.body && hotKeys.value.includes(event.key)) {
      input.value.focus()
      event.preventDefault()
    }
  }

  onMounted(() => {
    document.addEventListener('keydown', onKeydown)
  })

  onBeforeUnmount(() => {
    document.removeEventListener('keydown', onKeydown)
  })
}
