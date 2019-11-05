const required = input => !!input

const isJSON = input => {
  try {
    const res = JSON.parse(input)

    // JSON.parse('"something"') will not throw an error but return a string
    if (typeof res === 'string') throw new Error()

    return true
  } catch (e) {
    return 'This input must be a valid JSON object'
  }
}

const isJSONOrAuto = input => {
  if (input === 'auto' || input === '"auto"') return true

  const isJSONValue = isJSON(input)

  return isJSONValue !== true
    ? "This input must be a valid JSON object or 'auto' value"
    : isJSONValue
}

const isNumber = input => !isNaN(input) || 'This input must be a number'

module.exports = {
  required,
  isJSON,
  isJSONOrAuto,
  isNumber
}
