# 部署

下述的指南基于以下条件：

- Markdown 源文件放置在你项目的 `docs` 目录；
- 使用的是默认的构建输出目录 (`.vuepress/dist`) ；
- 使用 [Yarn classic](https://classic.yarnpkg.com/zh-Hans/) 作为包管理器，当然也可以使用 NPM 。
- VuePress 作为项目依赖安装，并在 `package.json` 中配置了如下脚本：

```json
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```

## GitHub Pages

1. 设置正确的 [base](../reference/config.md#base) 选项。

    如果你准备发布到 `https://<USERNAME>.github.io/` ，你可以省略这一步，因为 `base` 默认就是 `"/"` 。

    如果你准备发布到 `https://<USERNAME>.github.io/<REPO>/` ，也就是说你的仓库地址是 `https://github.com/<USERNAME>/<REPO>` ，则将 `base` 设置为 `"/<REPO>/"`。

2. 选项你想要使用的 CI 工具。这里我们以 [GitHub Actions](https://github.com/features/actions) 为例。

    创建 `.github/workflows/docs.yml` 文件来配置工作流。

::: details 点击展开配置样例
```yaml
name: docs

on:
  # 每当 push 到 main 分支时触发部署
  push:
    branches: [main]
  # 手动触发部署
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
        with:
          # “最近更新时间” 等 git 日志相关信息，需要拉取全部提交记录
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # 选择要使用的 node 版本
          node-version: '14'

      # 缓存 node_modules
      - name: Cache dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      # 如果缓存没有命中，安装依赖
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn --frozen-lockfile

      # 运行构建脚本
      - name: Build VuePress site
        run: yarn docs:build

      # 查看 workflow 的文档来获取更多信息
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # 部署到 gh-pages 分支
          target_branch: gh-pages
          # 部署目录为 VuePress 的默认输出目录
          build_dir: docs/.vuepress/dist
```
:::


::: tip
请参考 [GitHub Pages 官方指南](https://pages.github.com/) 来获取更多信息。
:::

## GitLab Pages

1. 设置正确的 [base](../reference/config.md#base) 选项。

    如果你准备发布到 `https://<USERNAME>.gitlab.io/` ，你可以省略这一步，因此 `base` 默认就是 `"/"` 。

    如果你准备发布到 `https://<USERNAME>.gitlab.io/<REPO>/` ，也就是说你的仓库地址是 `https://gitlab.com/<USERNAME>/<REPO>` ，则将 `base` 设置为 `"/<REPO>/"`。

2. 创建 `.gitlab-ci.yml` 文件来配置 [GitLab CI](https://about.gitlab.com/stages-devops-lifecycle/continuous-integration/) 工作流。

::: details 点击展开配置样例
```yaml
# 选择你要使用的 docker 镜像
image: node:14-buster

pages:
  # 每当 push 到 main 分支时触发部署
  only:
  - main

  # 缓存 node_modules
  cache:
    paths:
    - node_modules/

  # 安装依赖并运行构建脚本
  script:
  - yarn --frozen-lockfile
  - yarn docs:build --dest public

  artifacts:
    paths:
    - public
```
:::

::: tip
请参考 [GitLab Pages 官方指南](https://docs.gitlab.com/ce/user/project/pages/#getting-started) 来获取更多信息。
:::

## Google Firebase

1. 请确保你已经安装了 [firebase-tools](https://www.npmjs.com/package/firebase-tools)。

2. 在你项目的根目录下创建 `firebase.json` 和 `.firebaserc`，并包含以下内容：

`firebase.json`:

```json
{
  "hosting": {
    "public": "./docs/.vuepress/dist",
    "ignore": []
  }
}
```

`.firebaserc`:

```json
{
  "projects": {
    "default": "<YOUR_FIREBASE_ID>"
  }
}
```

3. 在执行了 `yarn docs:build` 或 `npm run docs:build` 后, 使用 `firebase deploy` 指令来部署。

::: tip
请参考 [Firebase CLI 官方指南](https://firebase.google.com/docs/cli) 来获取更多信息。
:::

## Heroku

1. 首先安装 [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)；

2. [在这里](https://signup.heroku.com) 注册一个 Heroku 账号；

3. 运行 `heroku login` 并填写你的 Heroku 认证信息：

```bash
heroku login
```

4. 在你的项目根目录中，创建一个名为 `static.json` 的文件，并包含下述内容：

`static.json`:

```json
{
  "root": "./docs/.vuepress/dist"
}
```

这里是你项目的配置，请参考 [heroku-buildpack-static](https://github.com/heroku/heroku-buildpack-static) 来获取更多信息。

## Netlify

1. 前往 [Netlify](https://netlify.com) ，从 GitHub 创建一个新项目，并进行如下配置：

    - **Build Command:** `yarn docs:build`
    - **Publish directory:** `docs/.vuepress/dist`

2. 设置 [Environment variables](https://docs.netlify.com/configure-builds/environment-variables) 来选择 Node 版本：

    - `NODE_VERSION`: 14

3. 点击 deploy 按钮。

## Vercel

请查看 [Creating and Deploying a VuePress App with Vercel](https://vercel.com/guides/deploying-vuepress-to-vercel).

<!-- 下列平台是中文文档特有的，放在最下方 -->

## 云开发 CloudBase

[云开发 CloudBase](https://cloudbase.net/?site=vuepress) 是一个云原生一体化的 Serverless 云平台，支持静态网站、容器等多种托管能力，并提供简便的部署工具 [CloudBase Framework](https://cloudbase.net/framework.html?site=vuepress) 来一键部署应用。

1. 全局安装 CloudBase CLI ：

```bash
npm install -g @cloudbase/cli
```

2. 在项目根目录运行以下命令一键部署 VuePress 应用，在部署之前可以先 [开通环境](https://console.cloud.tencent.com/tcb/env/index?tdl_anchor=ad&tdl_site=vuejs)：

```bash
cloudbase init --without-template
cloudbase framework:deploy
```

  CloudBase CLI 首先会跳转到控制台进行登录授权，然后将会交互式进行确认。

  确认信息后会立即进行部署，部署完成后，可以获得一个自动 SSL，CDN 加速的网站应用，你也可以搭配使用 GitHub Action 来持续部署 GitHub 上的 VuePress 应用。

  也可以使用 `cloudbase init --template vuepress` 快速创建和部署一个新的 VuePress 应用。

::: tip
更多详细信息请查看 CloudBase Framework 的[部署项目示例](https://github.com/TencentCloudBase/cloudbase-framework?site=vuepress#%E9%A1%B9%E7%9B%AE%E7%A4%BA%E4%BE%8B)
:::

## 21 云盒子

请查看 [21 云盒子 - 部署一个 VuePress 静态网页](https://www.21yunbox.com/docs/#/deploy-vuepress)。
