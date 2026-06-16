import { tokenize, TOKEN_CLASS } from '@/lib/highlight'

/**
 * Styled code block with a filename header bar. Syntax highlighting is done by
 * a tiny in-repo tokenizer (no third-party dependency) rendered as React spans,
 * so it stays SSG-safe and on the JetBrains Mono token from the design system.
 * `sample` = { filename, language, code }
 */
export default function CodeSample({ sample }) {
  const { filename, language, code } = sample
  const tokens = tokenize(code)
  return (
    <figure className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
      <figcaption className="flex items-center justify-between border-b border-border bg-muted/60 px-4 py-2.5">
        <span className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-border" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
          </span>
          <span className="ml-1 font-mono text-xs text-muted-foreground">{filename}</span>
        </span>
        {language && (
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted-foreground/70">
            {language}
          </span>
        )}
      </figcaption>
      <pre className="overflow-x-auto p-4 text-[0.8rem] leading-relaxed sm:p-5">
        <code className="font-mono text-foreground/90">
          {tokens.map((tok, i) =>
            TOKEN_CLASS[tok.t] ? (
              <span key={i} className={TOKEN_CLASS[tok.t]}>
                {tok.v}
              </span>
            ) : (
              tok.v
            ),
          )}
        </code>
      </pre>
    </figure>
  )
}
