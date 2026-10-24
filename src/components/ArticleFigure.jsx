/**
 * Why: the article on /rekhon/docs alternates text with real screenshots from the app. Two shapes
 *      recur — a narrow phone render and a full-width map or diagram — and both need the same
 *      frame, the same caption treatment and the same behaviour in dark mode.
 * What: one figure, framed and captioned.
 * Result: pictures that read as artefacts rather than decoration, and that stay legible when the
 *         page is dark.
 * Changelog: 2026-10-24 - Created.
 *
 * On dark mode: the baselines are the app's LIGHT renders, because the project's dark baselines
 * cover different screen states and chasing matched pairs would have meant showing a worse screen
 * to get one. A light screenshot on a dark page is not a bug if it is obviously a picture of a
 * screen, so the frame keeps its pale surface in both themes and the caption sits outside it.
 *
 * Input:  figure - { src, alt, caption, kind } where kind is 'phone' or 'wide'.
 * Output: a <figure> element, or null when no figure was supplied.
 */
export default function ArticleFigure({ figure }) {
  if (!figure) return null
  const isPhone = figure.kind === 'phone'

  return (
    <figure className="mt-10">
      <div
        className={
          isPhone
            ? 'mx-auto w-full max-w-[340px] overflow-hidden rounded-xl border border-border bg-[#fcfcfd] p-2 shadow-card sm:max-w-[400px]'
            : 'overflow-hidden rounded-lg border border-border bg-[#fcfcfd] p-3 shadow-card sm:p-5'
        }
      >
        <img
          src={figure.src}
          alt={figure.alt}
          loading="lazy"
          decoding="async"
          className={isPhone ? 'w-full rounded-lg' : 'w-full'}
        />
      </div>
      <figcaption className="mx-auto mt-3 max-w-[58ch] text-center text-sm leading-relaxed text-muted-foreground">
        {figure.caption}
      </figcaption>
    </figure>
  )
}
