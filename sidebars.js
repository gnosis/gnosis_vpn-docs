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
        'introduction/atlantis-mvp',
        'introduction/architecture',
        'introduction/how-it-works',
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
  ],
};

module.exports = sidebars;
