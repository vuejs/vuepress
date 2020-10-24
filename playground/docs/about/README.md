---
title: about title
---

Nav

- <RouterLink to="/">Home</RouterLink>
- [Test](../test.md)
- [Foo](../foo/index.md)

# About

- Title: {{ page.title }}
- Path: {{ page.path }}
- Key: {{ page.key }}

<script>
import { usePageData } from '@vuepress/client'

export default {
  setup() {
    const page = usePageData()

    return {
      page
    }
  }
}
</script>
