# Extensions Markdown

## Ancres d'en-tête

Les en-têtes reçoivent automatiquement les liens d'ancrage. Le rendu des ancres peut être configuré en utilisant l'option [`markdown.anchor`](../config/#markdownanchor).

## Liens

### Liens internes

Les liens entrants se terminant par `.md` ou `.html` sont convertis en `<router-link>` pour la navigation du SPA.

Chaque sous-répertoire de votre site statique doit contenir un `README.md`. Il sera automatiquement converti en `index.html`.

::: tip CONSEIL
Lorsque vous écrivez le chemin relatif au répertoire `index.html`, n'oubliez pas de le fermer avec un `/`, sinon vous obtiendrez un 404. Par exemple, utilisez `/config/`au lieu de `/config` .
:::

Si vous souhaitez créer un lien vers un autre fichier markdown dans un répertoire, n'oubliez pas de:

1.  Ajoutez-le avec `.html` ou `.md`
2.  Assurez-vous que le cas correspond, car le chemin est sensible à la casse

#### Exemple

Compte tenu de la structure de répertoire suivante:

```
.
├─ README.md
├─ foo
│  ├─ README.md
│  ├─ one.md
│  └─ two.md
└─ bar
   ├─ README.md
   ├─ three.md
   └─ four.md
```

```md
[Home](/) <!-- Envoie l'utilisateur à la racine README.md -->
[foo](/foo/) <!-- Envoie l'utilisateur à index.html du répertoire foo -->
[foo heading anchor](/foo/#heading) <!-- Ancre l'utilisateur à un en-tête dans le fichier README de foo -->
[foo - one](/foo/one.html) <!-- Vous pouvez ajouter .html -->
[foo - two](/foo/two.md) <!-- Ou vous pouvez ajouter .md -->
```

### Liens externes

Les liens sortants obtiennent automatiquement `target = "_ blank "`:

- [vuejs.org](https://vuejs.org)
- [VuePress sur GitHub](https://github.com/vuejs/vuepress)

## Front Matter

[YAML front matter](https://jekyllrb.com/docs/frontmatter/) est utilisé par défaut:

``` yaml
---
title: Bloguer comme un hacker
lang: fr-CA
---
```

Les données seront disponibles pour le reste de la page, plus tous les composants personnalisés et thématisés comme `$page`.

`title` et` lang` seront automatiquement définis sur la page en cours. De plus, vous pouvez spécifier des métabalises supplémentaires à injecter:


``` yaml
---
meta:
  - name: description
    content: bonjour
  - name: mot clés
    content: super SEO
---
```

### Alternative aux formats Front Matter

De plus, VuePress prend également en charge les éléments JSON ou [TOML](https://github.com/toml-lang/toml).

Le contenu JSON doit commencer et se terminer par des accolades:

```
---
{
  "title": "Bloguer comme un hacker",
  "lang": "en-US"
}
---
```

TOML doit être marqué explicitement comme TOML:

```
---toml
title = "Bloguer comme un hacker"
lang = "en-US"
---
```

## Tables GitHub

**Entrant**

```
| Les tables        | sont           | super  |
| ------------- |:-------------:| -----:|
| col 3 est      | alignée à droite | $1600 |
| col 2 est      | centrée      |   $12 |
| bandes de zèbres | sont soignés |    $1 |
```

**Extrant**

| Les tables        | sont           | super  |
| ------------- |:-------------:| -----:|
| col 3 est      | alignée à droite | $1600 |
| col 2 est      | centrée      |   $12 |
| bandes de zèbres | sont soignés |    $1 |

## Emoji :tada:

**Entrant**

```
:tada: :100:
```

**Extrant**

:tada: :100:

Une liste de tous les emojis disponibles peut être trouvée [ici](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json).

## Table des matières

**Entrant**

```
[[toc]]
```

**Extrant**

[[toc]]

Le rendu de la table des matières peut être configuré en utilisant l'option [`markdown.toc`](../config/#markdowntoc).

## Conteneurs personnalisés

**Entrant**

```
::: tip CONSEIL
C'est un conseil
:::

::: warning AVERTISSEMENT
Ceci est un avertissement
:::

::: danger DANGER
Ceci est un avertissement dangereux
:::
```

**Extrant**

::: tip CONSEIL
C'est un conseil
:::

::: warning AVERTISSEMENT
Ceci est un avertissement
:::

::: danger DANGER
C'est une chose dangereuse
:::

Vous pouvez également personnaliser le titre du bloc:

```
::: danger ARRÊT
Zone de danger, ne pas continuer
:::
```

::: danger ARRÊT
Zone de danger, ne pas continuer
:::

## Mise en surbrillance de la ligne dans les blocs de code

**Entrant**

````
``` js{4}
export default {
  data () {
    return {
      msg: 'À souligné!'
    }
  }
}
```
````

**Extrant**

``` js{4}
export default {
  data () {
    return {
      msg: 'À souligné!'
    }
  }
}
```

## Configuration avancée

VuePress utilise [markdown-it](https://github.com/markdown-it/markdown-it) comme moteur de rendu markdown. Beaucoup des extensions ci-dessus sont implémentées via des plugins personnalisés. Vous pouvez personnaliser davantage l'instance de `markdown-it` en utilisant l'option `markdown` dans `.vuepress/config.js`:

``` js
module.exports = {
  markdown: {
    // options pour les ancres markdown-it
    anchor: { permalink: false },
    // options pour la table des matières markdown-it
    toc: { includeLevel: [1, 2] },
    config: md => {
      // utilisez plus de plugins markdown-it!
      md.use(require('markdown-it-xxx'))
    }
  }
}
```
