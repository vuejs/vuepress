module.exports = {
  rules: {
    "@textlint-rule/no-unmatched-pair": true,
    apostrophe: true,
    "common-misspellings": true,
    diacritics: true,
    "en-capitalization": false,
    "stop-words": {
      severity: "warning"
    },
    terminology: {
      terms: [
        "VuePress",
        "sass",
        [
          "front[- ]matter",
          "frontmatter"
        ]
      ]
    },
    "write-good": {
      severity: "warning"
    }
  },
  filters: {
    comments: true
  }
};
