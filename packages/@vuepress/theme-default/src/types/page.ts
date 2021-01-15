import type { GitPluginPageData } from '@vuepress/plugin-git'
import type { NavLink, SidebarConfig } from './nav'

export interface DefaultThemePageData extends GitPluginPageData {
  filePathRelative: string
}

export interface DefaultThemeHomePageFrontmatter {
  home: true
  heroImage?: string
  heroAlt?: string
  heroText?: string
  tagline?: string
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
}

export interface DefaultThemePageFrontmatter {
  home?: boolean
  editLink?: boolean
  lastUpdated?: boolean
  contributors?: boolean
  prev?: string | NavLink
  next?: string | NavLink
  sidebar?: 'auto' | false | SidebarConfig
}
