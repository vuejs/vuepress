import { onMounted, onUnmounted, ref, watch } from 'vue'
import type { Ref } from 'vue'

export const useDarkMode = (): Ref<boolean> => {
  const isDarkMode = ref(false)

  const updateDarkModeClass = (value = isDarkMode.value): void => {
    // set `class="dark"` on `<html>` element
    const htmlEl = window?.document.querySelector('html')
    htmlEl?.classList.toggle('dark', value)
  }

  const mediaQuery = ref<MediaQueryList | null>(null)
  const onMediaQueryChange = (event: MediaQueryListEvent): void => {
    isDarkMode.value = event.matches
  }

  onMounted(() => {
    // get `prefers-color-scheme` media query and set the initial mode
    mediaQuery.value = window.matchMedia('(prefers-color-scheme: dark)')
    isDarkMode.value = mediaQuery.value.matches

    // watch changes
    mediaQuery.value.addEventListener('change', onMediaQueryChange)
    watch(isDarkMode, updateDarkModeClass, { immediate: true })
  })

  onUnmounted(() => {
    mediaQuery.value?.removeEventListener('change', onMediaQueryChange)
    updateDarkModeClass(false)
  })

  return isDarkMode
}
