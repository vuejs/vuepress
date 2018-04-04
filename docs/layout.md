# Custom Layout

VuePress uses Vue single file components for custom layouts. To use a custom layout, create a `_theme` directory under `docs`, and then create a `App.vue` file:

``` bash
- docs
  - _theme
    - App.vue
```

From there it's the same as developing a normal Vue application. There are only a few special things to note:

## Site and Page Metadata

The `Layout` component will be invoked once for every `.md` file in `docs`, and the metadata for the entire site and that specific page will be exposed respectively in `$site` and `$page` properties which are injected into every component in the app.

// TODO details about $site & $page

## Content Outlet

The compiled content of the current `.md` file being rendered will be available as a special `<Content/>` global component. You will need to render it somewhere in your layout in order to display the content of the page.
