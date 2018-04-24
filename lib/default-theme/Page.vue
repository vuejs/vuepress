<template>
  <div class="page">
    <Content :custom="false"/>
    <div class="content edit-link" v-if="editLink">
      <a :href="editLink" target="_blank" rel="noopener noreferrer">{{ editLinkText }}</a>
      <OutboundLink/>
    </div>
    <div class="content page-nav" v-if="prev || next">
      <p class="inner">
        <span v-if="prev" class="prev">
          ← <router-link v-if="prev" class="prev" :to="prev.path">
            {{ prev.title || prev.path }}
          </router-link>
        </span>
        <span v-if="next" class="next">
          <router-link v-if="next" :to="next.path">
            {{ next.title || next.path }}
          </router-link> →
        </span>
      </p>
    </div>
    <slot name="bottom"/>
  </div>
</template>

<script>
import OutboundLink from './OutboundLink.vue'
import { resolvePage, normalize, outboundRE, endingSlashRE } from './util'

export default {
  components: { OutboundLink },
  props: ['sidebarItems'],
  computed: {
    prev () {
      const prev = this.$page.frontmatter.prev
      if (prev === false) {
        return
      } else if (prev) {
        return resolvePage(this.$site.pages, prev, this.$route.path)
      } else {
        return resolvePrev(this.$page, this.sidebarItems)
      }
    },
    next () {
      const next = this.$page.frontmatter.next
      if (next === false) {
        return
      } else if (next) {
        return resolvePage(this.$site.pages, next, this.$route.path)
      } else {
        return resolveNext(this.$page, this.sidebarItems)
      }
    },
    editLink () {
      const {
        repo,
        editLinks,
        docsDir = '',
        docsBranch = 'master',
        docsRepo = repo
      } = this.$site.themeConfig

      let path = normalize(this.$page.path)
      if (endingSlashRE.test(path)) {
        path += 'README.md'
      } else {
        path += '.md'
      }

      if (docsRepo && editLinks) {
        const base = outboundRE.test(docsRepo)
          ? docsRepo
          : `https://github.com/${docsRepo}`
        return (
          base.replace(endingSlashRE, '') +
          `/edit/${docsBranch}/` +
          docsDir.replace(endingSlashRE, '') +
          path
        )
      }
    },
    editLinkText () {
      return (
        this.$themeLocaleConfig.editLinkText ||
        this.$site.themeConfig.editLinkText ||
        `Edit this page`
      )
    }
  }
}

function resolvePrev (page, items) {
  return find(page, items, -1)
}

function resolveNext (page, items) {
  return find(page, items, 1)
}

function find (page, items, offset) {
  const res = []
  items.forEach(item => {
    if (item.type === 'group') {
      res.push(...item.children || [])
    } else {
      res.push(item)
    }
  })
  for (let i = 0; i < res.length; i++) {
    const cur = res[i]
    if (cur.type === 'page' && cur.path === page.path) {
      return res[i + offset]
    }
  }
}
</script>

<style lang="stylus">
@import './styles/config.styl'

.page
  padding-bottom 2rem

.edit-link.content
  padding-top 0 !important
  a
    color lighten($textColor, 25%)
    margin-right 0.25rem

.page-nav.content
  padding-top 1rem !important
  padding-bottom 0 !important
  .inner
    min-height 2rem
    margin-top 0 !important
    border-top 1px solid $borderColor
    padding-top 1rem
  .next
    float right
</style>
