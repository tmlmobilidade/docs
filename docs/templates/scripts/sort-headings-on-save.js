// sort-headings.js
// Templater user script — place this in your configured "User Scripts" folder.
// Do NOT put template syntax in this file. It is imported as a plain JS module.

function headingLevel(line) {
  const m = line.match(/^(#{1,6}) /);
  return m ? m[1].length : 0;
}

function headingText(line) {
  return line.replace(/^#+\s+/, "").trim();
}

function parseBlocks(lines, parentLevel) {
  if (parentLevel === undefined) parentLevel = 0;
  var blocks = [];
  var i = 0;

  while (i < lines.length) {
    var level = headingLevel(lines[i]);
    if (level === 0 || level <= parentLevel) break;

    var block = { heading: lines[i], level: level, body: [], children: [] };
    i++;

    while (i < lines.length && headingLevel(lines[i]) === 0) {
      block.body.push(lines[i]);
      i++;
    }

    var result = parseBlocks(lines.slice(i), level);
    block.children = result.blocks;
    i += lines.length - i - result.remaining.length;

    blocks.push(block);
  }

  return { blocks: blocks, remaining: lines.slice(i) };
}

function sortBlocks(blocks) {
  var sorted = blocks.map(function(b) {
    return Object.assign({}, b, { children: sortBlocks(b.children) });
  });
  sorted.sort(function(a, b) {
    return headingText(a.heading).localeCompare(headingText(b.heading), undefined, {
      sensitivity: "base",
      numeric: true,
    });
  });
  return sorted;
}

function renderBlocks(blocks) {
  var lines = [];
  for (var i = 0; i < blocks.length; i++) {
    var b = blocks[i];
    lines.push(b.heading);
    for (var j = 0; j < b.body.length; j++) lines.push(b.body[j]);
    var childLines = renderBlocks(b.children);
    for (var k = 0; k < childLines.length; k++) lines.push(childLines[k]);
  }
  return lines;
}

function sortMarkdownHeadings(content) {
  var lines = content.split("\n");

  // Detect YAML frontmatter
  var frontmatterEnd = 0;
  if (lines[0] && lines[0].trim() === "---") {
    for (var i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "---") {
        frontmatterEnd = i + 1;
        break;
      }
    }
  }

  var bodyLines = lines.slice(frontmatterEnd);

  // Collect preamble before first heading
  var preambleEnd = 0;
  for (var i = 0; i < bodyLines.length; i++) {
    if (headingLevel(bodyLines[i]) > 0) { preambleEnd = i; break; }
    preambleEnd = i + 1;
  }

  var preamble = bodyLines.slice(0, preambleEnd);
  var parsed = parseBlocks(bodyLines.slice(preambleEnd));
  var sortedLines = renderBlocks(sortBlocks(parsed.blocks));

  var resultLines = lines.slice(0, frontmatterEnd)
    .concat(preamble)
    .concat(sortedLines)
    .concat(parsed.remaining);

  var sorted = resultLines.join("\n");
  return { sorted: sorted, changed: sorted !== content };
}

function hasSortFlag(content) {
  // Check frontmatter for sort_headings: true without relying on metadataCache
  var fmEnd = content.indexOf("\n---", 4);
  if (content.indexOf("---") !== 0 || fmEnd === -1) return false;
  var fm = content.slice(0, fmEnd);
  return /^sort_headings:\s*true\s*$/m.test(fm);
}

// Exported function called by the startup template
function register(app) {
  var HANDLER_KEY = "__sortHeadingsOnSaveRef__";

  // Clean up any previously registered listener (e.g. on template re-run)
  if (app[HANDLER_KEY]) {
    app.vault.offref(app[HANDLER_KEY]);
    delete app[HANDLER_KEY];
  }

  var rewriting = {};
  var debounceMap = {};

  function handleModify(file) {
    if (file.extension !== "md") return;
    if (rewriting[file.path]) return;

    if (debounceMap[file.path]) clearTimeout(debounceMap[file.path]);

    debounceMap[file.path] = setTimeout(function() {
      delete debounceMap[file.path];

      var tfile = app.vault.getAbstractFileByPath(file.path);
      if (!tfile) return;

      app.vault.read(tfile).then(function(content) {
        if (!hasSortFlag(content)) return;

        var result = sortMarkdownHeadings(content);
        if (!result.changed) return;

        rewriting[file.path] = true;
        app.vault.modify(tfile, result.sorted).then(function() {
          setTimeout(function() { delete rewriting[file.path]; }, 300);
        });
      });
    }, 300);
  }

  app[HANDLER_KEY] = app.vault.on("modify", handleModify);
  new Notice("sort-headings: listener registered");
}

module.exports = register;