# Deploying

The following guides assumes you are placing your docs inside the `docs` directory of your project and using the default build output location.

## GitHub Pages

1. Set `base` in `.vuepress/config.js` to your repository's name. For example, if your repository is `https://github.com/foo/bar`, the deployed pages will be available at `https://foo.github.io/bar`. In this case, you should set `base` to `"/bar/"`.

2. Inside your project, run:

``` bash
# build
vuepress build docs

# navigate into the build output directory
cd docs/.vuepress/dist

git init
git add -A
git commit -m 'deploy'

# push to the gh-pages branch of your repo.
# replace <USERNAME>/<REPO> with your info
git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
```

You can run this script in your CI setup to enable automatic deployment on each push.

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
