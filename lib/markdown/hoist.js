module.exports = md => {
  const RE = /^<(script|style)(?=(\s|>|$))/i
  let hoistedTags

  md.renderer.rules.html_block = (tokens, idx) => {
    const content = tokens[idx].content
    if (hoistedTags && RE.test(content.trim())) {
      hoistedTags.push(content)
      return ''
    } else {
      return content
    }
  }

  md.renderWithHoisting = (...args) => {
    hoistedTags = []
    const html = md.render(...args)
    return {
      html,
      hoistedTags
    }
  }
}
