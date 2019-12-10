# 部署

下述的指南基于以下条件：

- 文档放置在项目的 `docs` 目录中；
- 使用的是默认的构建输出位置；
- VuePress 以本地依赖的形式被安装到你的项目中，并且配置了如下的 npm scripts:

``` json
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```

## GitHub Pages

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。

   如果你打算发布到 `https://<USERNAME>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

   如果你打算发布到 `https://<USERNAME>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

2. 在你的项目中，创建一个如下的 `deploy.sh` 文件（请自行判断去掉高亮行的注释）:

``` bash{13,20,23}
#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd docs/.vuepress/dist

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 如果发布到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 如果发布到 https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

::: tip
你可以在你的持续集成的设置中，设置在每次 push 代码时自动运行上述脚本。
:::

### GitHub Pages and Travis CI

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。

   如果你打算发布到 `https://<USERNAME or GROUP>.github.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

   如果你打算发布到 `https://<USERNAME or GROUP>.github.io/<REPO>/`（也就是说你的仓库在 `https://github.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

2. 在项目的根目录创建一个名为 `.travis.yml` 的文件；
3. 在本地执行 `yarn` 或 `npm install` 并且提交生成的 lock 文件（即 `yarn.lock` 或 `package-lock.json`）；
4. 使用 GitHub Pages 部署提供程序模板并遵循 [Travis 文档](https://docs.travis-ci.com/user/deployment/pages/)。

``` yaml
language: node_js
node_js:
  - lts/*
install:
  - yarn install # npm ci
script:
  - yarn docs:build # npm run docs:build
deploy:
  provider: pages
  skip_cleanup: true
  local_dir: docs/.vuepress/dist
  github_token: $GITHUB_TOKEN # 在 GitHub 中生成，用于允许 Travis 向你的仓库推送代码。在 Travis 的项目设置页面进行配置，设置为 secure variable
  keep_history: true
  on:
    branch: master
```

### GitLab Pages and GitLab CI

1. 在 `docs/.vuepress/config.js` 中设置正确的 `base`。

   如果你打算发布到 `https://<USERNAME or GROUP>.gitlab.io/`，则可以省略这一步，因为 `base` 默认即是 `"/"`。

   如果你打算发布到 `https://<USERNAME or GROUP>.gitlab.io/<REPO>/`（也就是说你的仓库在 `https://gitlab.com/<USERNAME>/<REPO>`），则将 `base` 设置为 `"/<REPO>/"`。

2. 在 `.vuepress/config.js` 中将 `dest` 设置为 `public`。
3. 在你项目的根目录下创建一个名为 `.gitlab-ci.yml` 的文件，无论何时你提交了更改，它都会帮助你自动构建和部署：

``` yaml
image: node:9.11.1

pages:
 cache:
   paths:
   - node_modules/

 script:
 - yarn install # npm install
 - yarn docs:build # npm run docs:build
 artifacts:
   paths:
   - public
 only:
 - master
```

## Netlify

1. 在 Netlify 中, 创建一个新的 GitHub 项目，使用以下设置：

- **Build Command:** `yarn build:docs` 或者 `npm run build:docs`
- **Publish directory:** `docs/.vuepress/dist`

2. 点击 deploy 按钮！

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
``` js
{
 "projects": {
   "default": "<YOUR_FIREBASE_ID>"
 }
}
```

3. 在执行了 `yarn docs:build` 或 `npm run docs:build` 后, 使用 `firebase deploy` 指令来部署。

## Surge

1. 首先，假设你已经安装了 [surge](https://www.npmjs.com/package/surge)；

2. 运行 `yarn docs:build` 或者 `npm run docs:build`；

3. 想要使用 surge 来部署，你可以运行： `surge docs/.vuepress/dist`；

你也可以通过 `surge docs/.vuepress/dist yourdomain.com` 来部署到 [自定义域名](http://surge.sh/help/adding-a-custom-domain)。


## Heroku

1. 首先安装 [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli)；

2. [在这里](https://signup.heroku.com) 注册一个 Heroku 账号；

3. 运行 `heroku login` 并填写你的 Heroku 证书：

   ``` bash
   heroku login
   ```

4. 在你的项目根目录中，创建一个名为 `static.json` 的文件，并包含下述内容：

`static.json`:
```json
{
"root": "./docs/.vuepress/dist"
}
```

这里是你项目的配置，请参考 [heroku-buildpack-static](https://github.com/heroku/heroku-buildpack-static) 了解更多。

5. 配置 Heroku 的 git 远程仓库：

``` bash
# 版本变化
git init
git add .
git commit -m "My site ready for deployment."

# 以指定的名称创建一个新的 heroku 应用
heroku apps:create example

# 为静态网站设置构建包
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
```

6. 部署你的网站：

``` bash
# 发布网站
git push heroku master

# 打开浏览器查看 Helku CI 的 dashboard
heroku open
```

## Now

请查看 [用 Now 部署一个 VuePress 的示例站点](https://zeit.co/examples/vuepress/).
