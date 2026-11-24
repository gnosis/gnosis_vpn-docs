// @ts-check
const { createRequire } = require("module");
const { themes } = require("prism-react-renderer");

// Publishes the docs sidebar as global data so the burger menu can show the docs tree on
// pages that have no sidebar of their own, such as the front page.
function docsTreeGlobalData() {
  return {
    name: "gvpn-docs-tree",
    async allContentLoaded({ allContent, actions }) {
      // The docs plugin is a dependency of the preset, not of this site, so load its helper from there.
      const { toSidebarsProp } = createRequire(
        require.resolve("@docusaurus/preset-classic"),
      )("@docusaurus/plugin-content-docs/lib/props.js");
      const docs = /** @type {any} */ (
        allContent["docusaurus-plugin-content-docs"].default
      );
      actions.setGlobalData({
        sidebar: toSidebarsProp(docs.loadedVersions[0]).docsSidebar,
      });
    },
  };
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Gnosis VPN",
  tagline: "Privacy-focused VPN built on the HOPR mixnet",
  favicon: "img/favicon.ico",

  // Set these to your real deployment URL when you have one.
  url: "https://docs.vpn.gnosis.eth.limo",
  baseUrl: "/",

  // IMPORTANT for IPFS gateway routing.
  trailingSlash: true,

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  onBrokenLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // Load the Tabler icon webfont (used by the category cards).
  stylesheets: [
    "https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@3.0.0/dist/tabler-icons.min.css",
  ],
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "llms",
        href: "https://raw.githubusercontent.com/gnosis/gnosis_vpn-docs/refs/heads/main/static/llms.txt",
        type: "text/markdown",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "google-site-verification",
        content: "ZCsofUSc0BNyfcE2zikbCS7MqgyZ88s6062MXHzfrNs",
      },
    },
  ],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          routeBasePath: "docs",
          editUrl: undefined,
        },
        blog: false,
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],
  plugins: [docsTreeGlobalData],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode: {
        // Logo is white/pale-yellow, built for the dark navbar.
        // Keep light as default; navbar stays dark in both modes via CSS.
        defaultMode: "light",
        respectPrefersColorScheme: true,
      },
      // Algolia DocSearch. The search-only API key is public by design (it ships to every
      // browser), so it lives here rather than in a CI secret.
      algolia: {
        appId: "P6P7ITP8LN",
        apiKey: "402da7223865ab5d503583ae144f8c18",
        indexName: "Main",
      },
      navbar: {
        // Title empty: the logo SVG already contains the wordmark.
        title: "",
        logo: {
          alt: "Gnosis VPN",
          src: "img/gnosis_vpn.svg",
          href: "/",
        },
        items: [
          {
            href: "https://raw.githubusercontent.com/gnosis/gnosis_vpn-docs/refs/heads/main/static/llms.txt",
            label: "For AI assistants: llms.txt",
            position: "right",
          },
          {
            href: "https://github.com/gnosis/gnosis_vpn",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              { label: "Introduction", to: "/docs/introduction/overview" },
              { label: "Get started", to: "/docs/get-started/requirements" },
              { label: "Troubleshooting", to: "/docs/troubleshooting/logs" },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Telegram",
                href: "https://t.me/gnosisvpn_community",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Download",
                href: "https://download.vpn.gnosis.eth.limo",
              },
            ],
          },
        ],
        copyright: `Gnosis VPN`,
      },
      prism: {
        theme: themes.github,
        darkTheme: themes.dracula,
      },
    }),
};

module.exports = config;
