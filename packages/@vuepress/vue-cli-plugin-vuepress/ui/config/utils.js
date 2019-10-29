const get = require('lodash/get')

exports.getJSONObj = (data, prop) => {
  const obj = get(data, prop)
  return JSON.stringify(obj, null, 4)
}
