import {
  useThemeData as _useThemeData,
  useThemeLocaleData as _useThemeLocaleData,
} from '@vuepress/plugin-theme-data/lib/composables'
import type { DefaultThemeData } from '../types'

export const useThemeData = () => _useThemeData<DefaultThemeData>()
export const useThemeLocaleData = () => _useThemeLocaleData<DefaultThemeData>()
