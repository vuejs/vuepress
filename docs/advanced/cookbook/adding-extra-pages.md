# Adding Extra Pages

Sometimes you might want to add some extra pages without creating a markdown file in the source directory.

With the help of [Plugin API](../../reference/plugin-api.md) and [Node API](../../reference/node-api.md), we can do that with ease.

## Add a Default Homepage

As a theme author, you may not require users to create a `/README.md` file as the homepage, but you want to provide a default one:

```ts
import { createPage } from '@vuepress/core';

export default {
  // all pages have been loaded after initialization
  async onInitialized(app) {
    // if the homepage does not exist
    if (app.pages.every((page) => page.path !== '/')) {
      // create a homepage
      const homepage = await createPage(app, {
        path: '/',
        // set frontmatter
        frontmatter: {
          layout: 'Layout',
        },
        // set markdown content
        content: `\
# Welcome to ${app.options.title}

This is the default homepage
`,
      })
      // add it to `app.pages`
      app.pages.push(homepage)
    }
  }
};
```
