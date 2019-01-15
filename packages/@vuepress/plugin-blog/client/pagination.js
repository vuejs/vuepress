import Vue from 'vue'
import paginations from '@dynamic/vuepress_blog/paginations'
import frontmatterClassifications from '@dynamic/vuepress_blog/frontmatterClassifications'
import pageFilters from '@dynamic/vuepress_blog/pageFilters'
import pageSorters from '@dynamic/vuepress_blog/pageSorters'
import _debug from 'debug'

const debug = _debug('plugin-blog:pagination')

function getClientFrontmatterPageFilter (rawFilter, pid, value) {
  // debug('getClientFrontmatterPageFilter')
  // debug('frontmatterClassifications', frontmatterClassifications)
  // debug('pid', pid)
  const match = frontmatterClassifications.filter(i => i.id === pid)[0]
  return page => rawFilter(page, match && match.keys, value)
}

class PaginationGateway {
  constructor (paginations) {
    this.paginations = paginations
  }

  get pages () {
    return Vue.$vuepress.$get('siteData').pages
  }

  getPagination (pid, id, route) {
    debug('id', id)
    debug('this.paginations', this.paginations)
    const pagnination = this.paginations.filter(p => p.id === id && p.pid === pid)[0]
    return new Pagination(pagnination, this.pages, route)
  }
}

const gateway = new PaginationGateway(paginations)

class Pagination {
  constructor (pagination, pages, route) {
    debug(pagination)
    const { pid, id, paginationPages } = pagination

    const pageFilter = getClientFrontmatterPageFilter(pageFilters[pid], pid, id)
    const pageSorter = pageSorters[pid]

    const { path } = route

    for (let i = 0, l = paginationPages.length; i < l; i++) {
      const page = paginationPages[i]
      if (page.path === path) {
        this.paginationIndex = i
        break
      }
    }

    if (!this.paginationIndex) {
      this.paginationIndex = 0
    }

    this._paginationPages = paginationPages
    this._currentPage = paginationPages[this.paginationIndex]
    this._matchedPages = pages.filter(pageFilter).sort(pageSorter)
  }

  setIndexPage (path) {
    this._indexPage = path
  }

  get length () {
    return this._paginationPages.length
  }

  get pages () {
    const [start, end] = this._currentPage.interval
    return this._matchedPages.slice(start, end + 1)
  }

  get hasPrev () {
    return this.paginationIndex !== 0
  }

  get prevLink () {
    if (this.hasPrev) {
      if (this.paginationIndex - 1 === 0 && this._indexPage) {
        return this._indexPage
      }
      return this._paginationPages[this.paginationIndex - 1].path
    }
  }

  get hasNext () {
    return this.paginationIndex !== this.length - 1
  }

  get nextLink () {
    if (this.hasNext) {
      return this._paginationPages[this.paginationIndex + 1].path
    }
  }
}

export default ({ Vue }) => {
  Vue.mixin({
    methods: {
      $pagination (pid, id) {
        id = id || pid
        return gateway.getPagination(pid, id, this.$route)
      }
    }
  })
}
