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

// Navbar types
export type NavbarItem = NavLink
export type NavbarGroup = NavGroup<NavbarItem>
export type NavbarConfig = (NavbarItem | NavbarGroup)[]

// Sidebar types
export interface SidebarItem extends NavLink {
  isGroup?: false
  children?: SidebarItem[]
}
export interface SidebarGroup extends NavGroup<SidebarItem> {
  isGroup: true
}
export type SidebarConfigArray = (SidebarGroup | SidebarItem)[]
export type SidebarConfigObject = Record<string, (SidebarGroup | SidebarItem)[]>
export type SidebarConfig = SidebarConfigArray | SidebarConfigObject
