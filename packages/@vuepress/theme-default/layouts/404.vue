<template>
  <div class="theme-container">
    <div class="theme-default-content">
      <h1>404</h1>

      <blockquote>{{ getMsg() }}</blockquote>

      <RouterLink to="/"> Take me home. </RouterLink>
    </div>
  </div>
</template>

<script>
const msgs = {
  en: [
    `There's nothing here.`,
    `How did we get here?`,
    `That's a Four-Oh-Four.`,
    `Looks like we've got some broken links.`,
  ],
  zh: [
    `这里什么都没有。`,
    `我们是如何来到这里的？`,
    `那是一个4-0-4。`,
    `看起来我们有一些破碎的链接。`,
  ],
};

export default {
  methods: {
    getMsg() {
      const localMsgs = this.localizeMsgs();
      return localMsgs[Math.floor(Math.random() * localMsgs.length)];
    },
    localizeMsgs() {
      const routesFirstPath = this.$route.path.match("\/.+?\/");
      if (routesFirstPath != null && routesFirstPath[0] === "/zh/") {
        return msgs.zh;
      }
      return msgs.en;
    },
  },
};
</script>
