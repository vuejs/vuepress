import { readonly, ref } from 'vue'
import type { Ref } from 'vue'
import { themeData as themeDataRaw } from '@internal/themeData'
import type { ThemeData } from '../types'

export type ThemeDataRef<T extends ThemeData = ThemeData> = Ref<T>

export const themeData: ThemeDataRef = ref(readonly(themeDataRaw) as ThemeData)

export const useThemeData = <
  T extends ThemeData = ThemeData
>(): ThemeDataRef<T> => themeData as ThemeDataRef<T>

if (import.meta.webpackHot) {
  import.meta.webpackHot!.accept('@internal/themeData', () => {
    themeData.value = readonly(themeDataRaw) as ThemeData
  })
}

if (import.meta.hot) {
  import.meta.hot!.accept('@internal/themeData', () => {
    themeData.value = readonly(themeDataRaw) as ThemeData
  })
}
