// markdown-it plugin for wrapping <pre> ... </pre>.
//
// If your plugin was chained before preWrapper, you can add additional element directly.
// If your plugin was chained after preWrapper, you can use these slots:
//   1. <!--beforebegin-->
//   2. <!--afterbegin-->
//   3. <!--beforeend-->
//   4. <!--afterend-->

const noVPreRE = /^(.*){no-v-pre}$/

module.exports = md => {
  const fence = md.renderer.rules.fence
  md.renderer.rules.fence = (...args) => {
    const [tokens, idx] = args
    const token = tokens[idx]
    const rawCode = fence(...args)
    let lang = token.info.replace(noVPreRE, '$1').trim()
    if (!lang) {
      lang = 'text'
    }
    return `<!--beforebegin--><div class="language-${lang} extra-class">` +
    `<!--afterbegin-->${rawCode}<!--beforeend--></div><!--afterend-->`
  }
}
