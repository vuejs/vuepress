# 快速上手

## 全局安装

如果你只是想玩一玩 VuePress，你可以全局安装它：

``` bash
# 安装
npm install -g vuepress

# 新建一个 markdown 文件
echo "# Hello VuePress!" > README.md

# 开始写作
vuepress dev .

# 构建静态文件
vuepress build .
```

## 现有项目

如果你想在一个现有项目中使用 VuePress，同时想要保留项目已有中的文档，此时你应该将 VuePress 作为本地依赖。下述的安装流程，你同样可以使用持续集成工具，或者一些开源服务，如 Netlify，来帮助你在每次更新代码时自动部署。

``` bash
# 将 VuePress 作为一个本地依赖安装
npm install -D vuepress

# 新建一个 docs 文件夹
mkdir docs

# 新建一个 markdown 文件
echo "# Hello VuePress!" > docs/README.md

# 开始写作
npx vuepress dev docs
```

你也可以在 `package.json` 加上一些 npm 脚本:

``` json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

于是你就可以这样开始你的写作了:

``` bash
npm run docs:dev
```

要生成静态资源时，运行：

``` bash
npm run docs:build
```

默认情况下，文件将会被生成在 `.vuepress/dist`，当然，你也可以通过 `.vuepress/config.js` 中的 `dest` 字段来修改，生成的文件可以部署到任意的静态文件服务器上，参考 [部署](./deploy.md) 来了解更多。
