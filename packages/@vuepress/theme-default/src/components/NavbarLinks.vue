<template>
  <nav v-if="navbarLinks.length" class="navbar-links">
    <div v-for="item in navbarLinks" :key="item.link" class="navbar-links-item">
      <template v-if="item.children">
        <DropdownLink :item="item" />
      </template>

      <template v-else>
        <NavLink :item="item" />
      </template>
    </div>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import {
  useRouteLocale,
  useThemeLocaleData,
  useSiteLocaleData,
} from '@vuepress/client'
import type {
  DefaultThemeOptions,
  NavbarConfig,
  NavbarGroup,
} from '../../types'
import DropdownLink from './DropdownLink.vue'
import NavLink from './NavLink.vue'

/**
 * Get navbar config of select language dropdown
 */
const useNavbarSelectLanguage = (): ComputedRef<NavbarConfig> => {
  const router = useRouter()
  const routeLocale = useRouteLocale()
  const siteLocale = useSiteLocaleData()
  const themeLocale = useThemeLocaleData<DefaultThemeOptions>()

  return computed<NavbarConfig>(() => {
    const localePaths = Object.keys(siteLocale.value.locales)
    // do not display language selection dropdown if there is only one language
    if (localePaths.length < 2) {
      return []
    }
    const currentPath = router.currentRoute.value.path
    const currentFullPath = router.currentRoute.value.fullPath

    const languageDropdown: NavbarGroup = {
      text: themeLocale.value.selectLanguageText ?? 'unkown language',
      ariaLabel: themeLocale.value.selectLanguageAriaLabel ?? 'unkown language',
      children: localePaths.map((targetLocalePath) => {
        // target locale config of this langauge link
        const targetSiteLocale =
          siteLocale.value.locales?.[targetLocalePath] ?? {}
        const targetThemeLocale =
          themeLocale.value.locales?.[targetLocalePath] ?? {}
        const targetLang = `${targetSiteLocale.lang}`

        const text = targetThemeLocale.selectLanguageName ?? targetLang
        let link

        if (targetLang === siteLocale.value.lang) {
          // if the target language is current language
          // stay at current link
          link = currentFullPath
        } else {
          // if the target language is not current language
          // try to link to the corresponding page of current page
          // or fallback to homepage
          const targetLocalePage = currentPath.replace(
            routeLocale.value,
            targetLocalePath
          )
          if (
            router.getRoutes().some((item) => item.path === targetLocalePage)
          ) {
            link = targetLocalePage
          } else {
            link = targetThemeLocale.home ?? targetLocalePath
          }
        }

        return {
          text,
          link,
        }
      }),
    }

    return [languageDropdown]
  })
}

/**
 * Get navbar config of repository link
 */
const useNavbarRepo = (): ComputedRef<NavbarConfig> => {
  const themeLocale = useThemeLocaleData<DefaultThemeOptions>()

  const repoLink = computed(() => {
    const { repo } = themeLocale.value
    if (!repo) {
      return null
    }
    return /^https?:/.test(repo) ? repo : `https://github.com/${repo}`
  })

  const repoLabel = computed(() => {
    if (!repoLink.value) return null
    if (themeLocale.value.repoLabel) return themeLocale.value.repoLabel

    const repoHost = repoLink.value.match(/^https?:\/\/[^/]+/)?.[0]
    if (!repoHost) return null

    const platforms = ['GitHub', 'GitLab', 'Bitbucket']
    for (let i = 0; i < platforms.length; i++) {
      const platform = platforms[i]
      if (new RegExp(platform, 'i').test(repoHost)) {
        return platform
      }
    }

    return 'Source'
  })

  return computed(() => {
    if (!repoLink.value || !repoLabel.value) {
      return []
    }

    return [
      {
        text: repoLabel.value,
        link: repoLink.value,
      },
    ]
  })
}

export default defineComponent({
  name: 'NavbarLinks',

  components: {
    NavLink,
    DropdownLink,
  },

  setup() {
    const themeLocale = useThemeLocaleData<DefaultThemeOptions>()

    const navbarConfig = computed(() => themeLocale.value.navbar || [])
    const navbarSelectLanguage = useNavbarSelectLanguage()

    const navbarRepo = useNavbarRepo()

    const navbarLinks = computed(() => [
      ...navbarConfig.value,
      ...navbarSelectLanguage.value,
      ...navbarRepo.value,
    ])

    return {
      navbarLinks,
    }
  },
})
</script>

<style lang="stylus">
@require '../styles/config.styl'

.navbar-links
  display inline-block
  a
    line-height 1.4rem
    color inherit
    &:hover, &.router-link-active
      color $accentColor
  .navbar-links-item
    position relative
    display inline-block
    margin-left 1.5rem
    line-height 2rem
    &:first-child
      margin-left 0

@media (max-width: $MQMobile)
  .navbar-links
    .navbar-links-item
      margin-left 0

@media (min-width: $MQMobile)
  .navbar-links a
    &:hover, &.router-link-active
      color $textColor
  .navbar-links-item > a:not(.external)
      &:hover, &.router-link-active
        margin-bottom -2px
        border-bottom 2px solid lighten($accentColor, 8%)
</style>
