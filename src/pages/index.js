import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

/**
 * Front page: support-center style hero + category cards.
 * Icons use the Tabler icon webfont (loaded in docusaurus.config.js).
 */

const CATEGORIES = [
  {
    icon: 'ti-book-2',
    title: 'Introduction',
    desc: 'What Gnosis VPN is, the Atlantis MVP, architecture and how it works.',
    to: '/docs/introduction/overview',
  },
  {
    icon: 'ti-download',
    title: 'Get started',
    desc: 'System requirements, installation, and funding your account.',
    to: '/docs/get-started/requirements',
  },
  {
    icon: 'ti-tool',
    title: 'Troubleshooting',
    desc: 'Log locations and fixes for common connection issues.',
    to: '/docs/troubleshooting/logs',
  },
  {
    icon: 'ti-message-report',
    title: 'Reporting issues',
    desc: 'Where to report, what logs to include, and how to write a good report.',
    to: '/docs/reporting/reporting-issues',
  },
];

export default function Home() {
  return (
    <Layout
      title="Documentation"
      description="Set up and run Gnosis VPN Atlantis."
    >
      <main>
        <div className="gvpnHero">
          <h1>Gnosis VPN documentation</h1>
          <p>Everything you need to set up and run Atlantis.</p>
        </div>

        <div className="gvpnCards">
          {CATEGORIES.map((c) => (
            <Link key={c.title} className="gvpnCard" to={c.to}>
              <span className="gvpnCardIcon">
                <i className={`ti ${c.icon}`} aria-hidden="true" />
              </span>
              <span className="gvpnCardBody">
                <span className="gvpnCardTitle">{c.title}</span>
                <span className="gvpnCardDesc">{c.desc}</span>
              </span>
              <i className="ti ti-chevron-right gvpnCardArrow" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </main>
    </Layout>
  );
}
