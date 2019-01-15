import { findPageByKey } from '@app/util'
import frontmatterClassifiedPageMap from '@dynamic/vuepress_blog/frontmatterClassified'

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
  const computed = Object.keys(frontmatterClassifiedPageMap)
    .map(classifiedType => {
      const map = frontmatterClassifiedPageMap[classifiedType]
      const helperName = `$${classifiedType}`
      return {
        [helperName] () {
          const { pages } = this.$site
          const classified = new Classifiable(map, pages)
          return classified
        },
        [`$current${classifiedType.charAt(0).toUpperCase() + classifiedType.slice(1)}`] () {
          const tagName = this.$route.meta.frontmatterClassificationKey
          return this[helperName].getItemByName(tagName)
        }
      }
    })
    .reduce((map, item) => {
      Object.assign(map, item)
      return map
    }, {})

  Vue.mixin({
    computed
  })
}
