# Thèmes personnalisés

::: tip CONSEIL
Les composants du thème sont soumis aux mêmes [restrictions d'accès à l'API de navigateur](./using-vue.md#browser-api-access-restrictions).
:::

VuePress utilise les composants de vue à fichier unique pour les thèmes personnalisés. Pour utiliser une mise en page personnalisée, créez un répertoire `.vuepress/theme` dans la racine de votre document, puis créez un fichier` Layout.vue`:

```
.
└─ .vuepress
   └─ theme
      └─ Layout.vue
```

De là, c'est la même chose que de développer une application Vue normale. C'est entièrement à vous de décider comment organiser votre thème.

## Métadonnées de site et de page

Le composant `Layout` sera invoqué une fois pour chaque fichier `.md` dans `docs`, et les métadonnées pour le site entier et cette page spécifique seront exposées respectivement comme `this.$ Site` et `this.$Page` propriétés qui sont injectées dans chaque composant de l'application.

C'est la valeur de `$site` de ce site web:

``` json
{
  "title": "VuePress",
  "description": "Générateur de site statique alimenté par Vue",
  "base": "/",
  "pages": [
    {
      "path": "/",
      "title": "VuePress",
      "frontmatter": {}
    },
    ...
  ]
}
```

`title`, `description` et `base` sont copiés des champs respectifs dans `.vuepress/config.js`. `pages` contient un tableau d'objets de métadonnées pour chaque page, y compris son chemin, le titre de la page (explicitement spécifié dans [YAML front matter](./markdown.html#yaml-front-matter) ou déduit du premier en-tête de la page), et toutes les données de premier plan YAML dans ce fichier.

C'est l'objet `$ age` pour cette page que vous regardez:

``` json
{
  "path": "/custom-themes.html",
  "title": "Thèmes personalisés",
  "headers": [/* ... */],
  "frontmatter": {}
}
```

Si l'utilisateur a fourni `themeConfig` dans `.vuepress/config.js`, il sera également disponible en tant que `$site.themeConfig`. Vous pouvez l'utiliser pour permettre aux utilisateurs de personnaliser le comportement de votre thème (par exemple, en spécifiant les catégories et l'ordre des pages). Vous pouvez ensuite utiliser ces données avec `$site.pages` pour construire dynamiquement des liens de navigation.

Enfin, n'oubliez pas que `this.$Route` et `this.$Router` sont également disponibles avec l'API de Vue Router.

## Extrait de contenu

Si un fichier markdown contient un commentaire `<!-- more -->`, tout contenu au dessus du commentaire sera extrait et exposé comme `$page.excerpt`. Si vous créez un thème personnalisé pour les blogs, ces données peuvent être utilisées pour afficher une liste de publications avec des extraits.

## Sortie de contenu

Le contenu compilé du fichier `.md` en cours de rendu sera disponible en tant que composant global spécial `<Content />`. Vous aurez besoin de le rendre quelque part dans votre mise en page afin d'afficher le contenu de la page. Le thème le plus simple peut être un seul composant `Layout.vue` avec le contenu suivant:

``` html
<template>
  <div class="theme-container">
    <Content/>
  </div>
</template>
```

## Améliorations au niveau de l'application

Comme l'application VuePress est une application Vue standard, vous pouvez appliquer des améliorations au niveau de l'application en créant un fichier `.vuepress/enhanApp.js`, qui sera importé dans l'application si il est présent. Le fichier devrait `exporter par défaut` une fonction de hook qui recevra un objet contenant des valeurs au niveau de l'application. Vous pouvez utiliser ce hook pour installer des plugins Vue supplémentaires, enregistrer des composants globaux ou ajouter des hooks de routeur supplémentaires:

``` js
export default ({
  Vue, // la version de Vue utilisée dans l'application VuePress
  options, // les options pour l'instance racine de Vue
  router, // l'instance du routeur pour l'application
  siteData // métadonnées du site
}) => {
  // ...appliquer des améliorations à l'application
}
```

## Utilisation d'un thème à partir d'une dépendance

Les thèmes peuvent être publiés sur npm au format Vue SFC brut sous la forme `vuepress-theme-xxx`.

Pour utiliser un thème d'une dépendance npm, fournissez une option `theme` dans `.vuepress/config.js`:

``` js
module.exports = {
  theme: 'awesome'
}
```

VuePress tentera de localiser et d'utiliser `node_modules/vuepress-theme-awesome/Layout.vue`.

## Personnaliser le thème par défaut

La commande `vuepress eject [répertoireCible]` copiera le code source du thème par défaut dans `.vuepress/theme` pour permettre une personnalisation complète. Notez cependant qu'une fois éjecté, vous serez seul et ne recevrez pas de mises à jour ou de corrections de bugs sur le thème par défaut même si vous mettez à jour VuePress.
