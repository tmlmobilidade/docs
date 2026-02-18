<%*
var HEADING_RE = new RegExp("^(#{1,6}) ");
var FM_FLAG_RE = new RegExp("^sort_headings:\\s*true\\s*$", "m");
var HEADING_STRIP_RE = new RegExp("^#+\\s+");

function headingLevel(line) {
  var m = HEADING_RE.exec(line);
  return m ? m[1].length : 0;
}

function headingText(line) {
  return line.replace(HEADING_STRIP_RE, "").trim();
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
    var sub = parseBlocks(lines.slice(i), level);
    block.children = sub.blocks;
    i += lines.length - i - sub.remaining.length;
    blocks.push(block);
  }
  return { blocks: blocks, remaining: lines.slice(i) };
}

function sortBlocks(blocks) {
  var copy = blocks.map(function(b) {
    return { heading: b.heading, level: b.level, body: b.body.slice(), children: sortBlocks(b.children) };
  });
  copy.sort(function(a, b) {
    return headingText(a.heading).localeCompare(headingText(b.heading), undefined, { sensitivity: "base", numeric: true });
  });
  return copy;
}

function renderBlocks(blocks) {
  var out = [];
  for (var i = 0; i < blocks.length; i++) {
    var b = blocks[i];
    out.push(b.heading);
    for (var j = 0; j < b.body.length; j++) out.push(b.body[j]);
    var ch = renderBlocks(b.children);
    for (var k = 0; k < ch.length; k++) out.push(ch[k]);
  }
  return out;
}

function sortMarkdownHeadings(content) {
  var lines = content.split("\n");
  var frontmatterEnd = 0;
  if (lines[0] && lines[0].trim() === "---") {
    for (var i = 1; i < lines.length; i++) {
      if (lines[i].trim() === "---") { frontmatterEnd = i + 1; break; }
    }
  }
  var bodyLines = lines.slice(frontmatterEnd);
  var preambleEnd = 0;
  for (var i = 0; i < bodyLines.length; i++) {
    if (headingLevel(bodyLines[i]) > 0) { preambleEnd = i; break; }
    preambleEnd = i + 1;
  }
  var preamble = bodyLines.slice(0, preambleEnd);
  var parsed = parseBlocks(bodyLines.slice(preambleEnd));
  var sortedLines = renderBlocks(sortBlocks(parsed.blocks));
  var result = lines.slice(0, frontmatterEnd).concat(preamble).concat(sortedLines).concat(parsed.remaining);
  var sorted = result.join("\n");
  return { sorted: sorted, changed: sorted !== content };
}

function hasSortFlag(content) {
  var fmEnd = content.indexOf("\n---", 4);
  if (content.indexOf("---") !== 0 || fmEnd === -1) return false;
  var fm = content.slice(0, fmEnd);
  return FM_FLAG_RE.test(fm);
}

var HANDLER_KEY = "__sortHeadingsRef__";
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
      var res = sortMarkdownHeadings(content);
      if (!res.changed) return;
      rewriting[file.path] = true;
      app.vault.modify(tfile, res.sorted).then(function() {
        setTimeout(function() { delete rewriting[file.path]; }, 300);
      });
    });
  }, 300);
}

app[HANDLER_KEY] = app.vault.on("modify", handleModify);
new Notice("sort-headings: registered");
%>