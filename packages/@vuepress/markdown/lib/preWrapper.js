// markdown-it plugin for wrapping <pre> ... </pre>.
//
// If your plugin was chained before preWrapper, you can add additional eleemnt directly.
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
    return `<!--beforebegin--><div class="language-${token.info.trim()} extra-class">`
    + `<!--afterbegin-->${rawCode}<!--beforeend--></div><!--afterend-->`
  }
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = wrap(fence)
  const codeBlock = md.renderer.rules.code_block
  md.renderer.rules.code_block = wrap(codeBlock)
}
