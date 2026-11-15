// Publishes the resolved docs sidebar as global data so the mobile burger panel can render the tree on every route, not only under /docs.
// Docusaurus only ships the tree with the docs routes; this reuses the docs plugin's own converter (internal API — recheck on upgrades; the build fails loudly if the shape changes).
const SIDEBAR_ID = "docsSidebar";

module.exports = function docsSidebarGlobalData() {
  return {
    name: "gvpn-docs-sidebar",
    allContentLoaded({ allContent, actions }) {
      // Not a direct dependency, so resolve it the way the preset does.
      const { toSidebarsProp } = require(
        require.resolve("@docusaurus/plugin-content-docs/lib/props.js", {
          paths: [require.resolve("@docusaurus/preset-classic")],
        }),
      );
      const version =
        allContent["docusaurus-plugin-content-docs"]?.default
          ?.loadedVersions?.[0];
      const sidebar = version && toSidebarsProp(version)[SIDEBAR_ID];
      if (!sidebar) {
        throw new Error(
          `gvpn-docs-sidebar: could not resolve the "${SIDEBAR_ID}" sidebar from the docs plugin content.`,
        );
      }
      actions.setGlobalData({ sidebar });
    },
  };
};
