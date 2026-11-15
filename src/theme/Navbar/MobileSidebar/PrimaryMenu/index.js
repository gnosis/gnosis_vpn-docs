// Ejected from @docusaurus/theme-classic 3.10.1: docs tree first, navbar items below as a utility group.
import React from "react";
import clsx from "clsx";
import { useLocation } from "@docusaurus/router";
import { usePluginData } from "@docusaurus/useGlobalData";
import { ThemeClassNames, useThemeConfig } from "@docusaurus/theme-common";
import { useNavbarMobileSidebar } from "@docusaurus/theme-common/internal";
import DocSidebarItems from "@theme/DocSidebarItems";
import NavbarItem from "@theme/NavbarItem";

export default function NavbarMobilePrimaryMenu() {
  const mobileSidebar = useNavbarMobileSidebar();
  const items = useThemeConfig().navbar.items;
  // Published by src/plugins/docs-sidebar-global-data.js, so the tree is available on every route.
  const { sidebar } = usePluginData("gvpn-docs-sidebar");
  const { pathname } = useLocation();

  return (
    <>
      <ul className={clsx(ThemeClassNames.docs.docSidebarMenu, "menu__list")}>
        <DocSidebarItems
          items={sidebar}
          activePath={pathname}
          onItemClick={(item) => {
            // Same rule as upstream DocSidebar/Mobile: categories close the panel only when they link somewhere.
            if (
              item.type === "link" ||
              (item.type === "category" && item.href)
            ) {
              mobileSidebar.toggle();
            }
          }}
          level={1}
        />
      </ul>
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
