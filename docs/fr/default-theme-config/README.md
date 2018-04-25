---
sidebar: auto
---

# Configuration par défaut du thème

::: tip CONSEIL
Toutes les options répertoriées sur cette page s'appliquent uniquement au thème par défaut. Si vous utilisez un thème personnalisé, les options peuvent être différentes.
:::

## Page d'accueil


Le thème par défaut fournit une mise en page de la page d'accueil (qui est utilisée sur [la page d'accueil du site](/)). Pour l'utiliser, spécifiez `home: true` et ajoutez d'autres métadonnées dans votre fichier racine` README.md` [YAML front-matter](../guide/markdown.html#yaml-front-matter). Ce sont les données réelles utilisées sur ce site:

``` yaml
---
home: true
heroImage: /hero.png
actionText: Commencer →
actionLink: /fr/guide/
features:
- title: La simplicité avant tout
  details: Une configuration de projet minimale basée sur le markdown pour vous aidez à vous concentrer à écrire.
- title: Alimenté par Vue
  details: Profitez de l'expérience de développement de Vue + webpack, utilisez les composants de Vue dans markdown et développez des thèmes personnalisés avec Vue.
- title: Performant
  details: VuePress génère du code HTML statique pré-rendu pour chaque page et s'exécute en tant que SPA une fois qu'une page est chargée.
footer: Licencié MIT | Droits d'auteur © 2018-présent Evan You
---
```

Tout contenu supplémentaire après le `YAML front matter` sera analysé comme du markdown et rendu après la section des caractéristiques.

Si vous souhaitez utiliser une mise en page de page d'accueil entièrement personnalisée, vous pouvez également utiliser [Mise en page personnalisée](#custom-layout-for-specific-pages).

## Liens Navbar

Vous pouvez ajouter des liens à la barre de navigation via `themeConfig.nav`:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    nav: [
      { text: 'Accueil', link: '/' },
      { text: 'Guide', link: '/fr/guide/' },
      { text: 'Externe', link: 'https://google.com' },
    ]
  }
}
```

Ces liens peuvent également être des menus déroulants si vous fournissez un tableau `d'items` d'un `lien`:

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Chinese', link: '/language/chinese' },
          { text: 'Japanese', link: '/language/japanese' }
        ]
      }
    ]
  }
}
```

De plus, vous pouvez avoir des sous-groupes dans une liste déroulante en ayant des éléments imbriqués:

```js
module.exports = {
  themeConfig: {
    nav: [
      {
        text: 'Languages',
        items: [
          { text: 'Group1', items: [/*  */] },
          { text: 'Group2', items: [/*  */] }
        ]
      }
    ]
  }
}
```

## Barre latérale

Pour activer la barre latérale, utilisez `themeConfig.sidebar`. La configuration de base attend un tableau de liens:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      '/',
      '/page-a',
      ['/page-b', 'Explicit link text']
    ]
  }
}
```

Vous pouvez omettre l'extension `.md`, et les chemins se terminant par `/` sont déduits comme `*/README.md`. Le texte du lien est automatiquement déduit (soit du premier en-tête de la page, soit du titre explicite du `YAML front matter`). Si vous souhaitez spécifier explicitement le texte du lien, utilisez un tableau sous forme de `[lien, texte]`.

### Liens d'en-tête imbriqués

La barre latérale affiche automatiquement les liens pour les en-têtes dans la page active en cours, imbriqués sous le lien de la page elle-même. Vous pouvez personnaliser ce comportement en utilisant `themeConfig.sidebarDepth`. La profondeur par défaut est `1`, ce qui extrait les en-têtes` h2`. Le mettre à `0` désactive les liens d'en-tête, et la valeur maximum est` 2` qui extrait les en-têtes `h2` et` h3`.

Une page peut également remplacer cette valeur en utilisant `YAML front matter`:

``` md
---
sidebarDepth: 2
---
```

### Groupes de barre latérale

Vous pouvez diviser les liens de la barre latérale en plusieurs groupes en utilisant des objets:

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: [
      {
        title: 'Group 1',
        collapsable: false,
        children: [
          '/'
        ]
      },
      {
        title: 'Group 2',
        children: [ /* ... */ ]
      }
    ]
  }
}
```

Les groupes de la barre latérale sont rétractables par défaut. Vous pouvez forcer un groupe à toujours être ouvert avec `collapsable: false`.

### Barre latérale multiple

Si vous souhaitez afficher différentes barres latérales pour différentes sections de contenu, organisez d'abord vos pages dans des répertoires pour chaque section souhaitée:

```
.
├─ README.md
├─ contact.md
├─ about.md
├─ foo/
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar/
   ├─ README.md
   ├─ three.md
   └─ four.md
```

Ensuite, mettez à jour votre configuration pour définir votre barre latérale pour chaque section.

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    sidebar: {
      '/foo/': [
        '',     /* /foo/ */
        'one',  /* /foo/one.html */
        'two'   /* /foo/two.html */
      ],

      '/bar/': [
        '',      /* /bar/ */
        'three', /* /bar/three.html */
        'four'   /* /bar/four.html */
      ],

      // fallback
      '/': [
        '',        /* / */
        'contact', /* /contact.html */
        'about'    /* /about.html */
      ]
    }
  }
}
```

::: warning AVERTISSEMENT
Assurez-vous de définir la configuration de secours en dernier.

VuePress vérifie chaque configuration de la barre latérale de haut en bas. Si la configuration de secour était la première, VuePress ne correspondrait pas correctement `/foo/` ou `/bar/four.html` car ils commencent tous deux par `/`.
:::

### Barre latérale automatique pour les pages uniques

Si vous souhaitez générer automatiquement une barre latérale contenant uniquement les liens d'en-tête de la page en cours, vous pouvez utiliser `YAML front matter` sur cette page:

``` yaml
---
sidebar: auto
---
```

### Désactiver la barre latérale

Vous pouvez désactiver la barre latérale sur une page spécifique avec `YAML front matter`:

``` yaml
---
sidebar: false
---
```

## Barre de recherche

### Recherche intégrée

Vous pouvez désactiver la boîte de recherche intégrée avec `themeConfig.search: false`, et personnaliser le nombre de suggestions à afficher avec `themeConfig.searchMaxSuggestions`:

``` js
module.exports = {
  themeConfig: {
    search: false,
    searchMaxSuggestions: 10
  }
}
```

### Recherche Algolia

L'option `themeConfig.algolia` vous permet d'utiliser [Algolia DocSearch] (https://community.algolia.com/docsearch/) pour remplacer la recherche intégrée simple. Pour l'activer, vous devez fournir au moins `apiKey` et `indexName`:

```js
module.exports = {
  themeConfig: {
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
    }
  }
}
```

Pour plus d'options, reportez-vous à la documentation de [Algolia DocSearch](https://github.com/algolia/docsearch#docsearch-options).

## Liens précédents / suivants

Les liens précédent et suivant sont automatiquement déduits en fonction de l'ordre dans la barre latérale de la page active. Vous pouvez également les écraser ou les désactiver explicitement en utilisant `YAML front matter`:

``` yaml
---
prev: ./some-other-page
next: false
---
```

## Git Repo et Modifier les liens

Fournir `themeConfig.repo` génère un lien GitHub dans la barre de navigation et des liens" Modifier cette page "au bas de chaque page.

``` js
// .vuepress/config.js
module.exports = {
  themeConfig: {
    // Assumes GitHub. Can also be a full GitLab url.
    repo: 'vuejs/vuepress',
    // Customising the header label
    // Defaults to "GitHub"/"GitLab"/"Bitbucket" depending on `themeConfig.repo`
    repoLabel: 'Contribute!',

    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: 'vuejs/vuepress',
    // if your docs are not at the root of the repo:
    docsDir: 'docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to true, set to false to disable
    editLinks: true,
    // custom text for edit link. Defaults to "Edit this page"
    editLinkText: 'Help us improve this page!'
  }
}
```

## Remplacement CSS simple

Si vous souhaitez appliquer des substitutions simples au style du thème par défaut, vous pouvez créer un fichier `.vuepress/override.styl`. C'est un fichier [Stylus](http://stylus-lang.com/) mais vous pouvez également utiliser la syntaxe CSS normale.

Il y a quelques variables de couleur que vous pouvez modifier:

``` stylus
// showing default values
$accentColor = #3eaf7c
$textColor = #2c3e50
$borderColor = #eaecef
$codeBgColor = #282c34
```

## Classe de page personnalisée

Parfois, vous devrez peut-être ajouter une classe unique pour une page spécifique afin que vous puissiez cibler le contenu sur cette page uniquement dans un CSS personnalisé. Vous pouvez ajouter une classe au div du conteneur de thème avec `pageClass` dans `YAML front matter`:

``` yaml
---
pageClass: custom-page-class
---
```

Ensuite, vous pouvez écrire du CSS ciblant cette page uniquement:

``` css
/* .vuepress/override.styl */

.theme-container.custom-page-class {
  /* page-specific rules */
}
```

## Mise en page personnalisée pour des pages spécifiques

Par défaut, le contenu de chaque fichier `*.md` est rendu dans un conteneur `<div class="page">`, avec la barre latérale, les liens d'édition générés automatiquement et les liens précedent/suivant. Si vous souhaitez utiliser un composant complètement personnalisé à la place de la page (tout en gardant seulement la barre de navigation), vous pouvez spécifier à nouveau le composant à utiliser en utilisant `YAML front matter`:

``` yaml
---
layout: SpecialLayout
---
```

Cela va utilisé comme rendu `.vuepress/components /SpecialLayout.vue` pour la page donnée.

## Éjecter

Vous pouvez copier le code source du thème par défaut dans `.vuepress/theme` pour personnaliser complètement le thème en utilisant la commande `vuepress eject [répertoireCible]`. Notez cependant qu'une fois éjecté, vous serez seul et ne recevrez pas de mises à jour ou de corrections de bugs sur le thème par défaut même si vous mettez à jour VuePress.
