// @ts-check
const {themes} = require('prism-react-renderer');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Gnosis VPN',
  tagline: 'Privacy-focused VPN built on the HOPR mixnet',
  favicon: 'img/favicon.ico',

  // Set these to your real deployment URL when you have one.
  url: 'https://andste.eth.limo',
  baseUrl: '/',

  // IMPORTANT for IPFS gateway routing.
  trailingSlash: true,

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  onBrokenLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Load the Tabler icon webfont (used by the category cards).
  stylesheets: [
    'https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.0.0/dist/tabler-icons.min.css',
  ],
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'llms',
        href: '/llms.txt',
        type: 'text/markdown',
      },
    },
  ],
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: 'docs',
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        // Logo is white/pale-yellow, built for the dark navbar.
        // Keep light as default; navbar stays dark in both modes via CSS.
        defaultMode: 'light',
        respectPrefersColorScheme: true,
      },
      navbar: {
        // Title empty: the logo SVG already contains the wordmark.
        title: '',
        logo: {
          alt: 'Gnosis VPN',
          src: 'img/gnosis_vpn.svg',
          href: '/',
        },
        items: [
          {to: '/', label: 'Categories', position: 'right'},
          {
            href: 'https://github.com/gnosis/gnosis_vpn',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {label: 'Introduction', to: '/docs/introduction/overview'},
              {label: 'Get started', to: '/docs/get-started/requirements'},
              {label: 'Troubleshooting', to: '/docs/troubleshooting/logs'},
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/gnosis/gnosis_vpn/discussions',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {label: 'Onboarding tool', href: 'https://self-onboarding.gnosisvpn.com'},
              {label: 'Downloads', href: 'https://downloads.vpn.gnosis.eth.limo'},
            ],
          },
        ],
        copyright: `Gnosis VPN — El Dorado.`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
      },
    }),
};

module.exports = config;
