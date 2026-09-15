// Ejected from @docusaurus/theme-classic 3.10.1: one panel instead of two, so no "Back to main menu" step and no inert handling for a hidden panel.
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
