## Development Setup

This project uses a monorepo setup that requires using [Yarn](https://yarnpkg.com) because it relies on [Yarn workspaces](https://yarnpkg.com/blog/2017/08/02/introducing-workspaces/).

``` sh
# Install dependencies & compile TypeScript utilities.
yarn bootstrap

# Clean dependencies.
yarn clean

# Useful when creating new submodules.
yarn boot

# Serve the docs.
yarn dev

# Build the docs.
yarn build

# Execute all the test suites.
yarn test
```

## Core packages

- **docs**: Docs of VuePress (do not publish to npm).
- **vuepress**: VuePress CLI.
- **packages**
  - `core`: containing the Node.js API, the Plugin API, the Theme API, the Client SPA, etc.
  - `markdown`: internal Markdown compiler.
  - `markdown-loader`: internal Markdown loader.
  - `plugin-active-header-links`: a plugin for active sidebar heading links.
  - `plugin-google-analytics`: Google Analytics integration.
  - `plugin-last-updated`: implementation of "last updated" feature.
  - `plugin-medium-zoom`: `medium-zoom` integration.
  - `plugin-nprogress`: `nprogress` integration.
  - `plugin-pwa`: PWA plugin.
  - `plugin-search`: search plugin, providing the `SearchBox` component.
  - `shared-utils`: TypeScript utilities.
  - `test-utils`: test utilities.
  - `theme-default`: default theme.
  - `theme-vue`: a theme tweak from default theme, used for the official Vue project.

## Core packages not in main project

> Previously, for quick iteration, these projects were kept in ULIVZ's workspace. In the future, we may want to build an independent GitHub group.

- [awesome-vuepress](https://github.com/ulivz/awesome-vuepress)
- [@vuepress/plugin-blog](https://github.com/ulivz/vuepress-plugin-blog)
- [@vuepress/theme-blog](https://github.com/ulivz/vuepress-theme-blog)

## Workflow

### Issue

> TODO

### Pull requests

- Create a feature branch from the default branch (`master`) and merge back against that branch.
- It's OK to have multiple small commits as you work on the PR - GitHub automatically squashes them before merging.
- Make sure tests pass.
- If adding a new feature:
  - Add accompanying test case(s).
  - Provide a convincing reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.
- If fixing bug:
  - If you are resolving an open issue, add `(fix #xxxx)` (`#xxxx` being the issue ID) in your PR title for a better release log, e.g. `chore(feat): implement SSR (fix #1234)`.
  - Provide a detailed description of the bug in the PR. Live demo preferred.
  - Add appropriate test coverage if applicable.

### Substantial Changes

> RFC flow, TODO

## Code Specification

> TODO

## Commit specification

Commit messages should follow the [commit message convention](./COMMIT_CONVENTION.md) so that changelogs can be automatically generated.
