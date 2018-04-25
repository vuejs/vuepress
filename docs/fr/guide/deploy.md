# Déployer

Les guides suivants sont basés sur quelques hypothèses partagées:

- Vous placez vos documents dans le répertoire `docs` de votre projet;
- Vous utilisez l'emplacement de sortie de génération par défaut (`.vuepress/dist`);
- VuePress est installé en tant que dépendance locale dans votre projet et vous avez configuré les scripts npm suivants:

``` json
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```

## GitHub Pages

1. Définissez `base` dans` docs/.vuepress/config.js`.

   Si vous déployez dans `https://<NOM_UTILISATEUR>.github.io/`, vous pouvez omettre `base` car par défault c'est défini à `/`.

   Si vous déployez sur `https://<NOM_UTILISATEUR>.github.io/<REPO>/`, (c'est-à-dire que votre repository est `https://github.com/<NOM_UTILISATEUR>/REPO>`), définissez `base` à `"/<REPO>/"`.

2. À l'intérieur de votre projet, créez un fichier `deploy.sh` avec le contenu suivant (avec les lignes en surbrillance non commentées) et lancez-le pour le déployer:

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

::: tip CONSEIL
Vous pouvez également exécuter le script ci-dessus dans votre configuration CI pour activer le déploiement automatique à chaque poussée.
:::

## GitLab Pages et GitLab CI

1. Définissez `base` dans` docs/.vuepress/config.js`.

   Si vous déployez à `https://<NOM_UTILISATEUR ou GROUPE>.gitlab.io/`, vous pouvez omettre `base` car par défault c'est défini à `/`.

   Si vous déployez à `https://<NOM_UTILISATEUR ou GROUPE>.gitlab.io/<REPO>/`, (c'est-à-dire que votre repository est à `https://gitlab.com/<NOM_UTILISATEUR>/REPO>`), défnissez `base` à `"/<REPO>/"`.

2. Définissez `dest` dans `.vuepress/config.js` à `public`.

3. Créez un fichier appelé `.gitlab-ci.yml` à la racine de votre projet avec le contenu ci-dessous. Cela va générer et déployer votre site chaque fois que vous apportez des modifications à votre contenu.

```
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

1. Sur Netlify, configurez un nouveau projet à partir de GitHub avec les paramètres suivants:

  - **Build Command:** `npm run docs:build` or `yarn docs:build`
  - **Publish directory:** `docs/.vuepress/dist`

2. Appuyez le bouton de déploiement!

## Google Firebase

1. Assurez-vous que [firebase-tools](https://www.npmjs.com/package/firebase-tools) est installé.

2. Créez les fichiers `firebase.json` et `.firebaserc` à la racine de votre projet avec le contenu suivant:

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
       "default": "<VOTRE_IDENTIFIANT_FIREBASE>"
     }
   }
   ```

3. Après avoir exécuté `yarn docs: build` ou `npm run docs: build`, déployez avec la commande `firebase deploy`.
