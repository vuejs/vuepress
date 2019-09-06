module.exports = {
  rules: {
    '@textlint-rule/no-unmatched-pair': true,
    apostrophe: true,
    'common-misspellings': true,
    diacritics: true,
    'en-capitalization': {
      allowHeading: false
    },
    'stop-words': {
      severity: 'warning'
    },
    terminology: {
      terms: `${__dirname}/.textlint.terms.json`
    },
    'write-good': {
      severity: 'warning'
    }
  },
  filters: {
    comments: true
  }
}
