#!/usr/bin/env node
// eth.limo 404s any query string containing "system" or "passwd"; <Tabs> must not name one.
"use strict";

const fs = require("fs");
const path = require("path");

const DOCS_DIR = path.join(path.resolve(__dirname, ".."), "docs");
const BLOCKED = /system|passwd/;

function findMarkdownFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return findMarkdownFiles(full);
    return /\.mdx?$/.test(entry.name) ? [full] : [];
  });
}

// Mirrors getQueryStringKey() in @docusaurus/theme-common.
function queryParamName(attrs) {
  const explicit = attrs.match(/queryString="([^"]*)"/);
  if (explicit) return explicit[1];

  const isBare = /queryString(?!\s*=)/.test(attrs);
  if (!isBare) return null;

  const groupId = attrs.match(/groupId="([^"]*)"/);
  return groupId ? groupId[1] : null;
}

function findViolations(file) {
  const lines = fs.readFileSync(file, "utf8").split("\n");
  const violations = [];

  lines.forEach((line, index) => {
    const tag = line.match(/<Tabs\b([^>]*)>/);
    if (!tag) return;

    const param = queryParamName(tag[1]);
    if (!param || !BLOCKED.test(param)) return;

    const location = `${path.relative(process.cwd(), file)}:${index + 1}`;
    violations.push(`  ${location}  ->  ?${param}=…`);
  });

  return violations;
}

const violations = findMarkdownFiles(DOCS_DIR).flatMap(findViolations);

if (violations.length === 0) {
  console.log("All <Tabs> query params are servable by the eth.limo gateway.");
  process.exit(0);
}

console.error(
  "These <Tabs> blocks write a query param the eth.limo gateway 404s:\n",
);
console.error(violations.join("\n"));
console.error(
  `\neth.limo rejects any query string matching /${BLOCKED.source}/, so these
URLs die on reload, bookmark and share. Rename the param without changing
groupId (which keys localStorage tab sync):

  <Tabs groupId="operating-systems" queryString="os">
`,
);
process.exit(1);
