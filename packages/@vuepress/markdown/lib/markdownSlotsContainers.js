const container = require('markdown-it-container')

const SLOT_KEY = 'slot'

module.exports = md => {
  md
    .use(container, SLOT_KEY, {
      render: (tokens, idx) => tokens[idx].nesting === 1
        ? `<template slot="${tokens[idx].info.trim().slice(SLOT_KEY.length).trim()}">`
        : '</template>'
    })
}
