# Gestion des ressources

## URL relatives

Tous les fichiers markdown sont compilés dans les composants de Vue et traités par webpack, vous pouvez donc et **préférer** référencer n'importe quelle ressource en utilisant les URL relatives:

``` md
![Une image](./image.png)
```

Cela fonctionnerait de la même manière que dans les modèles de fichiers `.vue`. L'image sera traitée avec `url-loader` et `file-loader`, et copiée aux emplacements appropriés dans la construction statique générée.

De plus, vous pouvez utiliser le préfixe `~` pour indiquer explicitement qu'il s'agit d'une requête de module webpack, vous permettant de référencer des fichiers avec des alias webpack ou à partir de dépendances npm:

``` md
![Image d'alias](~@alias/image.png)
![Image de la dépendance](~some-dependency/image.png)
```

Les alias webpack peuvent être configurés via [configureWebpack](/config/#configurewebpack) dans `.vuepress/config.js`. Exemple:

``` js
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@alias': 'chemin/à/un/répertoire'
      }
    }
  }
}
```

## Fichiers publics

Parfois, vous devrez peut-être fournir des ressources statiques qui ne sont pas référencées directement dans vos composants du markdown ou du thème, par exemple, les favicons et les icônes PWA. Dans ce cas, vous pouvez les placer dans `.vuepress/public` et ils seront copiés à la racine du répertoire généré.

## URL de base

Si votre site est déployé sur une URL non racine, vous devrez définir l'option `base` dans` .vuepress/config.js`. Par exemple, si vous envisagez de déployer votre site sur `https://foo.github.io/bar/`, alors `base` devrait être défini sur `"/bar/"` (il devrait toujours commencer et se terminer par une barre oblique).

Avec une URL de base, si vous voulez référencer une image dans `.vuepress/public`, vous devrez utiliser des URL comme `/bar/image.png`. Cependant, c'est fragile si jamais vous décidez de changer la `base` plus tard. Pour aider avec cela, VuePress fournit une aide intégrée `$ewithBase` (injectée sur le prototype de Vue) qui génère le chemin correct:

``` vue
<img :src="$withBase('/foo.png')" alt="foo">
```

Notez que vous pouvez utiliser la syntaxe ci-dessus non seulement dans les composants du thème, mais aussi dans vos fichiers markdown.

De plus, si un `base` est défini, il est ajouté automatiquement à toutes les URL de ressources dans les options `.vuepress/config.js`.
