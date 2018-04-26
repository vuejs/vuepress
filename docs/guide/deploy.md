# Deploying

The following guides are based on a few shared assumptions:

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

1. Set correct `base` in `docs/.vuepress/config.js`.

   If you are deploying to `https://<USERNAME>.github.io/`, you can omit `base` as it defaults to `"/"`.

   If your are deploying to `https://<USERNAME>.github.io/<REPO>/`, (i.e. your repository is at `https://github.com/<USERNAME>/REPO>`), set `base` to `"/<REPO>/"`.

2. Inside your project, create `deploy.sh` with the following content (with highlighted lines uncommented appropriately) and run it to deploy:

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

## GitLab Pages and GitLab CI

1. Set correct `base` in `docs/.vuepress/config.js`.

   If you are deploying to `https://<USERNAME or GROUP>.gitlab.io/`, you can omit `base` as it defaults to `"/"`.

   If your are deploying to `https://<USERNAME or GROUP>.gitlab.io/<REPO>/`, (i.e. your repository is at `https://gitlab.com/<USERNAME>/REPO>`), set `base` to `"/<REPO>/"`.

2. Set `dest` in `.vuepress/config.js` to `public`.

3. Create a file called `.gitlab-ci.yml` in the root of your project with the content below. This will build and deploy your site whenever you make changes to your content.

``` yaml
image: node:9.11.1

pages:
  cache:
    paths:
    - node_modules/

  script:
  - npm install
  - npm run docs:build
  artifacts:
    paths:
    - public
  only:
  - master
```


## Netlify

1. On Netlify, setup up a new project from GitHub with the following settings:

  - **Build Command:** `npm run docs:build` or `yarn docs:build`
  - **Publish directory:** `docs/.vuepress/dist`

2. Hit the deploy button!

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

3. After running `yarn docs:build` or `npm run docs:build`, deploy with the command `firebase deploy`.
