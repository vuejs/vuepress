import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/lib/composables'
import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from '@vuepress/plugin-theme-data/lib/composables'
import type { DefaultThemeData } from '../types'

export const useThemeData = (): ThemeDataRef<DefaultThemeData> =>
  _useThemeData<DefaultThemeData>()
export const useThemeLocaleData = (): ThemeLocaleDataRef<DefaultThemeData> =>
  _useThemeLocaleData<DefaultThemeData>()
