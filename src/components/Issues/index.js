/**
 * Collapsible issue list (FAQ style) for the troubleshooting pages.
 *
 * <Issues> renders the "Expand all" control and shares its state with the
 * <Issue> items below it. Each <Issue> shows only its title until opened, so
 * the page reads as a scannable list of problems rather than a wall of
 * headings.
 *
 * Deliberately built on the *unstyled* Details from theme-common rather than
 * @theme/Details: the themed one forces Infima's `alert alert--info` classes
 * (blue box, alert-tinted link and code colors), which is far too heavy when
 * every issue on the page is one.
 */

import React, {createContext, useContext, useEffect, useState} from 'react';
import {Details} from '@docusaurus/theme-common/Details';
import {useLocation} from '@docusaurus/router';
import styles from './styles.module.css';

const BulkContext = createContext({allOpen: false, generation: 0});

export function Issues({children}) {
  const [allOpen, setAllOpen] = useState(false);
  // Bumped on every bulk toggle. <Issue> feeds this into its React key so the
  // Details components remount with a fresh initial state — Details keeps its
  // own collapse state internally and ignores later `open` prop changes.
  const [generation, setGeneration] = useState(0);

  return (
    <BulkContext.Provider value={{allOpen, generation}}>
      <div className={styles.toolbar}>
        <button
          type="button"
          className={styles.bulkToggle}
          onClick={() => {
            setAllOpen((open) => !open);
            setGeneration((n) => n + 1);
          }}>
          {allOpen ? 'Collapse all' : 'Expand all'}
        </button>
      </div>
      {children}
    </BulkContext.Provider>
  );
}

export function Issue({id, title, children}) {
  const {hash} = useLocation();
  const {allOpen, generation} = useContext(BulkContext);
  // Whether this issue is the target of the URL hash. Resolved after mount
  // only: the hash never reaches the server, so reading it during render would
  // desync hydration.
  const [linked, setLinked] = useState(false);

  useEffect(() => {
    const isTarget = window.location.hash === `#${id}`;
    setLinked(isTarget);
    if (isTarget) {
      // The browser already made its jump while this issue was still
      // collapsed, so it landed short. Redo it once the body is laid out.
      window.requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({block: 'start'});
      });
    }
  }, [hash, id]);

  const open = linked || allOpen;

  return (
    <Details
      key={`${generation}:${open}`}
      id={id}
      open={open}
      className={styles.issue}
      summary={
        <summary className={styles.summary}>
          <span className={styles.title}>{title}</span>
          <a
            className={styles.permalink}
            href={`#${id}`}
            title="Direct link to this issue"
            aria-label={`Direct link to: ${title}`}
            // Without this the click bubbles to Details, which calls
            // preventDefault() on anything inside the summary and toggles
            // instead of following the link.
            onClick={(e) => e.stopPropagation()}>
            #
          </a>
        </summary>
      }>
      <div className={styles.body}>{children}</div>
    </Details>
  );
}
