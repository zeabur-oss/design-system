// Letter spacing for the large name. It runs in the page: render.ts passes it to tab.$eval.
//
// Geist's own kerning, tracked tight, then a few pairs opened or closed by eye. A pair whose
// long straight edges would meet keeps a little clearance: Geist is not drawn to interlock,
// so a fused stem or a hairline reads as a mistake.

export function kernName(el: HTMLElement): void {
  const tracking = -0.045
  const pairs: Record<string, number> = {
    Ze: -0.005,
    ea: -0.01,
    ab: 0.02,
    at: 0.01,
    te: 0.01,
    Ca: -0.005,
    ta: 0.01,
    al: 0.015,
    lo: -0.005,
    ui: 0.005,
    il: 0.01,
    ld: -0.005,
    nt: 0.01,
    ti: 0.02,
    it: 0.01,
  }
  const style = getComputedStyle(el)
  const size = parseFloat(style.fontSize)
  const ctx = document.createElement("canvas").getContext("2d")!
  ctx.font = `${style.fontWeight} ${size}px ${style.fontFamily}`
  const width = (text: string) => ctx.measureText(text).width
  // Each letter is a span of its own, which drops the font's kerning: add it back.
  const geist = (pair: string) => (width(pair) - width(pair[0]) - width(pair[1])) / size
  const text = el.textContent ?? ""
  el.innerHTML = [...text]
    .map((ch, i) => {
      const pair = text.slice(i, i + 2)
      const k =
        pair.length === 2 && pair.trim().length === 2
          ? geist(pair) + tracking + (pairs[pair] ?? 0)
          : 0
      return `<span style="margin-right: ${k.toFixed(4)}em">${ch}</span>`
    })
    .join("")
}
