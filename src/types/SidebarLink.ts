/**
 * Shape of a link used in a sidebar
 */
export type SidebarLink = {
  href: string;
  label: string;
  params?: { [key: string]: string | number }
}
