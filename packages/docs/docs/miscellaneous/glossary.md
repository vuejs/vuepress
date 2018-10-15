# Glossary

## User side

| Name          | Description                                                                                                                  |
|:--------------|:-----------------------------------------------------------------------------------------------------------------------------|
| `permalink`   | The URL used by the current page, i.e., the value of `$page.path`.                                                           |
| `regularPath` | The URL of the current page based on directory structure, i.e., the value of `$page.regularPath`.                            |
| `frontmatter` | Configuration wrapped in `---` in the `markdown` file of the current page, which is used to do some page-level configuration |
| `headers`     | i.e. those titles defined by one or more `#` in the  `markdown` file.                                                        |
| `siteConfig`  | i.e. `.vuepress/config.js`.                                                                                                  |
| `themeConfig` | i.e. `themeConfig` value of `.vuepress/config.js`.                                                                           |

## Theme Side

| Name             | Description                                         |
|:-----------------|:----------------------------------------------------|
| `themePath`      | The root path of the current theme (Absolute path). |
| `themeEntryFile` | The theme configuration file (`themePath/index.js`) |
