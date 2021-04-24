import type { GitPluginPageData } from '@vuepress/plugin-git'
import type { NavLink, SidebarConfig } from './nav'

export interface DefaultThemePageData extends GitPluginPageData {
  filePathRelative: string
}

export interface DefaultThemePageFrontmatter {
  home?: boolean
  navbar?: boolean
  pageClass?: string
}

export interface DefaultThemeHomePageFrontmatter
  extends DefaultThemePageFrontmatter {
  home: true
  heroImage?: string
  heroAlt?: string
  heroText?: string | null
  tagline?: string | null
  actions?: {
    text: string
    link: string
    type?: 'primary' | 'secondary'
  }[]
  features?: {
    title: string
    details: string
  }[]
  footer?: string
  footerHtml?: boolean
}

export interface DefaultThemeNormalPageFrontmatter
  extends DefaultThemePageFrontmatter {
  home?: false
  editLink?: boolean
  lastUpdated?: boolean
  contributors?: boolean
  sidebar?: 'auto' | false | SidebarConfig
  sidebarDepth?: number
  prev?: string | NavLink
  next?: string | NavLink
}
