// @shadcn/lint's no-raw-colors accepts the palettes because the theme declares them (apps still use
// them); this rule rejects them in components and stories.

const PALETTE =
  /^-?[a-z][a-z0-9]*(?:-[a-z0-9]+)*-z(?:Gray|Violet|Orangered)-(?:\d+|accent)(?:\/[\d.]+)?$/
const BLACK_WHITE =
  /^-?(?:bg|text|border(?:-[xytrblse])?|fill|stroke|from|via|to|ring|ring-offset|outline|divide|decoration|caret|accent|shadow|inset-shadow|inset-ring|placeholder)-(?:white|black)(?:\/[\d.]+)?$/

function split(token) {
  let depth = 0
  let start = 0
  for (let i = 0; i < token.length; i++) {
    const c = token[i]
    if (c === "[" || c === "(") depth++
    else if (c === "]" || c === ")") depth--
    else if (c === ":" && depth === 0) start = i + 1
  }
  return {
    variants: token.slice(0, start).split(":"),
    utility: token.slice(start).replace(/^!|!$/g, ""),
  }
}

function utilityOf(token) {
  return split(token).utility
}

const MOVING =
  /^(?:transition(?:-(?:all|transform|translate|scale|rotate|width|height|caret|popup|sheet|listbox))?|animate-(?:spin|bounce|ping))$/

function unguardedMotionClasses(text) {
  return text.split(/\s+/).filter((token) => {
    if (!token) return false
    const { variants, utility } = split(token)
    return (
      MOVING.test(utility) &&
      !variants.includes("motion-safe") &&
      !variants.includes("motion-reduce")
    )
  })
}

function paletteClasses(text) {
  return text
    .split(/\s+/)
    .filter(
      (token) => token && (PALETTE.test(utilityOf(token)) || BLACK_WHITE.test(utilityOf(token))),
    )
}

const noPaletteClasses = {
  meta: {
    type: "problem",
    docs: {
      description: "Use a semantic colour token, not a palette colour, in components and stories.",
    },
  },
  create(context) {
    const check = (node, text) => {
      for (const token of paletteClasses(text))
        context.report({
          node,
          message: `"${token}" names a palette colour. Use the semantic token for what it is (surface-raised, track, rail, primary, danger, on-primary …; docs/tokens-and-rules.md), or add one in src/tokens.css.`,
        })
    }
    return {
      Literal(node) {
        if (typeof node.value === "string") check(node, node.value)
      },
      TemplateElement(node) {
        check(node, node.value.cooked ?? node.value.raw)
      },
    }
  },
}

const noUnguardedMotion = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Guard transitions that move or resize with motion-safe:, or use a motion utility.",
    },
  },
  create(context) {
    const check = (node, text) => {
      for (const token of unguardedMotionClasses(text))
        context.report({
          node,
          message: `"${token}" moves things for people who asked for reduced motion. Prefix it with motion-safe:, or use a motion utility (popup-motion, collapse-motion, swap-in …; the design system's docs/tokens-and-rules.md, "Motion").`,
        })
    }
    return {
      Literal(node) {
        if (typeof node.value === "string") check(node, node.value)
      },
      TemplateElement(node) {
        check(node, node.value.cooked ?? node.value.raw)
      },
    }
  },
}

export default {
  meta: { name: "zeabur" },
  rules: { "no-palette-classes": noPaletteClasses, "no-unguarded-motion": noUnguardedMotion },
}

export { paletteClasses, unguardedMotionClasses }
