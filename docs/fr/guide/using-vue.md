# Utiliser Vue avec Markdown

## Restrictions d'accès à l'API du navigateur

Étant donné que les applications VuePress sont rendues par le serveur dans Node.js lors de la génération de générations statiques, toute utilisation de Vue doit être conforme aux [exigences du code universel](https://ssr.vuejs.org/en/universal.html). En bref, veillez à accéder uniquement aux API Browser / DOM dans les hooks `beforeMounted` ou` mounted`.

Si vous utilisez des composants qui ne sont pas compatibles SSR (par exemple contenant des directives personnalisées), vous pouvez les placer dans le composant intégré `<ClientOnly>`:

``` md
<ClientOnly>
  <NonSSRFriendlyComponent/>
</ClientOnly>
```

Notez que cela ne corrige pas les composants ou les librairies qui accèdent aux API de navigateur **à l'importation** - pour utiliser un code qui suppose un environnement de navigateur lors de l'importation, vous devez les importer dynamiquement dans des hooks de cycle de vie appropriés:

``` vue
<script>
export default {
  mounted () {
    import('./lib-that-access-window-on-import').then(module => {
      // use code
    })
  }
}
</script>
```

## Templating

### Interpolation

Chaque fichier markdown est d'abord compilé en HTML, puis transmis en tant que composant Vue à `vue-loader`. Cela signifie que vous pouvez utiliser l'interpolation de style Vue dans le texte:

**Entrant**

``` md
{{ 1 + 1 }}
```

**Extrant**

<pre><code>{{ 1 + 1 }}</code></pre>

### Directives

Les directives fonctionnent également:

**Entrant**

``` md
<span v-for="i in 3">{{ i }} </span>
```

**Extrant**

<pre><code><span v-for="i in 3">{{ i }} </span></code></pre>

### Accès aux données de site et de page

Le composant compilé n'a pas de données privées mais a accès aux [métadonnées du site](./custom-themes.md#site-and-page-metadata). Par exemple:

**Entrant**

``` md
{{ $page }}
```

**Extrant**

``` json
{
  "path": "/using-vue.html",
  "title": "Using Vue in Markdown",
  "frontmatter": {}
}
```

## Échappement

Par défaut, les blocs de code isolés sont automatiquement enveloppés avec `v-pre`. Si vous souhaitez afficher des moustaches brutes ou une syntaxe spécifique à Vue dans des extraits de code en ligne ou du texte brut, vous devez envelopper un paragraphe avec le conteneur personnalisé `v-pre`:

**Entrant**

``` md
::: v-pre
`{{ This will be displayed as-is }}`
:::
```

**Extrant**

::: v-pre
`{{ This will be displayed as-is }}`
:::

## Utiliser des composants

Tous les fichiers `*.vue` trouvés dans` .vuepress/components` sont automatiquement enregistrés comme composant [global](https://vuejs.org/v2/guide/components-registration.html#Global-Registration), [async](https://vuejs.org/v2/guide/components-dynamic-async.html#Async-Components). Par exemple:
```
.
└─ .vuepress
   └─ components
      ├─ demo-1.vue
      ├─ OtherComponent.vue
      └─ Foo
         └─ Bar.vue
```

À l'intérieur de tout fichier markdown, vous pouvez directement utiliser les composants (les noms sont déduits des noms de fichiers):

``` md
<demo-1/>
<OtherComponent/>
<Foo-Bar/>
```

<demo-1></demo-1>

<OtherComponent/>

<Foo-Bar/>

::: warning IMPORTANT
Assurez-vous que le nom d'un composant personnalisé contient un trait d'union ou est PascalCase. Sinon, il sera traité comme un élément en ligne et enveloppé dans une balise `<p>`, ce qui conduira à une incompatibilité d'`hydration` car `<p>` ne permet pas de placer des éléments de bloc à l'intérieur.
:::

### Utilisation de pré-processeurs

VuePress intègre la configuration webpack pour les pré-processeurs suivants: `sass`,` scss`, `less`,` stylus` et `pug`. Tout ce que vous devez faire est d'installer les dépendances correspondantes. Par exemple, pour activer `sass`, installez les éléments suivants dans votre projet:
 
``` bash
yarn add -D sass-loader node-sass
```

Vous pouvez maintenant utiliser les éléments suivants dans les composants markdown et theme:

``` vue
<style lang="sass">
.title
  font-size: 20px
</style>
```

Utiliser `<template lang =" pug ">` nécessite l'installation de `pug` et `pug-plain-loader`:

``` bash
yarn add -D pug pug-plain-loader
```

::: tip CONSEIL
Si vous êtes un utilisateur Stylus, vous n'avez pas besoin d'installer `stylus` et` stylus-loader` dans votre projet parce que VuePress utilise Stylus à l'interne.
  
Pour les pré-processeurs qui n'ont pas de support de configuration de webpack intégré, vous devrez [étendre la configuration de webpack interne](../config/#configurewebpack) en plus d'installer les dépendances nécessaires.
:::

## Script et Style

Parfois, vous devrez peut-être appliquer du code JavaScript ou CSS uniquement à la page en cours. Dans ces cas, vous pouvez directement écrire des blocs `<script>` ou `<style>` dans le fichier de démarquage, et ils seront sortis du code HTML compilé et utilisés comme les blocs `<script>` et `<style>` pour le composant de fichier unique Vue résultant.

<p class="demo" :class="$style.example"></p>

<style module>
.example {
  color: #41b883;
}
</style>

<script>
export default {
  mounted () {
    document.querySelector(`.${this.$style.example}`)
      .textContent = 'This is rendered by inline script and styled by inline CSS'
  }
}
</script>
