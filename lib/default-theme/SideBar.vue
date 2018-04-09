<template>
  <div class="sidebar">
    <ul>
      <li v-for="(item, i) in sidebarItems">
        <router-link v-if="item.type === 'page'" :to="item.path">
          {{ item.title || item.path }}
        </router-link>
        <div v-else-if="item.type === 'heading'"
          class="sidebar-group"
          :class="{ first: i === 0 }">
          <p class="sidebar-heading">{{ item.title }}</p>
          <ul>
            <li v-for="child in item.children">
              <router-link v-if="child.type === 'page'" :to="child.path">
                {{ child.title || child.path }}
              </router-link>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
function resolveSidebar (route, site) {
  const { pages, themeConfig } = site
  const sidebarConfig = themeConfig.sidebar
  if (!sidebarConfig) {
    return pages
  } else {
    const matchingConfig = Array.isArray(sidebarConfig)
      ? sidebarConfig
      : resolveMatchingSidebar(route, sidebarConfig)
    return matchingConfig.map(item => resolveItem(item, site.pages))
  }
}

function resolveMatchingSidebar (route, sidebarConfig) {
  for (const base in sidebarConfig) {
    if (ensureEndingSlash(route.path).indexOf(base) === 0) {
      return sidebarConfig[base]
    }
  }
}

function ensureEndingSlash (path) {
  return /(\.html|\/)$/.test(path)
    ? path
    : path + '/'
}

function resolveItem (item, pages) {
  if (typeof item === 'string') {
    return resolvePage(pages, item)
  } else if (Array.isArray(item)) {
    return Object.assign(resolvePage(pages, item[0]), {
      title: item[1]
    })
  } else {
    const children = item.children || []
    return {
      type: 'heading',
      title: item.title,
      children: children.map(child => resolveItem(child, pages)),
      collapsable: children.length && item.collapsable
    }
  }
}

function resolvePage (pages, rawPath) {
  const path = normalize(rawPath)
  for (let i = 0; i < pages.length; i++) {
    if (normalize(pages[i].path) === path) {
      return Object.assign({}, pages[i], {
        type: 'page',
        path: ensureExt(rawPath)
      })
    }
  }
}

const hashRE = /#.*$/
const extRE = /\.(md|html)$/
const slashRE = /\/$/

function normalize (path) {
  return path
    .replace(hashRE, '')
    .replace(extRE, '')
}

function ensureExt (path) {
  if (slashRE.test(path)) {
    return path
  }
  const hashMatch = path.match(hashRE)
  const hash = hashMatch ? hashMatch[0] : ''
  return normalize(path) + '.html' + hash
}

export default {
  computed: {
    sidebarItems () {
      return resolveSidebar(
        this.$route,
        this.$site
      )
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.stylus'

.sidebar
  ul
    padding 0
    margin 0
    list-style-type none
  a
    display inline-block
    color $textColor
    border-left 0.25rem solid transparent
    padding 0.25rem
    padding-left 1.25rem
    &:hover
      color $accentColor
    &.router-link-active
      font-weight 600
      color $accentColor
      border-left-color $accentColor
  .sidebar-group:not(.first)
    margin-top 1.5rem
  .sidebar-heading
    font-size 1.1em
    font-weight bold
    text-transform uppercase
    padding-left 1.5rem
    margin-top 0
    margin-bottom 0.5rem
</style>
