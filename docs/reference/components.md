# Built-in Components

<NpmBadge package="@vuepress/client" />

## ClientOnly

- Usage:

```md
<ClientOnly>
  <NonSsrFriendlyComponent />
</ClientOnly>
```

- Details:

  This component and its children will only be rendered in client-side. That means, it will not be rendered to HTML during build (SSR).

  If a component is trying to access Browser / DOM APIs directly in `setup()`, an error will occur during build because those APIs are unavailable in Node.js environment. In such case, you could do either:

  - Modify the component to only access Browser / DOM APIs in `onBeforeMount()` or `onMounted()` hook.
  - Wrap the component with `<ClientOnly>`.

## Content

- Props:
  - pagePath
    - Type: `string`
    - Required: `false`

- Usage:

```md
<Content page-path="/" />
<Content page-path="/foo.html" />
```

- Details:

  This component will render the Markdown content of a page.

  If the `pagePath` prop is not provided, it will render the page of current route path.

  This component is mainly for developing themes. You won't need it in most cases.

## OutboundLink

- Usage:

```md
<OutboundLink />
```

- Details:

  This component will render an indicator for links to external URLs.

  This component is mainly for developing themes. You won't need it in most cases.
