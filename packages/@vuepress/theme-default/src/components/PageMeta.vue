<template>
  <footer class="page-meta">
    <div v-if="editNavLink" class="edit-link">
      <NavLink :item="editNavLink" />
    </div>

    <div v-if="lastUpdated" class="last-updated">
      <span class="prefix">{{ lastUpdatedText }}:</span>
      <span class="time">{{ lastUpdated }}</span>
    </div>
  </footer>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { ComputedRef } from 'vue'
import {
  usePageData,
  usePageFrontmatter,
  useThemeLocaleData,
} from '@vuepress/client'
import type {
  DefaultThemeOptions,
  ExtendedPageData,
  NavLink as NavLinkType,
} from '../../types'
import { resolveEditLink } from '../utils'
import NavLink from './NavLink.vue'

const useEditNavLink = (): ComputedRef<null | NavLinkType> => {
  const themeLocale = useThemeLocaleData<DefaultThemeOptions>()
  const frontmatter = usePageFrontmatter()

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true
    if (!showEditLink) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'master',
      docsDir = '',
      editLinkText,
    } = themeLocale.value

    if (!docsRepo) return null

    const page = usePageData<ExtendedPageData>()

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern: themeLocale.value.editLinkPattern,
    })

    if (!editLink) return null

    return {
      text: editLinkText ?? 'Edit this page',
      link: editLink,
    }
  })
}

export default defineComponent({
  name: 'PageMeta',

  components: {
    NavLink,
  },

  setup() {
    const editNavLink = useEditNavLink()
    return {
      editNavLink,
      // TODO
      lastUpdated: null,
      lastUpdatedText: null,
    }
  },
})
</script>

<style lang="stylus">
@require '../styles/config.styl'
@require '../styles/wrapper.styl'

.page-meta
  @extend $wrapper
  padding-top 1rem
  padding-bottom 1rem
  overflow auto

  .edit-link
    display inline-block
    a
      color lighten($textColor, 25%)
      margin-right 0.25rem
  .last-updated
    float right
    font-size 0.9em
    .prefix
      font-weight 500
      color lighten($textColor, 25%)
    .time
      font-weight 400
      color #767676

@media (max-width: $MQMobile)
  .page-meta
    .edit-link
      margin-bottom 0.5rem
    .last-updated
      font-size 0.8em
      float none
      text-align left
</style>
