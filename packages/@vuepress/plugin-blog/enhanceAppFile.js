import { findPageByKey } from '@app/util'
import tagMeta from '@dynamic/tag'
import categoryMeta from '@dynamic/category'

class Classifiable {
  constructor (metaMap, pages) {
    this._metaMap = Object.assign({}, metaMap)
    Object.keys(this._metaMap).forEach(name => {
      const { pageKeys } = this._metaMap[name]
      this._metaMap[name].posts = pageKeys.map(key => findPageByKey(pages, key))
    })
  }

  get length () {
    return Object.keys(this._metaMap).length
  }

  get map () {
    return this._metaMap
  }

  get list () {
    return this.toArray()
  }

  toArray () {
    const tags = []
    Object.keys(this._metaMap).forEach(name => {
      const { posts, path } = this._metaMap[name]
      tags.push({ name, posts, path })
    })
    return tags
  }

  getItemByName (name) {
    return this._metaMap[name]
  }
}

export default ({ Vue }) => {
  Vue.mixin({
    computed: {
      $tags () {
        const { pages } = this.$site
        const tags = new Classifiable(tagMeta, pages)
        return tags
      },
      $tag () {
        const tagName = this.$route.meta.tagName
        return this.$tags.getItemByName(tagName)
      },
      $categories () {
        const { pages } = this.$site
        const categories = new Classifiable(categoryMeta, pages)
        return categories
      },
      $category () {
        const categoryName = this.$route.meta.categoryName
        return this.$categories.getItemByName(categoryName)
      }
    }
  })
}
