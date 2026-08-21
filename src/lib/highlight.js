// Tiny, dependency-free syntax tokenizer for the case-study code samples.
// Covers JS/TS and Python well enough for short illustrative snippets.
//
// Design guarantee: every character of the input belongs to exactly one token
// (gaps between regex matches are emitted as `plain`), so the concatenation of
// all token text is byte-for-byte the original code. That makes it impossible
// for highlighting to drop or corrupt the snippet. Worst case, a token simply
// isn't coloured. Rendered as React spans (never innerHTML), so it is XSS- and
// SSR-safe.

const KEYWORDS = new Set([
  // JS / TS
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while',
  'await', 'async', 'import', 'export', 'from', 'new', 'class', 'extends',
  'default', 'try', 'catch', 'finally', 'throw', 'typeof', 'instanceof', 'of',
  'this', 'true', 'false', 'null', 'undefined', 'yield', 'switch', 'case',
  'break', 'continue', 'do', 'in',
  // Python
  'def', 'lambda', 'None', 'True', 'False', 'and', 'or', 'not', 'with', 'as',
  'pass', 'raise', 'elif', 'self', 'async', 'await', 'global', 'nonlocal',
  // Kotlin
  'fun', 'val', 'when', 'object', 'data', 'is', 'internal', 'suspend', 'override',
])

// Order matters: comments and strings are matched before identifiers so that
// keyword-looking words inside them are not re-coloured.
const TOKEN =
  /(?<comment>(?:\/\/|#)[^\n]*|\/\*[\s\S]*?\*\/)|(?<string>`(?:\\[\s\S]|[^`\\])*`|"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*')|(?<number>\b\d[\d_]*(?:\.\d+)?\b)|(?<ident>[A-Za-z_$][\w$]*)/g

export function tokenize(code) {
  const out = []
  let last = 0
  let m
  TOKEN.lastIndex = 0
  while ((m = TOKEN.exec(code))) {
    if (m.index > last) out.push({ t: 'plain', v: code.slice(last, m.index) })
    const g = m.groups
    if (g.comment) out.push({ t: 'comment', v: m[0] })
    else if (g.string) out.push({ t: 'string', v: m[0] })
    else if (g.number) out.push({ t: 'number', v: m[0] })
    else {
      const after = code[m.index + m[0].length]
      if (KEYWORDS.has(m[0])) out.push({ t: 'keyword', v: m[0] })
      else if (after === '(') out.push({ t: 'fn', v: m[0] })
      else out.push({ t: 'plain', v: m[0] })
    }
    last = m.index + m[0].length
  }
  if (last < code.length) out.push({ t: 'plain', v: code.slice(last) })
  return out
}

// Editorial Light palette: blue keywords, teal strings/numbers, muted comments.
export const TOKEN_CLASS = {
  comment: 'italic text-muted-foreground/60',
  string: 'text-brand-accent',
  number: 'text-brand-accent',
  keyword: 'font-medium text-primary',
  fn: 'text-foreground',
  plain: '',
}
