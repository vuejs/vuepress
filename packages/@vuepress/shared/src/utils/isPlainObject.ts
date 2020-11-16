/**
 * Check if a value is plain object, with generic type support
 */
export const isPlainObject = <T extends Record<any, any> = Record<any, any>>(
  val: unknown
): val is T => Object.prototype.toString.call(val) === '[object Object]'
