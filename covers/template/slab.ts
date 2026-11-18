// Parts for the violet slab of a cover: covers/README.md, "Slab".

const esc = (text: string) =>
  text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;")

/** A string of the product, quoted from `sources`. `template` is the string as the source has it. */
export const quote = (text: string, template = text) =>
  `<span data-quote="${esc(template)}">${text}</span>`

/**
 * A control of the product's own UI. Its label must contain a `quote`; render.ts checks.
 * `icon` names a Phosphor icon that tells the reader what the control is, such as a provider's logo.
 */
export const control = (kind: "primary" | "outline" | "field", label: string, icon = "") =>
  `<span class="ui ${kind}">${icon ? `<phosphor-icon name="${icon}"></phosphor-icon>` : ""}${label}</span>`

/** A thing that is not a control, such as a server or a file. */
export const thing = (label: string, mono = false) =>
  `<span class="thing${mono ? " mono" : ""}">${label}</span>`

/** A status with the product's green dot, as its status lists show it. */
export const status = (label: string) =>
  `<span class="status"><svg viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="8"/></svg>${label}</span>`

export const arrow = (direction: "right" | "down", note = "") =>
  `<span class="arrow">${direction === "right" ? "→" : "↓"}${note ? `<span class="note">${note}</span>` : ""}</span>`

/** A logo from vendor/simple-icons, in its owner's colour. `tm` adds the ™ its owner asks for. */
export const logo = (slug: string, tm = false) =>
  `<span class="logo"><simple-icon name="${slug}"></simple-icon>${tm ? `<span class="tm">™</span>` : ""}</span>`

/** A product's name as plain text, where its owner does not allow the logo. */
export const word = (name: string) => `<span class="logo word">${name}</span>`

export const row = (...parts: string[]) => `<div class="row">${parts.join("")}</div>`
export const column = (...parts: string[]) => `<div class="column">${parts.join("")}</div>`
export const grid = (columns: number, ...parts: string[]) =>
  `<div class="grid" style="--columns: ${columns}">${parts.join("")}</div>`

/** Each token of tokens.css as the light and the dark theme resolve it. */
export const swatches = (heads: [string, string], tokens: string[]) =>
  `<div class="swatches"><span></span><span>${heads[0]}</span><span>${heads[1]}</span>${tokens
    .map(
      (token) =>
        `${quote(token, `${token}:`)}${["light", "dark"]
          .map(
            (scheme) =>
              `<span class="swatch" style="color-scheme: ${scheme}; background: var(${token})"></span>`,
          )
          .join("")}`,
    )
    .join("")}</div>`
