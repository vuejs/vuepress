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
footer: Licencié MIT | Droits d'auteur © 2018-present Evan You
---

### Aussi facile que 1, 2, 3

``` bash
# installation
yarn global add vuepress # OU npm install -g vuepress

# créer un fichier markdown
echo '# Hello VuePress' > README.md

# commencer à écrire
vuepress dev

# construire en fichiers statiques
vuepress build
```

::: warning NOTE DE COMPATIBILITÉ
VuePress nécessite Node.js >= 8.
:::
