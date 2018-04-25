# Commencer

::: warning NOTE DE COMPATIBILITÉ
VuePress nécessite Node.js >= 8.
:::

## Installation globale

Si vous voulez simplement jouer avec VuePress, vous pouvez l'installer globalement:

``` bash
# installer globalement
yarn global add vuepress # OU npm install -g vuepress

# créer un fichier markdown
echo '# Bonjour VuePress' > README.md

# commencer à rédiger
vuepress dev

# construire
vuepress build
```

## Dans un projet existant

Si vous avez un projet existant et que vous souhaitez conserver la documentation dans le projet, vous devez installer VuePress en tant que dépendance locale. Cette configuration vous permet également d'utiliser un CI ou des services comme Netlify pour un déploiement automatique en mode push.

``` bash
# installer en tant que dépendance locale
yarn add -D vuepress # OU npm install -D vuepress

# créer un répertoire docs
mkdir docs
# créer un fichier markdown
echo '# Bonjour VuePress' > docs/README.md
```

::: warning AVERTISSEMENT
Il est actuellement recommandé d'utiliser [Yarn](https://yarnpkg.com/en/) au lieu de npm lors de l'installation de VuePress dans un projet existant dont le module webpack 3.x est une dépendance. Npm ne parvient pas à générer l'arbre de dépendances correct dans ce cas.
:::

Ensuite, ajoutez des scripts au `package.json`:

``` json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

Vous pouvez maintenant commencer à écrire avec:

``` bash
yarn docs:dev # OU npm run docs:dev
```

Pour générer des ressources statiques, exécutez:

``` bash
yarn docs:build # OU npm run docs:build
```

Par défaut, les fichiers construits seront dans `.vuepress/dist`, qui peut être configuré via le champ `dest` dans `.vuepress/config.js`. Les fichiers générés peuvent être déployés sur n'importe quel serveur de fichiers statique. Voir [Guide de déploiement](./deploy.md) pour obtenir des instructions sur le déploiement dans les services les plus courants.
