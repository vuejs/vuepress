<template>
  <main class="home" :aria-labelledby="heroText ? 'main-title' : undefined">
    <header class="hero">
      <img v-if="heroImage" :src="heroImage" :alt="heroAlt" />

      <h1 v-if="heroText" id="main-title">
        {{ heroText }}
      </h1>

      <p v-if="tagline" class="description">
        {{ tagline }}
      </p>

      <p v-if="actions.length" class="actions">
        <NavLink
          v-for="action in actions"
          :key="action.text"
          class="action-button"
          :class="[action.type]"
          :item="action"
        />
      </p>
    </header>

    <div v-if="features.length" class="features">
      <div v-for="feature in features" :key="feature.title" class="feature">
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>

    <div class="theme-default-content custom">
      <Content />
    </div>

    <template v-if="footer">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-if="footerHtml" class="footer" v-html="footer" />
      <div v-else class="footer" v-text="footer" />
    </template>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import {
  usePageFrontmatter,
  useSiteLocaleData,
  withBase,
} from '@vuepress/client'
import { isArray } from '@vuepress/shared'
import type { DefaultThemeHomePageFrontmatter } from '../../shared'
import NavLink from './NavLink.vue'

export default defineComponent({
  name: 'Home',

  components: {
    NavLink,
  },

  setup() {
    const frontmatter = usePageFrontmatter<DefaultThemeHomePageFrontmatter>()
    const siteLocale = useSiteLocaleData()

    const heroImage = computed(() => {
      if (!frontmatter.value.heroImage) {
        return null
      }

      return withBase(frontmatter.value.heroImage)
    })

    const heroText = computed(() => {
      if (frontmatter.value.heroText === null) {
        return null
      }
      return frontmatter.value.heroText || siteLocale.value.title || 'Hello'
    })

    const heroAlt = computed(
      () => frontmatter.value.heroAlt || heroText.value || 'hero'
    )

    const tagline = computed(() => {
      if (frontmatter.value.tagline === null) {
        return null
      }
      return (
        frontmatter.value.tagline ||
        siteLocale.value.description ||
        'Welcome to your VuePress site'
      )
    })

    const actions = computed(() => {
      if (!isArray(frontmatter.value.actions)) {
        return []
      }

      return frontmatter.value.actions.map(
        ({ text, link, type = 'primary' }) => ({
          text,
          link,
          type,
        })
      )
    })

    const features = computed(() => {
      if (isArray(frontmatter.value.features)) {
        return frontmatter.value.features
      }
      return []
    })

    const footer = computed(() => frontmatter.value.footer)

    const footerHtml = computed(() => frontmatter.value.footerHtml)

    return {
      heroImage,
      heroAlt,
      heroText,
      tagline,
      actions,
      features,
      footer,
      footerHtml,
    }
  },
})
</script>
