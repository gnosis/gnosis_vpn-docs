/**
 * Ejected from @docusaurus/theme-classic 3.10.1.
 *
 * Upstream renders only the navbar items. We put the docs tree first, then a
 * divider, then the navbar items as a utility group. The tree is teleported
 * here by DocSidebar/Mobile through the secondary-menu filler — that is the
 * only route by which it reaches the navbar, which is mounted above the docs
 * plugin's providers. It is null on routes with no sidebar.
 */
import React from "react";
import { useThemeConfig } from "@docusaurus/theme-common";
import {
  useNavbarMobileSidebar,
  useNavbarSecondaryMenu,
} from "@docusaurus/theme-common/internal";
import NavbarItem from "@theme/NavbarItem";

export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useThemeConfig().navbar.items;
  const { content: docsTree } = useNavbarSecondaryMenu();

  return (
    <>
      {docsTree}
      {docsTree && <hr className="gvpnMenuDivider" />}
      <ul className="menu__list">
        {items.map((item, i) => (
          <NavbarItem
            mobile
            {...item}
            onClick={() => mobileSidebar.toggle()}
            key={i}
          />
        ))}
      </ul>
    </>
  );
}
