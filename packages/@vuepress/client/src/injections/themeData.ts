import { inject } from 'vue'
import type { ComputedRef, InjectionKey } from 'vue'
import type { LocaleData, SiteData, SiteThemeConfig } from '@vuepress/shared'

export type ThemeData<T extends LocaleData = LocaleData> = SiteThemeConfig<T>

export type ThemeDataRef<T extends LocaleData = LocaleData> = ComputedRef<
  ThemeData<T>
>

export const themeDataSymbol: InjectionKey<ThemeDataRef> = Symbol(
  __DEV__ ? 'themeData' : ''
)

export const themeLocaleDataSymbol: InjectionKey<ThemeDataRef> = Symbol(
  __DEV__ ? 'themeLocaleData' : ''
)

export const useThemeData = <T extends LocaleData = LocaleData>(): ThemeDataRef<
  T
> => {
  const themeData = inject(themeDataSymbol)
  if (!themeData) {
    throw new Error('useThemeData() is called without provider.')
  }
  return themeData as ThemeDataRef<T>
}

export const useThemeLocaleData = <
  T extends LocaleData = LocaleData
>(): ThemeDataRef<T> => {
  const themeLocaleData = inject(themeLocaleDataSymbol)
  if (!themeLocaleData) {
    throw new Error('useThemeLocaleData() is called without provider.')
  }
  return themeLocaleData as ThemeDataRef<T>
}

export const resolveThemeData = <T extends LocaleData = LocaleData>(
  siteData: SiteData<T>
): ThemeData<T> => siteData.themeConfig as ThemeData<T>

export const resolveThemeLocaleData = resolveThemeData
