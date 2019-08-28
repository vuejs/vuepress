const chalk = require('chalk')

const isObject = obj => obj !== null && typeof obj === 'object'

const _toString = Object.prototype.toString

const getObjectType = x => _toString.call(x).slice(8, -1)
const isOfType = type => x => typeof x === type // eslint-disable-line valid-typeof
const isObjectOfType = type => x => getObjectType(x) === type

const isFunction = isOfType('function')
const isString = isOfType('string')
const isBoolean = isOfType('boolean')
const isPlainObject = isObjectOfType('Object')
const isUndefined = isOfType('undefined')
const isNull = x => x === null
const isNullOrUndefined = x => isUndefined(x) || isNull(x)

const toRawType = value => _toString.call(value).slice(8, -1)
const getType = function (fn) {
  const match = fn && fn.toString().match(/^\s*function (\w+)/)
  return match ? match[1] : ''
}

function toNaturalMultiTypesLanguage (types) {
  const len = types.length
  if (len === 1) {
    return types.join('')
  }
  const rest = types.slice(0, len - 1)
  const last = types[len - 1]
  return rest.join(', ') + ' or ' + last
}

function assertTypes (value, types) {
  let valid
  let warnMsg
  let actualType = toRawType(value)
  const expectedTypes = []
  if (actualType === 'AsyncFunction') {
    actualType = 'Function'
  }

  for (const type of types) {
    const expectedType = getType(type)
    expectedTypes.push(expectedType)
    valid = actualType === expectedType
    if (valid) break
  }

  if (!valid) {
    warnMsg
      = `expected a ${chalk.green(toNaturalMultiTypesLanguage(expectedTypes))} `
      + `but got ${chalk.yellow(actualType)}.`
  }

  return { valid, warnMsg }
}

module.exports = {
  isObject,
  assertTypes,
  isFunction,
  isString,
  isBoolean,
  isPlainObject,
  isUndefined,
  isNull,
  isNullOrUndefined,
  toRawType,
  getType
}
