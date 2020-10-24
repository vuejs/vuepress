---
title: test
---

Nav

- <RouterLink to="/">Home</RouterLink>
- [About](./about/README.md)
- [Foo](./foo/index.md)

# Test

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
