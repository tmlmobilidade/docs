<%*
/**
 * sort-headings-on-save.md
 *
 * This is a Templater STARTUP TEMPLATE (not a JS user script).
 * Save it as a .md file inside your vault and register it under:
 *   Templater → Settings → Startup Templates
 *
 * Templater runs this on vault load. The <%* ... %> block executes
 * arbitrary JS with access to `tp` (Templater API) and `app` (Obsidian API).
 *
 * Any file with `sort_headings: true` in its frontmatter will have its
 * headings sorted alphabetically (H1–H6, all levels) on every save.
 */

// ── Heading sort logic ──────────────────────────────────────────────────────

function headingLevel(line) {
  const m = line.match(/^(#{1,6}) /);
  return m ? m[1].length : 0;
}

function headingText(line) {
  return line.replace(/^#+\s+/, "").trim();
}

function parseBlocks(lines, parentLevel = 0) {
  const blocks = [];
  let i = 0;

  while (i < lines.length) {
    const level = headingLevel(lines[i]);
    if (level === 0 || level <= parentLevel) break;

    const block = { heading: lines[i], level, body: [], children: [] };
    i++;

    while (i < lines.length && headingLevel(lines[i]) === 0) {
      block.body.push(lines[i]);
      i++;
    }

    const { blocks: children, remaining } = parseBlocks(lines.slice(i), level);
    block.children = children;
    i += lines.length - i - remaining.length;

    blocks.push(block);
  }

  return { blocks, remaining: lines.slice(i) };
}

function sortBlocks(blocks) {
  return blocks
    .map((b) => ({ ...b, children: sortBlocks(b.children) }))
    .sort((a, b) =>
      headingText(a.heading).localeCompare(headingText(b.heading), undefined, {
        sensitivity: "base",
        numeric: true,
      })
    );
}

function renderBlocks(blocks) {
  return blocks.flatMap((b) => [
    b.heading,
    ...b.body,
    ...renderBlocks(b.children),
  ]);
}

function sortMarkdownHeadings(content) {
  const lines = content.split("\n");

  // Preserve YAML frontmatter
  let frontmatterEnd = 0;
  if (lines[0]?.trim() === "---") {
    for (let i = 1; i < lines.length; i++) {
      if (lines[i]?.trim() === "---") {
        frontmatterEnd = i + 1;
        break;
      }
    }
  }

  const bodyLines = lines.slice(frontmatterEnd);

  // Preserve content before the first heading
  let preambleEnd = 0;
  for (let i = 0; i < bodyLines.length; i++) {
    if (headingLevel(bodyLines[i]) > 0) { preambleEnd = i; break; }
    preambleEnd = i + 1;
  }

  const preamble = bodyLines.slice(0, preambleEnd);
  const { blocks, remaining } = parseBlocks(bodyLines.slice(preambleEnd));
  const sortedLines = renderBlocks(sortBlocks(blocks));

  const sorted = [
    ...lines.slice(0, frontmatterEnd),
    ...preamble,
    ...sortedLines,
    ...remaining,
  ].join("\n");

  return { sorted, changed: sorted !== content };
}

// ── Event registration ──────────────────────────────────────────────────────

// Prevent stacking duplicate listeners if the startup template re-runs
const HANDLER_KEY = "__sortHeadingsOnSaveRef__";
if (app[HANDLER_KEY]) {
  app.vault.offref(app[HANDLER_KEY]);
  delete app[HANDLER_KEY];
}

const rewriting = new Set();
const debounceMap = new Map();

async function handleModify(file) {
  // Skip non-markdown files and our own rewrite events
  if (file.extension !== "md") return;
  if (rewriting.has(file.path)) return;

  if (debounceMap.has(file.path)) clearTimeout(debounceMap.get(file.path));
  debounceMap.set(
    file.path,
    setTimeout(async () => {
      debounceMap.delete(file.path);

      // metadataCache may lag behind the save — read frontmatter from raw content
      const tfile = app.vault.getAbstractFileByPath(file.path);
      if (!tfile) return;

      const content = await app.vault.read(tfile);

      // Parse frontmatter manually to avoid cache staleness
      const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
      if (!fmMatch) return;
      if (!/sort_headings:\s*true/m.test(fmMatch[1])) return;

      const { sorted, changed } = sortMarkdownHeadings(content);
      if (!changed) return;

      rewriting.add(file.path);
      try {
        await app.vault.modify(tfile, sorted);
      } finally {
        setTimeout(() => rewriting.delete(file.path), 300);
      }
    }, 300)
  );
}

// Register and store the event ref for cleanup on re-runs
app[HANDLER_KEY] = app.vault.on("modify", handleModify);

new Notice("✓ sort-headings: on-save listener registered");
%>