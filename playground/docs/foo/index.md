---
title: foo
---

Nav

- <RouterLink to="/">Home</RouterLink>
- [About](../about/README.md)
- [Test](../test.md)

# Foo

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
