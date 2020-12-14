<template>
  <main
    class="home"
    :aria-labelledby="$frontmatter.heroText !== null ? 'main-title' : null"
  >
    <header class="hero">
      <img
        v-if="$frontmatter.heroImage"
        :src="$withBase($frontmatter.heroImage)"
        :alt="$frontmatter.heroAlt || 'hero'"
      />

      <h1 v-if="$frontmatter.heroText !== null" id="main-title">
        {{ $frontmatter.heroText || $siteLocale.title || 'Hello' }}
      </h1>

      <p v-if="$frontmatter.tagline !== null" class="description">
        {{
          $frontmatter.tagline ||
          $siteLocale.description ||
          'Welcome to your VuePress site'
        }}
      </p>

      <p
        v-if="$frontmatter.actionText && $frontmatter.actionLink"
        class="action"
      >
        <NavLink
          class="action-button"
          :item="{
            text: $frontmatter.actionText,
            link: $frontmatter.actionLink,
          }"
        />
      </p>
    </header>

    <div
      v-if="$frontmatter.features && $frontmatter.features.length"
      class="features"
    >
      <div
        v-for="(feature, index) in $frontmatter.features"
        :key="index"
        class="feature"
      >
        <h2>{{ feature.title }}</h2>
        <p>{{ feature.details }}</p>
      </div>
    </div>

    <div class="theme-default-content custom">
      <Content />
    </div>

    <div v-if="$frontmatter.footer" class="footer">
      {{ $frontmatter.footer }}
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavLink from './NavLink.vue'

export default defineComponent({
  name: 'Home',
  components: {
    NavLink,
  },
})
</script>
