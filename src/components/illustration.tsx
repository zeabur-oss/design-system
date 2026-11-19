import { cn } from "cn"

type IllustrationKind =
  | "empty"
  | "no-results"
  | "not-found"
  | "error"
  | "forbidden"
  | "loading"
  | "done"

/** Each state's picture, row by row: `#` a lit dot, `.` an unlit one. */
const pictures: Record<IllustrationKind, readonly string[]> = {
  empty: ["#.#.#.#", ".......", "#.....#", ".......", "#.....#", ".......", "#.#.#.#"],
  "no-results": [".###...", "#...#..", "#...#..", "#...#..", ".###...", "....##.", ".....##"],
  "not-found": ["..###..", ".#...#.", ".....#.", "...##..", "...#...", ".......", "...#..."],
  error: ["...#...", "...#...", "...#...", "...#...", "...#...", ".......", "...#..."],
  forbidden: ["..###..", ".#...#.", ".#...#.", "#######", "###.###", "###.###", "#######"],
  loading: ["#######", "#######", "#######", "#######", "#######", "#######", "#######"],
  done: [".......", "......#", ".....#.", "#...#..", ".#.#...", "..#....", "......."],
}

const tones: Record<IllustrationKind, string> = {
  empty: "text-tertiary",
  "no-results": "text-brand",
  "not-found": "text-brand",
  error: "text-danger",
  forbidden: "text-secondary",
  loading: "text-brand",
  done: "text-ok",
}

/** `seed` is accepted and ignored, for apps that already pass it. */
function Illustration({
  kind,
  className,
}: {
  kind: IllustrationKind
  seed?: string
  className?: string
}) {
  const rows = pictures[kind]
  return (
    <div
      data-slot="illustration"
      data-kind={kind}
      aria-hidden="true"
      className={cn(
        "aspect-square w-20 rounded-xl border border-v2-border bg-card p-illustration-inset shadow-xs",
        tones[kind],
        className,
      )}
    >
      <svg viewBox="0 0 13 13" className="block size-full" fill="currentColor">
        {rows.map((row, y) =>
          [...row].map((cell, x) => (
            <circle
              key={`${x},${y}`}
              cx={x * 2 + 0.5}
              cy={y * 2 + 0.5}
              r="0.5"
              className={kind === "loading" ? "dot-wave" : cell === "#" ? undefined : "fill-track"}
              style={
                kind === "loading"
                  ? ({ "--dot-delay": `${x * 120}ms` } as React.CSSProperties)
                  : undefined
              }
            />
          )),
        )}
      </svg>
    </div>
  )
}

export { Illustration, type IllustrationKind }
