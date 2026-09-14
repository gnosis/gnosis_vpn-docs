/**
 * Ejected from @docusaurus/theme-classic 3.10.1.
 *
 * Upstream renders two sliding panels — the navbar items, and a secondary
 * panel holding the docs tree, reached through a "Back to main menu" step.
 * We render a single panel instead; PrimaryMenu composes the tree and the
 * utility group into it. Everything else (container classes, header) is
 * unchanged, so the panel keeps its styling and scrolling. Upstream's `inert`
 * handling is dropped with the second panel: it existed only to keep the
 * hidden panel out of the tab order, and there is no hidden panel now.
 */
import React from "react";
import clsx from "clsx";
import { ThemeClassNames } from "@docusaurus/theme-common";

export default function NavbarMobileSidebarLayout({ header, primaryMenu }) {
  return (
    <div
      className={clsx(
        ThemeClassNames.layout.navbar.mobileSidebar.container,
        "navbar-sidebar",
      )}
    >
      {header}
      <div className="navbar-sidebar__items">
        <div
          className={clsx(
            ThemeClassNames.layout.navbar.mobileSidebar.panel,
            "navbar-sidebar__item menu",
          )}
        >
          {primaryMenu}
        </div>
      </div>
    </div>
  );
}
