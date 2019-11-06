<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
      <router-link :to="localePath">{{ notFoundLinkText }}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    localePath () {
      return this.$localePath || '/'
    },
    notFoundLinkText () {
      return (
        this.$themeLocaleConfig.notFoundLinkText
        || this.$site.themeConfig.notFoundLinkText
        || `Take me home.`
      )
    },
    notFoundMessages () {
      const messages = [
        `There's nothing here.`,
        `How did we get here?`,
        `That's a Four-Oh-Four.`,
        `Looks like we've got some broken links.`
      ]

      return (
        this.$themeLocaleConfig.notFoundMessages
        || this.$site.themeConfig.notFoundMessages
        || messages
      )
    }
  },
  methods: {
    getMsg () {
      return this.notFoundMessages[Math.floor(Math.random() * this.notFoundMessages.length)]
    }
  }
}
</script>
