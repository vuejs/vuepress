# Deploying

The following guides are based on some shared assumptions:

- You are placing your docs inside the `docs` directory of your project;
- You are using the default build output location (`.vuepress/dist`);
- VuePress is installed as a local dependency in your project, and you have setup the following npm scripts:

``` json
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```

## GitHub Pages

1. Set the correct `base` in `docs/.vuepress/config.js`.

   If you are deploying to `https://<USERNAME>.github.io/`, you can omit `base` as it defaults to `"/"`.

   If you are deploying to `https://<USERNAME>.github.io/<REPO>/`, for example your repository is at `https://github.com/<USERNAME>/<REPO>`, then set `base` to `"/<REPO>/"`.

2. Inside your project, create `deploy.sh` with the following content (with highlighted lines uncommented appropriately), and run it to deploy:

``` bash{13,20,23}
#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages

cd -
```

::: tip
You can also run the above script in your CI setup to enable automatic deployment on each push.
:::

::: tip
When you use a **Custom Domain name**, you MUST add the CNAME file into /docs/.vuepress/public folder (Create the folder if it isn’t there). Otherwise, your CNAME file will always be removed with each deploy and never work.
:::


### GitHub Pages and GitHub Actions

1. [Create a personal access token](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token);
2. Create [encrypted secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) under your repository;
3. Create a `.yml` or `.yaml` file in the `.github/workflows` directory in the root of your repository. e.g. `vuepress-deploy.yml`:

```yml
name: Build and Deploy
on: [push]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@master

    - name: vuepress-deploy
      uses: jenkey2011/vuepress-deploy@master
      env:
        ACCESS_TOKEN: ${{ secrets.ACCESS_TOKEN }}
        TARGET_REPO: username/repo
        TARGET_BRANCH: master
        BUILD_SCRIPT: yarn && yarn docs:build
        BUILD_DIR: docs/.vuepress/dist
        CNAME: https://www.xxx.com
```

For more information, you can checkout [jenkey2011/vuepress-deploy](https://github.com/jenkey2011/vuepress-deploy/).

### GitHub Pages and Travis CI

1. Set the correct `base` in `docs/.vuepress/config.js`.

   If you are deploying to `https://<USERNAME or GROUP>.github.io/`, you can omit `base` as it defaults to `"/"`.

   If you are deploying to `https://<USERNAME or GROUP>.github.io/<REPO>/`, for example your repository is at `https://github.com/<USERNAME>/<REPO>`, then set `base` to `"/<REPO>/"`.

2. Create a file named `.travis.yml` in the root of your project.

3. Run `yarn` or `npm install` locally and commit the generated lockfile (that is `yarn.lock` or `package-lock.json`).

4. Use the GitHub Pages deploy provider template, and follow the [Travis CI documentation](https://docs.travis-ci.com/user/deployment/pages/).

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
  github_token: $GITHUB_TOKEN # A token generated on GitHub allowing Travis to push code on you repository. Set in the Travis settings page of your repository, as a secure variable
  keep_history: true
  on:
    branch: master
```

### GitLab Pages and GitLab CI

1. Set the correct `base` in `docs/.vuepress/config.js`.

   If you are deploying to `https://<USERNAME or GROUP>.gitlab.io/`, you can omit `base` as it defaults to `"/"`.

   If you are deploying to `https://<USERNAME or GROUP>.gitlab.io/<REPO>/`, for example your repository is at `https://gitlab.com/<USERNAME>/<REPO>`, then set `base` to `"/<REPO>/"`.

2. Set `dest` in `.vuepress/config.js` to `public`.

3. Create a file called `.gitlab-ci.yml` in the root of your project with the content below. This will build and deploy your site whenever you make changes to your content:

``` yaml
image: node:10.22.0
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

1. On [Netlify](https://netlify.com), setup up a new project from GitHub with the following settings:

- **Build Command:** `vuepress build docs` or `yarn docs:build` or `npm run docs:build`
- **Publish directory:** `docs/.vuepress/dist`

2. Hit the deploy button.

## Google Firebase

1. Make sure you have [firebase-tools](https://www.npmjs.com/package/firebase-tools) installed.

2. Create `firebase.json` and `.firebaserc` at the root of your project with the following content:

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
```js
{
 "projects": {
   "default": "<YOUR_FIREBASE_ID>"
 }
}
```

3. After running `yarn docs:build` or `npm run docs:build`, deploy using the command `firebase deploy`.

## Surge

1. First install [surge](https://www.npmjs.com/package/surge), if you haven’t already.

2. Run `yarn docs:build` or `npm run docs:build`.

3. Deploy to surge by typing `surge docs/.vuepress/dist`.

You can also deploy to a [custom domain](http://surge.sh/help/adding-a-custom-domain) by adding `surge docs/.vuepress/dist yourdomain.com`.

## Heroku

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

2. Create a Heroku account by [signing up](https://signup.heroku.com).

3. Run `heroku login` and fill in your Heroku credentials:

   ``` bash
   heroku login
   ```

4. Create a file called `static.json` in the root of your project with the below content:

   `static.json`:
   ```json
   {
     "root": "./docs/.vuepress/dist"
   }
   ```

This is the configuration of your site; read more at [heroku-buildpack-static](https://github.com/heroku/heroku-buildpack-static).

5. Set up your Heroku git remote:

``` bash
# version change
git init
git add .
git commit -m "My site ready for deployment."

# creates a new app with a specified name
heroku apps:create example

# set buildpack for static sites
heroku buildpacks:set https://github.com/heroku/heroku-buildpack-static.git
```

6. Deploy your site:

``` bash
# publish site
git push heroku master

# opens a browser to view the Dashboard version of Heroku CI
heroku open
```

## Vercel

See [Creating and Deploying a VuePress App with Vercel](https://vercel.com/guides/deploying-vuepress-to-vercel).

## Layer0

See [Creating and Deploying a VuePress App with Layer0](https://docs.layer0.co/guides/vuepress).
