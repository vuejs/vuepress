import { readonly, ref } from 'vue'
import type { Ref } from 'vue'
import { themeData as themeDataRaw } from '@internal/themeData'
import type { ThemeData } from '../types'

declare const __VUE_HMR_RUNTIME__: Record<string, any>

export type ThemeDataRef<T extends ThemeData = ThemeData> = Ref<T>

export const themeData: ThemeDataRef = ref(readonly(themeDataRaw) as ThemeData)

export const useThemeData = <
  T extends ThemeData = ThemeData
>(): ThemeDataRef<T> => themeData as ThemeDataRef<T>

if (import.meta.webpackHot || import.meta.hot) {
  __VUE_HMR_RUNTIME__.updateThemeData = (data: ThemeData) => {
    themeData.value = readonly(data) as ThemeData
  }
}
