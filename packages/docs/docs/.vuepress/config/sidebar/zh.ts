import { SidebarConfig4Multiple } from 'vuepress/config'
import {
  getApiSidebar,
  getGuideSidebar,
  getPluginSidebar,
  getThemeSidebar
} from './shared'

export const Sidebar4ZH: SidebarConfig4Multiple = {
  '/zh/api/': getApiSidebar(),
  '/zh/guide/': getGuideSidebar('指南', '深入'),
  '/zh/plugin/': getPluginSidebar('插件', '介绍', '官方插件'),
  '/zh/theme/': getThemeSidebar('主题', '介绍')
}

