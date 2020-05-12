---
title: about title
---

Nav

- <RouterLink to="/">Home</RouterLink>

# About

- Title: {{ page.title }}
- Path: {{ page.path }}
- Key: {{ page.key }}

<script>
import { usePageData } from '@vuepress/client'

export default {
  setup() {
    const { page } = usePageData()

    return {
      page
    }
  }
}
</script>
