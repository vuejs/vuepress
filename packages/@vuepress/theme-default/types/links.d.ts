/**
 * Base nav item, displayed as text
 */
export interface NavItem {
  text: string
  ariaLabel?: string
}

/**
 * Base nav group, has nav items children
 */
export interface NavGroup<T extends NavItem = NavItem> extends NavItem {
  children: T[]
}

/**
 * Props for `<NavLink>`
 */
export interface NavLink extends NavItem {
  link: string
  rel?: string
  target?: string
}

/**
 * Navbar types
 */
// user config
export type NavbarItem = NavLink
export type NavbarGroup = NavGroup<NavbarItem | string>
export type NavbarConfig = (NavbarItem | NavbarGroup | string)[]
// resolved
export type ResolvedNavbarItem = NavLink | NavGroup

/**
 * Sidebar types
 */
// user config
export interface SidebarItem extends NavLink {
  isGroup?: false
  children?: SidebarItem[]
}
export interface SidebarGroup extends NavGroup<SidebarItem | string> {
  isGroup: true
}
export type SidebarConfigArray = (SidebarGroup | SidebarItem | string)[]
export type SidebarConfigObject = Record<string, SidebarConfigArray>
export type SidebarConfig = SidebarConfigArray | SidebarConfigObject
// resolved
export interface ResolvedSidebarItem extends SidebarItem {
  link?: string
  isGroup?: boolean
  children?: ResolvedSidebarItem[]
}
