export const compose = <T>(
  ...processors: ((input: T) => T)[]
): ((input: T) => T) => {
  if (processors.length === 0) return (input) => input

  if (processors.length === 1) return processors[0]

  return processors.reduce((prev, next) => (str) => next(prev(str)))
}
