exports.compose = (...processors) => {
  if (processors.length === 0) return input => input
  if (processors.length === 1) return processors[0]
  return processors.reduce((prev, next) => {
    return (...args) => next(prev(...args))
  })
}
