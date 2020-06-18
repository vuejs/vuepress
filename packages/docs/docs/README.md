---
home: true
heroImage: /hero.png
actionText: Get Started →
actionLink: /guide/
footer: MIT Licensed | Copyright © 2018-present Evan You
---

<div style="text-align: center">
  <Bit/>
</div>

<div class="features">
  <div class="feature">
    <h2>Simplicity First</h2>
    <p>Minimal setup with markdown-centered project structure helps you focus on writing.</p>
  </div>
  <div class="feature">
    <h2>Vue-Powered</h2>
    <p>Enjoy the dev experience of Vue + webpack, use Vue components in markdown, and develop custom themes with Vue.</p>
  </div>
  <div class="feature">
    <h2>Performant</h2>
    <p>VuePress generates pre-rendered static HTML for each page, and runs as an SPA once a page is loaded.</p>
  </div>
</div>

### As Easy as 1, 2, 3

``` bash
# Scaffold VuePress site
yarn create vuepress [directoryName]
# OR npx create-vuepress [directoryName]

# Navigate to your new VuePress directory
cd [directoryName]

# Start local dev server
yarn dev
# OR npm run dev

# Build static files
yarn build
# OR npm run build
```

::: warning COMPATIBILITY NOTE
VuePress requires Node.js >= 8.6.
:::
