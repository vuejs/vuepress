# Configuration

## Fichier de configuration

Sans aucune configuration, la page est assez minimale et l'utilisateur n'a aucun moyen de naviguer sur le site. Pour personnaliser votre site, créons d'abord un répertoire `.vuepress` dans votre répertoire docs. C'est là que tous les fichiers spécifiques à VuePress seront placés.

Le fichier essentiel pour la configuration d'un site VuePress est `.vuepress/config.js`, qui devrait exporter un objet JavaScript:

``` js
module.exports = {
  title: 'Bonjour VuePress',
  description: 'Amusons-nous'
}
```

Si le serveur dev est en cours d'exécution, vous devriez voir que la page contient maintenant un en-tête avec le titre et un champ de recherche. VuePress est livré avec une recherche intégrée basée sur les en-têtes - il construit automatiquement un index de recherche simple à partir des titres, `h2` et` h3` de toutes les pages.

Consultez la [Référence de configuration](../config/) pour une liste complète des options.

::: tip Formats de configuration alternatifs
Vous pouvez également utiliser les formats YAML (`.vuepress/config.yml`) ou TOML (`.vuepress/config.toml`) pour le fichier de configuration.
:::

## Configuration du thème

Un thème VuePress est responsable de tous les détails de mise en page et d'interactivité de votre site. VuePress est livré avec un thème par défaut (vous le voyez en ce moment) qui est conçu pour la documentation technique. Il expose un certain nombre d'options qui vous permettent de personnaliser la barre de navigation, la barre latérale et la page d'accueil, etc. Pour plus de détails, consultez la page [Configuration par défaut du thème](../default-theme-config/).

Si vous souhaitez développer un thème personnalisé, voir [Thèmes personnalisés](./custom-themes.md).

## Améliorations du niveau de l'application

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
