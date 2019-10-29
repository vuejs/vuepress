const required = input => !!input

const isJSON = input => {
  try {
    JSON.parse(input)
    return true
  } catch (e) {
    return 'This input must be a valid JSON object'
  }
}

const isNumber = input => !isNaN(input) || 'This input must be a number'

module.exports = {
  required,
  isJSON,
  isNumber
}
