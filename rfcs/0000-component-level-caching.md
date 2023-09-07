- Start Date: 2020-01-23
- RFC PR: (leave this empty)
- VuePress Issue: #2120

# Summary

This feature request is to support, during vuepress build, the component-level caching of vue-server-renderer as documented in https://ssr.vuejs.org/guide/caching.html#component-level-caching.

Currently, vuepress use createBundleRenderer from vue-server-renderer without implementing the cache parameter. The feature request is to add support for the cache parameter via the siteConfig.

# Basic example

In vuepress/config.js
```
const LRU = require('lru-cache')
module.exports = {
  componentCache: new LRU({max: 10000})
}
```

In DemoComponent.vue:
``` 
<script>
export default {
  name: "demo",
  props: ['item'],
  serverCacheKey: props => props.item.id
}
</script>
```

# Motivation

Some apps may require component level caching in order to speed up build time / SSR rendering and prevent event-loop delays in Node.js. An example would be a component with a large vuetify v-list or large v-for loop.

# Detailed design

In createBundleRenderer() from @vuepress/core/lib/node/build/index.js
```
+ cache: this.context.siteConfig.componentCache || (() => false)
```

# Drawbacks

This feature may be confusing with the existing "cache" implementation for webpack and cache-loader. A "cache" parameter already exist in vuepress as documented in https://vuepress.vuejs.org/config/#cache.

The feature will require proper documentation to educate user on the feature available in Vue SSR with vue-server-renderer as documented in https://ssr.vuejs.org/guide/caching.html#component-level-caching

# Alternatives

N/A

# Adoption strategy

It is not a breaking change and adoption simoply require using the new config option.

# How we teach this

Provide example in documentation, similar to the example above.

# Unresolved questions

Config option name is up for debate to ensure no future conflict in vuepress, etc.
