#!/usr/bin/env node
/**
 * generate-llms-full.js
 *
 * Generates static/llms-full.txt by inlining the full text of every
 * documentation page under docs/. The output mirrors the structure the file
 * has always had:
 *
 *   - A fixed header block (title, description blockquote, Status line,
 *     Docs-Updated line, intro paragraph).
 *   - Docs-Updated is refreshed to the current date on every run.
 *   - Pages are grouped into named sections in a fixed order, each page
 *     rendered as:  "### <page H1>", a "Source: <url>" line, then the page
 *     body with headings demoted two levels, admonitions folded into
 *     "> Type:" blockquotes, and relative links / absolute-path images
 *     rewritten to absolute site URLs.
 *   - Units (header + each page) are separated by a "---" rule.
 *
 * Everything that determines the shape of the file lives in CONFIG below, so
 * adding a page or renaming a section is a one-line change.
 *
 * Usage:  node scripts/generate-llms-full.js
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const REPO_ROOT = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(REPO_ROOT, 'docs');
const OUTPUT_FILE = path.join(REPO_ROOT, 'static', 'llms-full.txt');

// Base URL of the published docs site. Used to build Source: lines and to
// rewrite relative doc links and absolute-path assets (e.g. /img/...).
const SITE = 'https://docs.vpn.gnosis.eth.limo';

// Section order + labels. `dir` is a folder under docs/; `label` is the
// heading used in the output ("## <label>"). Pages inside each folder are
// ordered by their `sidebar_position` frontmatter (ties broken by filename).
const SECTIONS = [
  { label: 'Getting Started', dir: 'get-started' },
  { label: 'Concepts', dir: 'introduction' },
  { label: 'Troubleshooting', dir: 'troubleshooting' },
  { label: 'Reporting', dir: 'reporting' },
];

// Header block. {{DATE}} is replaced with the current date (YYYY-MM-DD).
const HEADER = `# Gnosis VPN Documentation — Full Text

> Set up and run Gnosis VPN "El Dorado" (beta) — a decentralized VPN built on
> the HOPR mixnet with accounts funded on Gnosis Chain. This release supports
> macOS and Linux (Debian) only; Windows, iOS, Android, and other Linux
> distributions are not supported. Design and commands may change during beta.

Status: Beta ("El Dorado")
Docs-Updated: {{DATE}}

This file inlines the complete text of every Gnosis VPN documentation page so an agent can ingest the entire doc set in a single fetch. For the structured index with per-page links, see llms.txt: ${SITE}/llms.txt (mirror: https://raw.githubusercontent.com/gnosis/gnosis_vpn-docs/refs/heads/main/static/llms.txt).`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function today() {
  const d = new Date();
  const p = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

// Split YAML frontmatter (--- ... ---) from the markdown body.
function splitFrontmatter(raw) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!m) return { frontmatter: {}, body: raw };
  const frontmatter = {};
  for (const line of m[1].split('\n')) {
    const mm = line.match(/^\s*([A-Za-z0-9_-]+)\s*:\s*(.*)\s*$/);
    if (mm) {
      let val = mm[2].trim();
      if (
        (val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'"))
      ) {
        val = val.slice(1, -1);
      }
      frontmatter[mm[1]] = val;
    }
  }
  return { frontmatter, body: raw.slice(m[0].length) };
}

// Rewrite inline images and links on a single (non-code) line.
//   ![alt](/img/x.png)      -> ![alt](SITE/img/x.png)
//   [text](funding.md)      -> [text](SITE/docs/<dir>/funding/)
//   [text](./logs.md#a)     -> [text](SITE/docs/<dir>/logs/#a)
//   [text](https://...)     -> unchanged
// `currentDir` is the page's folder relative to docs/ (e.g. "get-started").
function rewriteInline(line, currentDir) {
  const rewriteTarget = (target) => {
    // External or protocol-relative or in-page anchor: leave as-is.
    if (/^(https?:)?\/\//i.test(target) || /^(mailto:|tel:)/i.test(target)) {
      return target;
    }
    if (target.startsWith('#')) return target;

    // Absolute-path asset/link (e.g. /img/foo.png, /docs/...): prefix SITE.
    if (target.startsWith('/')) return SITE + target;

    // Relative link to another doc page (.md, optional #anchor).
    const mdMatch = target.match(/^([^#]*\.md)(#.*)?$/i);
    if (mdMatch) {
      const anchor = mdMatch[2] || '';
      // Resolve relative to the current page's directory, within docs/.
      const resolved = path
        .posix
        .normalize(path.posix.join(currentDir, mdMatch[1]))
        .replace(/\.md$/i, '');
      return `${SITE}/docs/${resolved}/${anchor}`;
    }

    // Anything else: leave untouched.
    return target;
  };

  // Images first (leading !), then plain links. The (!?) capture keeps them
  // distinguishable so we don't double-process.
  return line.replace(/(!?)\[([^\]]*)\]\(([^)\s]+)\)/g, (full, bang, text, target) => {
    return `${bang}[${text}](${rewriteTarget(target)})`;
  });
}

// Convert a page's markdown body into the inlined form.
function transformBody(body, currentDir) {
  // Scrub zero-width / BOM characters that sometimes sneak into source
  // markdown (e.g. before a code fence) so they don't leak into the output.
  body = body.replace(/[​‌‍﻿]/g, '');
  const lines = body.split('\n');

  // Drop the leading H1 (it becomes the "###" section title) and any blank
  // lines before it.
  let start = 0;
  while (start < lines.length && lines[start].trim() === '') start++;
  if (start < lines.length && /^#\s+/.test(lines[start])) {
    start++;
  }
  const rest = lines.slice(start);

  const out = [];
  let inFence = false;
  let fenceMarker = '';

  for (let i = 0; i < rest.length; i++) {
    const line = rest[i];

    // Track fenced code blocks (``` or ~~~). Content inside is passed through
    // verbatim so shell comments like "# Linux" aren't treated as headings.
    const fenceOpen = line.match(/^(\s*)(```+|~~~+)/);
    if (fenceOpen) {
      const marker = fenceOpen[2][0];
      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
      } else if (marker === fenceMarker) {
        inFence = false;
        fenceMarker = '';
      }
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    // Admonition block:  :::type [Title]  ...  :::
    const admOpen = line.match(/^:::(\w+)(?:\[(.*?)\])?\s*(.*)$/);
    if (admOpen) {
      const type = admOpen[1];
      const customTitle = admOpen[2];
      const inlineRest = admOpen[3] ? admOpen[3].trim() : '';
      const contentLines = [];
      if (inlineRest) contentLines.push(inlineRest);
      i++;
      for (; i < rest.length; i++) {
        if (/^:::\s*$/.test(rest[i])) break;
        contentLines.push(rest[i]);
      }
      const title =
        customTitle && customTitle.length
          ? customTitle
          : type.charAt(0).toUpperCase() + type.slice(1);
      const content = contentLines
        .map((l) => rewriteInline(l, currentDir).trim())
        .filter((l) => l.length)
        .join(' ');
      out.push(`> ${title}: ${content}`);
      continue;
    }

    // Headings: demote by two levels (H1->H3, H2->H4, ...), capped at H6.
    const heading = line.match(/^(#{1,6})(\s+.*)$/);
    if (heading) {
      const level = Math.min(heading[1].length + 2, 6);
      out.push('#'.repeat(level) + rewriteInline(heading[2], currentDir));
      continue;
    }

    // Normal line: rewrite inline links/images.
    out.push(rewriteInline(line, currentDir));
  }

  // Trim leading/trailing blank lines.
  while (out.length && out[0].trim() === '') out.shift();
  while (out.length && out[out.length - 1].trim() === '') out.pop();

  return out.join('\n');
}

// Read + order the pages of one section directory.
function readSectionPages(dir) {
  const abs = path.join(DOCS_DIR, dir);
  const files = fs
    .readdirSync(abs)
    .filter((f) => f.endsWith('.md'))
    .sort();

  const pages = files.map((file) => {
    const raw = fs.readFileSync(path.join(abs, file), 'utf8');
    const { frontmatter, body } = splitFrontmatter(raw);
    const slug = file.replace(/\.md$/i, '');

    // The "###" title is the page's first H1; fall back to frontmatter title.
    const h1 = body.match(/^\s*#\s+(.*)$/m);
    const title = h1 ? h1[1].trim() : (frontmatter.title || slug);

    const position = frontmatter.sidebar_position
      ? Number(frontmatter.sidebar_position)
      : Number.MAX_SAFE_INTEGER;

    return {
      slug,
      title,
      position,
      source: `${SITE}/docs/${dir}/${slug}/`,
      content: transformBody(body, dir),
    };
  });

  pages.sort((a, b) => a.position - b.position || a.slug.localeCompare(b.slug));
  return pages;
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

function build() {
  const units = [HEADER.replace('{{DATE}}', today())];

  for (const section of SECTIONS) {
    const pages = readSectionPages(section.dir);
    pages.forEach((page, idx) => {
      const parts = [];
      if (idx === 0) parts.push(`## ${section.label}\n`);
      parts.push(`### ${page.title}\n`);
      parts.push(`Source: ${page.source}\n`);
      parts.push(page.content);
      units.push(parts.join('\n'));
    });
  }

  return units.join('\n\n---\n\n') + '\n';
}

function main() {
  const output = build();
  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, output, 'utf8');
  console.log(
    `Wrote ${path.relative(REPO_ROOT, OUTPUT_FILE)} (${output.length} bytes, Docs-Updated: ${today()})`
  );
}

main();
