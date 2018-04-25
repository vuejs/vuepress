# Introduction

VuePress est composé de deux parties: un générateur de site statique minimaliste avec un système de thème basé sur Vue, et un thème par défaut optimisé pour l'écriture de documentation technique. Il a été créé pour prendre en charge les besoins de documentation des sous-projets de Vue.

Chaque page générée par VuePress possède son propre code HTML statique pré-rendu, offrant une grande performance de chargement et est compatible avec le SEO. Cependant, une fois la page chargée, Vue prend en charge le contenu statique et le transforme en une application de page unique (SPA) complète. Des pages supplémentaires sont récupérées à la demande lorsque l'utilisateur navigue sur le site.

## Comment ça fonctionne

Un site VuePress est en fait un SPA alimenté par [Vue](http://vuejs.org/), [Vue Router](https://github.com/vuejs/vue-router) et [webpack](http://webpack.js.org/). Si vous avez déjà utilisé Vue, vous remarquerez l'expérience de développement habituelle lorsque vous écrivez ou développez des thèmes personnalisés (vous pouvez même utiliser Vue DevTools pour déboguer votre thème personnalisé!).

Pendant la construction, nous créons une version rendue par le serveur de l'application et rendons le HTML correspondant en visitant virtuellement chaque route. Cette approche est inspirée de la commande `nuxt generate` de [Nuxt](https://nuxtjs.org/) et d'autres projets comme [Gatsby](https://www.gatsbyjs.org/).

Chaque fichier markdown est compilé en HTML avec [markdown-it](https://github.com/markdown-it/markdown-it), puis traité comme le modèle d'un composant Vue. Cela vous permet d'utiliser directement Vue dans vos fichiers markdown et est idéal lorsque vous avez besoin d'incorporer du contenu dynamique.

## Caractéristiques

- [Extensions markdown intégrées](./markdown.md) optimisé pour la documentation technique
- [Possibilité de tirer parti de Vue à l'intérieur des fichiers markdown](./using-vue.md)
- [Système de thème personnalisé alimenté par vue](./custom-themes.md)
- Génération automatique des agents de service
- Intégration de Google Analytics
- Prise en charge multilingue
- Un thème par défaut avec:
  - Une mise en page responsive
  - Une page d'accueil optionnelle
  - Recherche simple basée sur l'en-tête, prête à l'emploi
  - Barre de navigation et barre latérale personnalisables
  - Lien GitHub généré automatiquement et liens d'édition de page

## Todo

VuePress est encore un travail en cours. Il y a quelques choses qu'il ne supporte pas actuellement mais qui sont prévues:

- Support de blogs

Les contributions sont les bienvenues!

## Pourquoi pas ...?

### Nuxt

Nuxt est capable de faire ce que fait VuePress, mais il est conçu pour construire des applications. VuePress se concentre sur les sites statiques centrés sur le contenu et propose des fonctionnalités adaptées à la documentation technique prête à l'emploi.

### Docsify / Docute

Les deux sont de grands projets et aussi alimentés par Vue. Sauf qu'ils sont tous les deux complètement pilotés à l'exécution et donc pas SEO-friendly. Si vous ne vous souciez pas du référencement et que vous ne voulez pas vous tromper avec l'installation de dépendances, ce sont toujours de bons choix.

### Hexo

Hexo a bien servi les documents de Vue - en fait, nous sommes probablement encore loin d'en avoir migré pour notre site principal. Le plus gros problème est que son système de thèmes est très statique et basé sur des chaînes - nous voulons vraiment tirer parti de Vue pour la mise en page et l'interactivité. De plus, le rendu des marques de Hexo n'est pas le plus flexible à configurer.
