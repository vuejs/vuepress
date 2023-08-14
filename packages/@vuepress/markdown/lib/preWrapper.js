// markdown-it plugin for wrapping <pre> ... </pre>.
//
// If your plugin was chained before preWrapper, you can add additional element directly.
// If your plugin was chained after preWrapper, you can use these slots:
//   1. <!--beforebegin-->
//   2. <!--afterbegin-->
//   3. <!--beforeend-->
//   4. <!--afterend-->

module.exports = md => {
  const wrap = (wrapped) => (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    const rawCode = wrapped(...args)
    const tokenInfo = token.info.trim().replace(/\"/g, '\'')
    return `<!--beforebegin--><div class="language-${tokenInfo} extra-class">`
    + `<!--afterbegin-->${rawCode}<!--beforeend--></div><!--afterend-->`
  }
  const { fence, code_block: codeBlock } = md.renderer.rules
  md.renderer.rules.fence = wrap(fence)
  md.renderer.rules.code_block = wrap(codeBlock)
}
