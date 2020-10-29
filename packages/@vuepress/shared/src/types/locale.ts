/**
 * Locales config, a key-value object
 *
 * - Key is the locale path (prefix)
 * - Value is the locales data
 *
 * @remark suffix `Config` means this is for user config
 */
export type LocaleConfig<T extends LocaleData = LocaleData> = Record<
  string,
  Partial<T>
>

/**
 * Locales data
 */
export type LocaleData = Record<string, any>
