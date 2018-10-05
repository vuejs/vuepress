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

::: warning 
Note that this is the documentation of 1.x.x, if you are a 0.x.x user please go to: [https://v0.vuepress.vuejs.org.](https://v0.vuepress.vuejs.org).
Since 1.x.x is still in the `alpha` stage, all APIs would change before we reach the `rc` stage, so do not use in production yet unless you are adventurous.
:::

``` bash
# install
yarn global add vuepress@next 
# OR npm install -g vuepress@next

# create a markdown file
echo '# Hello VuePress' > README.md

# start writing
vuepress dev

# build to static files
vuepress build
```

::: warning COMPATIBILITY NOTE
VuePress requires Node.js >= 8.
:::
