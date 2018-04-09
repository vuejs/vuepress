<script>
export default {
  functional: true,
  props: ['item'],
  render (h, { parent: { $route }, props: { item }}) {
    return h('router-link', {
      props: {
        to: item.path,
        activeClass: '',
        exactActiveClass: ''
      },
      class: {
        'sidebar-link': true,
        // use custom active class matching logic
        // due to edge case of paths ending with / + hash
        active: isActive($route, item)
      }
    }, [item.title || item.path])
  }
}

const hashRE = /#.*$/
const extRE = /\.(md|html)$/
const slashRE = /\/$/

export function isActive (route, page) {
  const routePath = normalize(route.path)
  const pagePath = normalize(page.path)
  if (routePath === '/' || pagePath === '/') {
    return routePath === pagePath
  } else {
    return routePath.indexOf(pagePath) === 0
  }
}

export function normalize (path) {
  return path
    .replace(hashRE, '')
    .replace(extRE, '')
}

export function ensureExt (path) {
  if (slashRE.test(path)) {
    return path
  }
  const hashMatch = path.match(hashRE)
  const hash = hashMatch ? hashMatch[0] : ''
  return normalize(path) + '.html' + hash
}
</script>

<style lang="stylus">
@import './styles/config.stylus'

a.sidebar-link
  display inline-block
  color $textColor
  border-left 0.25rem solid transparent
  padding 0.25rem
  padding-left 1.25rem
  &:hover
    color $accentColor
  &.active
    font-weight 600
    color $accentColor
    border-left-color $accentColor
</style>
