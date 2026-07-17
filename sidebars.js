// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  docsSidebar: [
    {
      type: 'category',
      label: 'Introduction',
      collapsed: false,
      items: [
        'introduction/overview',
        'introduction/el-dorado-beta',
        'introduction/architecture',
        'introduction/how-it-works',
        'introduction/privacy-and-threat-model',
      ],
    },
    {
      type: 'category',
      label: 'Get started',
      collapsed: false,
      items: [
        'get-started/requirements',
        'get-started/installation',
        'get-started/funding',
        'get-started/managing-the-client',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      collapsed: false,
      items: [
        'troubleshooting/logs',
        'troubleshooting/common-issues',
      ],
    },
    {
      type: 'category',
      label: 'Reporting issues',
      collapsed: false,
      items: [
        'reporting/reporting-issues',
      ],
    },
    {
      type: 'category',
      label: 'Reference',
      collapsed: false,
      items: [
        'reference/file-locations-macos',
        'reference/file-locations-debian',
      ],
    },
  ],
};

module.exports = sidebars;
