// Ejected from @docusaurus/theme-classic 3.10.1: docs tree first, navbar items below as a utility group.
import React from "react";
import clsx from "clsx";
import { ThemeClassNames, useThemeConfig } from "@docusaurus/theme-common";
import {
  useNavbarMobileSidebar,
  useNavbarSecondaryMenu,
} from "@docusaurus/theme-common/internal";
import { useLocation } from "@docusaurus/router";
import { usePluginData } from "@docusaurus/useGlobalData";
import DocSidebarItems from "@theme/DocSidebarItems";
import NavbarItem from "@theme/NavbarItem";

// Same tree and click handling as DocSidebar/Mobile, for pages without a docs sidebar (the front page).
function FallbackDocsTree() {
  const mobileSidebar = useNavbarMobileSidebar();
  const { pathname } = useLocation();
  const { sidebar } = usePluginData("gvpn-docs-tree");

  return (
    <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, "menu__list")}>
      <DocSidebarItems
        items={sidebar}
        activePath={pathname}
        onItemClick={(item) => {
          if (item.type === "link" || (item.type === "category" && item.href)) {
            mobileSidebar.toggle();
          }
        }}
        level={1}
      />
    </ul>
  );
}

export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useThemeConfig().navbar.items;
  // Teleported by DocSidebar/Mobile via the secondary-menu filler; null on routes without a sidebar.
  const { content: docsTree } = useNavbarSecondaryMenu();

  return (
    <>
      {docsTree ?? <FallbackDocsTree />}
      <hr className="gvpnMenuDivider" />
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
