<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>

      <blockquote>{{ getMsg() }}</blockquote>

      <RouterLink :to="homeLink">{{ homeText }}</RouterLink>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSiteLocaleData } from '@vuepress/client'

export default defineComponent({
  name: '404',

  setup() {
    const siteLocale = useSiteLocaleData()
    const themeConfig = siteLocale.value.themeConfig

    const messages = themeConfig.notFound ?? ['Not Found']
    const getMsg = (): string =>
      messages[Math.floor(Math.random() * messages.length)]
    const homeLink = siteLocale.value.base
    const homeText = themeConfig.backToHome

    return {
      getMsg,
      homeLink,
      homeText,
    }
  },
})
</script>
