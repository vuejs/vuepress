---
next: ./getting-started
---

# Introduction

VuePress is composed of two parts: a minimalistic static site generator with a Vue-powered theming system, and a default theme optimized for writing technical documentation. In fact, it was created to support the documentation needs of Vue's own sub projects.

A VuePress site is in fact a Single-Page Application (SPA) powered by [Vue](http://vuejs.org/), [Vue Router](https://github.com/vuejs/vue-router) and [webpack](http://webpack.js.org/). If you've used Vue before, you will notice the familiar development experience when you are writing or developing custom themes (you can even use Vue DevTools to debug your custom theme!).

When deployed, each page has its own pre-rendered static HTML, providing great loading performance and is SEO-friendly. Once the page is loaded, Vue takes over the static content and turns it into a full SPA. Additional pages are fetched on demand as the user navigates around the site.

## How It Works

During the build, we create a server-rendered version of the app and render the corresponding HTML by virtually visiting each route. This approach is inspired by [Nuxt](https://nuxtjs.org/)'s `nuxt generate` command and other projects like [Gatsby](https://www.gatsbyjs.org/).

Each markdown file is compiled into HTML with [markdown-it](https://github.com/markdown-it/markdown-it) and then processed as the template of a Vue component. This allows you to directly use Vue inside your markdown files and is great when you need to embed dynamic content.

## Features

- [Built-in markdown extensions](./markdown.md) optimized for technical documentation
- [Ability to leverage Vue inside markdown files](./using-vue.md)
- [Vue-powered custom theme system](./custom-thems)
- A default theme with:
  - Responsive layout
  - Simple out-of-the-box header-based search
  - Customizable navbar and sidebar
  - Auto-generated GitHub link and page edit links

## Todo Features

VuePress is still a work in progress. There are a few things that it currently does not support but are planned:

- PWA Support
- Blogging support
- Dropdown Items in Navbar
- Google Analytics Integration
- Algolia DocSearch Integration

## Why Not ...?

### Nuxt

Nuxt is capable of doing what VuePress does, but it is designed for building applications. VuePress is focused on content-centric static sites and provides features tailored for technical documentation out of the box.

### Docsify / Docute

Both are great projects and also Vue-powered. Except they are both completely runtime-driven and thus not SEO-friendly. If you don't care about SEO and don't want to mess with installing dependencies, these are still great choices.

### Hexo

Hexo is great - in fact, we are probably still a long way to go from migrating away from it for our main site. The biggest problem is that its theming system is very static and string-based - we really want to leverage Vue for both the layout and the interactivity. Also, Hexo's markdown rendering isn't the most flexible to configure.
