// Ejected from @docusaurus/theme-classic 3.10.1: docs tree first, navbar items below as a utility group.
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
  // Teleported by DocSidebar/Mobile via the secondary-menu filler; null on routes without a sidebar.
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
