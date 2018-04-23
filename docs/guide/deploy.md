# Deploying

The following guides assumes you are placing your docs inside the `docs` directory of your project and using the default build output location.

## GitHub Pages

1. Set correct `base` in `.vuepress/config.js`. 

   If you are deploying to `https://<USERNAME>.github.io/`, you can omit `base` as it defaults to `"/"`.

   If your are deploying to `https://<USERNAME>.github.io/<REPO>/`, (i.e. your repository is at `https://github.com/<USERNAME>/REPO>`), set `base` to `"/<REPO>/"`.

2. Inside your project, create `deploy.sh` with the following content (with highlighted lines uncommented appropriately) and run it to deploy:

::: tip
You can also run this script in your CI setup to enable automatic deployment on each push.
:::

``` bash{13,20,23}
#!/usr/bin/env sh

# abort on errors
set -e

# build
vuepress build docs

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

## GitLab Pages and GitLab CI

1. Set correct `base` in `.vuepress/config.js`. 

   If you are deploying to `https://<USERNAME or GROUP>.gitlab.io/`, you can omit `base` as it defaults to `"/"`.

   If your are deploying to `https://<USERNAME or GROUP>.gitlab.io/<REPO>/`, (i.e. your repository is at `https://gitlab.com/<USERNAME>/REPO>`), set `base` to `"/<REPO>/"`.
 
2. Set `dest` in `.vuepress/config.js` to `public`.

3. Create a file called `.gitlab-ci.yml` in the root of your project with the content below. This will build and deploy your site whenever you make changes to your content. 

```
image: node:9.11.1

before_script:
  - npm install -g npx

pages:
  script:
  - npm install -D vuepress
  - npx vuepress build docs
  artifacts:
    paths:
    - public
```
   

## Netlify

1. Make sure you have npm scripts for building your docs:

``` json
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```

2. On Netlify, setup up a new project from GitHub with the following settings:

  - **Build Command:** `npm run docs:build` or `yarn docs:build`
  - **Publish directory:** `docs/.vuepress/dist`

3. Hit the deploy button!
