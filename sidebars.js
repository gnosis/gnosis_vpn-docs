// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: "category",
      label: "Introduction",
      collapsed: false,
      items: [
        "introduction/overview",
        "introduction/shangri-la-v1",
        "introduction/architecture",
        "introduction/how-it-works",
      ],
    },
    {
      type: "category",
      label: "Get started",
      collapsed: false,
      items: [
        "get-started/requirements",
        "get-started/installation",
        "get-started/funding",
        "get-started/managing-the-client",
      ],
    },
    {
      type: "category",
      label: "Advanced",
      collapsed: false,
      items: ["advanced/custom-blokli"],
    },
    {
      type: "category",
      label: "FAQ & troubleshooting",
      collapsed: false,
      items: [
        "troubleshooting/common-issues",
        "troubleshooting/faq",
        "troubleshooting/logs",
      ],
    },
    {
      type: "category",
      label: "Reporting issues",
      collapsed: false,
      items: ["reporting/reporting-issues"],
    },
    {
      type: "category",
      label: "Reference",
      collapsed: false,
      items: [
        "reference/file-locations-macos",
        "reference/file-locations-debian",
      ],
    },
  ],
};

module.exports = sidebars;
