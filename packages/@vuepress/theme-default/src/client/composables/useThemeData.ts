import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/lib/client'
import type {
  ThemeDataRef,
  ThemeLocaleDataRef,
} from '@vuepress/plugin-theme-data/lib/client'
import type { DefaultThemeData } from '../../shared'

export const useThemeData = (): ThemeDataRef<DefaultThemeData> =>
  _useThemeData<DefaultThemeData>()
export const useThemeLocaleData = (): ThemeLocaleDataRef<DefaultThemeData> =>
  _useThemeLocaleData<DefaultThemeData>()
