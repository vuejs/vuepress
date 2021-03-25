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
export interface NavGroup<T> extends NavItem {
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
export type NavbarGroup = NavGroup<NavbarGroup | NavbarItem | string>
export type NavbarConfig = (NavbarItem | NavbarGroup | string)[]
// resolved
export type ResolvedNavbarItem = NavbarItem | NavGroup<ResolvedNavbarItem>

/**
 * Sidebar types
 */
// user config
export interface SidebarItem
  extends NavLink,
    NavGroup<NavLink | SidebarItem | string> {
  isGroup?: false
}
export interface SidebarGroup
  extends NavGroup<SidebarGroup | NavLink | SidebarItem | string> {
  isGroup: true
}
export type SidebarConfigArray = (SidebarGroup | SidebarItem | string)[]
export type SidebarConfigObject = Record<string, SidebarConfigArray>
export type SidebarConfig = SidebarConfigArray | SidebarConfigObject
// resolved
export interface ResolvedSidebarItem extends Partial<NavLink> {
  isGroup?: boolean
  children?: ResolvedSidebarItem[]
}
