# Client API

Client API is provided by [@vuepress/client](https://www.npmjs.com/package/@vuepress/client) package, which is used for developing client files.

## Composition API

### useSiteData

- Details:

  Returns the site data ref object.

### useSiteLocaleData

- Details:

  Returns the site data ref object of current locale.

  The properties of current locale have been merged into the root-level properties.

### useRouteLocale

- Details:

  Returns the locale path ref object of current route.

  The value is one of the keys of the [locales](./config.md#locales) config.

### usePageData

- Details:

  Returns the page data ref object of current page.

### usePageFrontmatter

- Details:

  Returns the frontmatter ref object of current page.

  The value is the `frontmatter` property of the page data.

### usePageHead

- Details:

  Returns the head config ref object of current page.

  The value is obtained by merging and deduplicating [head](./frontmatter.md#head) frontmatter and [head](./config.md#head) config.

### usePageHeadTitle

- Details:

  Returns the head title ref object of current page.

  The value is obtained by joining the page title and site title.

### usePageLang

- Details:

  Returns the language ref object of current page.

  The value is the `lang` property of the page data.

## Utils

### withBase

- Details:

  Prefix URL with site [base](./config.md#base).

- Also see:
  - [Guide > Assets > Base Helper](../guide/assets.md#base-helper)

## Types

In addition to the type helpers mentioned below, we also provide type definitions related to the above composition API, such as `SiteData` and `PageData`.

### ClientAppSetup

- Details:

  Type helper for [clientAppSetupFiles](./plugin-api.md#clientappsetupfiles).

- Example:

Create `clientAppSetup.ts` file:

```ts
import type { ClientAppSetup } from '@vuepress/client'

const clientAppSetup: ClientAppSetup = () => {
  // ...
}

export default clientAppSetup
```

### ClientAppEnhance

- Details:

  Type helper for [clientAppEnhanceFiles](./plugin-api.md#clientappenhancefiles).

- Example:

Create `clientAppEnhance.ts` file:

```ts
import type { ClientAppEnhance } from '@vuepress/client'

const clientAppEnhance: ClientAppEnhance = ({ app, router, siteData }) => {
  // ...
}

export default clientAppEnhance
```
