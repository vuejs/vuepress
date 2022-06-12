import { SidebarConfig4Multiple } from 'vuepress/config'
import {
  getApiSidebar,
  getGuideSidebar,
  getPluginSidebar,
  getThemeSidebar
} from './shared'

export const Sidebar4EN: SidebarConfig4Multiple = {
  '/api/': getApiSidebar(),
  '/guide/': getGuideSidebar('Guide', 'Advanced'),
  '/plugin/': getPluginSidebar('Plugin', 'Introduction', 'Official Plugins'),
  '/theme/': getThemeSidebar('Theme', 'Introduction')
}
