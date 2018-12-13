/**
 * Build functional pipeline.
 */

type Pipe<T, U> = (...args: T[]) => U

export = function compose<T> (...processors: Array<Pipe<any, T>>): Pipe<any, T> {
  if (processors.length === 0) return (input: T) => input
  if (processors.length === 1) return processors[0]
  return processors.reduce((prev, next) => {
    return (...args: any[]) => next(prev(...args))
  })
}
