---
sidebar: auto
---

# Themes

## Background

Before 1.x.x, vuepress retrieves all markdown files in the documents source directory and defines the page links based on the file hierarchy. e.g. if you have the following file structure:

```
├── package.json
└── source
    ├── _post
    │   └── intro-vuepress.md
    ├── index.md
    └── tags.md
```

Then you will get following available pages:

```
/source/
/source/tags.html
/source/_post/intro-vuepress.html
```

However, for a blog system, we hope that the link of a post can be customized. VuePress started supporting this feature from `1.0.0`. which is known as `permalink`. Then, the actual pages would be:

```
/source/
/source/tags/
/source/2018/4/1/intro-vuepress.html
```

It seems that we have seen the shadow of the blog. Let's continue to look down.

## Writing a theme

TODO. integrate with the old docs.

## Theme API

### layout

TODO

### notFound

TODO

### plugins

TODO
