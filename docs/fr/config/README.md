---
sidebar: auto
---

# Référence de configuration

## Configuration de base

### base

- Type: `string`
- Défaut: `/`

L'URL de base sur laquelle le site sera déployé. Vous devrez la définir si vous prévoyez de déployer votre site sous un sous-chemin, par exemple des pages GitHub. Si vous envisagez de déployer votre site sur `https://foo.github.io/bar/`, alors `base` devrait être configuré comme suit `"/bar/"`. L'URL devrait toujours commencer et se terminer par une barre oblique.

L'URL de `base` est automatiquement ajouté à toutes les URL commençant par `/` dans les autres options, vous n'avez donc qu'à la spécifier une seule fois.

**Également voir:**

- [URL de base](../guide/assets.md#base-url)
- [Guide de déploiement > Pages Github](../guide/deploy.md#github-pages)

### titre

- Type: `string`
- Défaut: `undefined`

Le titre pour le site. Ce sera le préfixe pour tous les titres de page, et affiché dans la barre de navigation dans le thème par défaut.

### description

- Type: `string`
- Défaut: `undefined`

Description pour le site. Cela sera rendu en tant que balise `<meta>` dans la page HTML.

### en-tête

- Type: `Array`
- Défaut: `[]`

Balises supplémentaires à injecter sur la balise `<head>` dans la page HTML. Chaque balise peut être spécifiée sous la forme `[nomDuTag, {nomAttr: valeurAttr}, htmlInterne?]`. Par exemple, pour ajouter un favicon personnalisé:

``` js
module.exports = {
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }]
  ]
}
```

### hôte

- Type: `string`
- Défaut: `'0.0.0.0'`

Indiquez l'hôte à utiliser pour le serveur de développement.

### port

- Type: `number`
- Défaut: `8080`

Indiquez le port à utiliser pour le serveur de développement.

### destination

- Type: `string`
- Défaut: `.vuepress/dist`

Spécifiez le répertoire de sortie de `vuepress build`.

### ga

- Type: `string`
- Défaut: `undefined`

Fournissez l'identifiant Google Analytics pour activer l'intégration.

### agent de service

- Type: `boolean`
- Défaut: `false`

Si la valeur est true, VuePress génère et enregistre automatiquement un agent de service qui met en mémoire le contenu pour une utilisation hors connexion (activé uniquement en production).

Si vous développez un thème personnalisé, le composant `Layout.vue` émettra également les événements suivants:

- `sw-ready`
- `sw-cached`
- `sw-updated`
- `sw-offline`
- `sw-error`

::: tip NOTES PWA
L'option `agent de service` ne gère que l'agent. Pour que votre site soit entièrement conforme à la norme PWA, vous devez fournir le manifeste et les icônes de l'application Web dans `.vuepress/public`. Pour plus de détails, voir [Documents MDN sur le manifeste de l'application Web](https://developer.mozilla.org/fr/docs/Web/Manifest).

En outre, activez uniquement cette option si vous êtes en mesure de déployer votre site avec SSL, car le service worker peut uniquement être enregistré sous des URL HTTPs.
:::

### lieux

- Type: `{ [path: string]: Object }`
- Défaut: `undefined`

Spécifiez les paramètres régionaux pour le support i18n. Pour plus de détails, voir le guide sur l'[Internationalisation](../guide/i18n.md).

## Thématisation

### thème

- Type: `string`
- Défaut: `undefined`

Spécifiez ceci pour utiliser un thème personnalisé. Avec la valeur de `"foo"`, VuePress va tenter de charger le composant thème dans `node_modules/vuepress-theme-foo/Layout.vue`.

### configuration du thème

- Type: `Object`
- Défaut: `{}`

Fournissez des options de configuration au thème utilisé. Les options varient en fonction du thème que vous utilisez.

**Également voir:**

- [Configuration du thème par défaut](../default-theme-config/).

## Markdown

### markdown.slugify

- Type: `Function`
- Défaut: [source](https://github.com/vuejs/vuepress/blob/master/lib/markdown/slugify.js)

Fonction pour transformer les textes d'en-tête en `slug`. Cela affecte les identifiants / liens générés pour les ancres d'en-tête, la table des matières et les liens du menu latérale.

### markdown.anchor

- Type: `Object`
- Défaut: `{ permalink: true, permalinkBefore: true, permalinkSymbol: '#' }`

Options pour [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor). (Note: préférez
`markdown.slugify` si vous souhaitez personnaliser les ID d'en-tête.)

### markdown.toc

- Type: `Object`
- Défaut: `{ includeLevel: [2, 3] }`

Options pour [markdown-it-table-of-contents](https://github.com/Oktavilla/markdown-it-table-of-contents). (Note: préférez `markdown.slugify` si vous souhaitez personnaliser les ID d'en-tête.)

### markdown.config

- Type: `Function`
- Défaut: `undefined`

Une fonction pour appliquer des plugins supplémentaires à la [markdown-it](https://github.com/markdown-it/markdown-it) instance utilisée pour le rendu des fichiers sources. Exemple:

``` js
module.exports = {
  markdown: {
    config: md => {
      md.use(require('markdown-it-xxx'))
    }
  }
}
```

## Pipeline de construction

### postcss

- Type: `Object`
- Défaut: `{ plugins: [require('autoprefixer')] }`

Options pour [postcss-loader](https://github.com/postcss/postcss-loader). Remarque, en spécifiant cette valeur écrasera autoprefixer et vous devrez l'inclure vous-même.

### stylus

- Type: `Object`
- Défaut: `{ preferPathResolver: 'webpack' }`

Options pour [stylus-loader](https://github.com/shama/stylus-loader).

### scss

- Type: `Object`
- Défaut: `{}`

Options pour [sass-loader](https://github.com/postcss/postcss-loader) qui permet le chargement des fichiers `*.scss`.

### sass

- Type: `Object`
- Défaut: `{ indentedSyntax: true }`

Options pour [sass-loader](https://github.com/webpack-contrib/sass-loader) qui permet le chargement des fichiers `*.sass`.

### less

- Type: `Object`
- Défaut: `{}`

Options pour [less-loader](https://github.com/webpack-contrib/less-loader) qui permet le chargement des fichiers `*.less`.

### configuration de Webpack

- Type: `Object | Function`
- Défaut: `undefined`

Modifiez la configuration de webpack interne. Si la valeur est un objet, elle sera fusionnée dans la configuration finale en utilisant [webpack-merge] (https://github.com/survivejs/webpack-merge); Si la valeur est une fonction, elle recevra la config comme premier argument et un booléen `isServer` comme deuxième argument. Vous pouvez soit muter la configuration directement, soit renvoyer un objet à fusionner:

``` js
module.exports = {
  configureWebpack: (config, isServer) => {
    if (!isServer) {
      // muter la config pour le client
    }
  }
}
```

### chaîne Webpack

- Type: `Function`
- Défaut: `undefined`

Modifiez la configuration de webpack interne avec [webpack-chain](https://github.com/mozilla-neutrino/webpack-chain).

``` js
module.exports = {
  chainWebpack: (config, isServer) => {
    // config est une instance de ChainableConfig
  }
}
```

## Compatibilité des navigateurs

### Navigateurs `evergreen`

- Type: `boolean`
- Défaut: `false`

Définissez `true` si vous ne ciblez que les dernières versions des navigateurs. Cela désactivera la transpilation ES5 et les polyfills pour IE, et entraînera la construction des fichiers plus rapidement et des fichiers plus petits.
