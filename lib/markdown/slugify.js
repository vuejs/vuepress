// string.js slugify drops non ascii chars so we have to
// use a custom implementation here
const removeDiacritics = require('diacritics').remove
// eslint-disable-next-line no-control-regex
const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'<>,.?/]+/g

module.exports = function slugify (str) {
  return removeDiacritics(str)
    // Remove control characters
    .replace(rControl, '')
    // Replace special characters
    .replace(rSpecial, '-')
    // Remove continous separators
    .replace(/\-{2,}/g, '-')
    // Remove prefixing and trailing separtors
    .replace(/^\-+|\-+$/g, '')
    // lowercase
    .toLowerCase()
}
