# 部署

下述的指南，将假定你将文档放置在项目的 `docs` 目录中，并使用默认的构建输出位置。

## GitHub Pages

1. 将 `.vuepress/config.js` 的 `base` 设置成你仓库的名字，举个例子，如果你的仓库是 `https://github.com/foo/bar`, 部署的页面将会通过 `https://foo.github.io/bar` 来访问，此时，你应该将 `base` 设置为 `"/bar/"`。

2. 在你的项目中运行:

``` bash
# 构建静态文件
vuepress build docs

# 切换到你的输出目录
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# push 到你仓库的 gh-pages 分支
# 将 <USERNAME>/<REPO> 替换成你的信息
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
```

你可以在你的持续集成的设置中，设置在每次 push 代码时自动运行上述脚本。

## Netlify

1. 确保你已经有了构建你的文档的的 npm scripts：

``` json
{
  "scripts": {
    "build-docs": "vuepress build docs"
  }
}
```

2. 在 Netlify 中, 创建一个新的 Github 项目，并做一下设置:

  - **Build Command:** `npm run build-docs` 或者 `yarn build-docs`
  - **Publish directory:** `docs/.vuepress/dist`

3. 点击 deploy 按钮！
