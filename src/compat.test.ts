import { describe, expect, test } from "bun:test"
import { readFileSync } from "node:fs"
import { resolve } from "node:path"

// Names that apps import.

const read = (path: string) => readFileSync(resolve(import.meta.dirname, "..", path), "utf8")

const exports: Record<string, string[]> = {
  alert: ["Alert", "AlertTitle", "AlertDescription", "AlertAction"],
  badge: ["Badge", "badgeVariants"],
  brand: ["Logo", "Mark"],
  button: ["Button", "buttonVariants"],
  card: [
    "Card",
    "CardHeader",
    "CardFooter",
    "CardTitle",
    "CardAction",
    "CardDescription",
    "CardContent",
  ],
  chart: [
    "ChartContainer",
    "ChartTooltip",
    "ChartTooltipContent",
    "ChartLegend",
    "ChartLegendContent",
    "ChartStyle",
  ],
  collapsible: [
    "Collapsible",
    "CollapsibleTrigger",
    "CollapsibleContent",
    "collapsibleTriggerVariants",
  ],
  dialog: ["Dialog", "DialogContent", "DialogTitle", "DialogClose"],
  empty: [
    "Empty",
    "EmptyHeader",
    "EmptyTitle",
    "EmptyDescription",
    "EmptyContent",
    "EmptyMedia",
    "emptyVariants",
  ],
  field: ["Field", "FieldControl", "FieldDescription", "FieldError", "FieldLabel"],
  frame: ["AppFrame", "FramePanel", "FrameSidebar", "PanelHeader"],
  illustration: ["Illustration"],
  input: ["Input"],
  label: ["Label"],
  menu: ["Menu", "MenuTrigger", "MenuContent", "MenuItem", "MenuSeparator"],
  meter: ["Meter", "MeterStack", "meterPartTone"],
  "page-header": ["PageHeader"],
  popover: ["Popover", "PopoverTrigger", "PopoverContent", "popoverTriggerVariants"],
  select: ["Select", "selectTriggerVariants"],
  sidebar: [
    "Sidebar",
    "SidebarContent",
    "SidebarFooter",
    "SidebarGroup",
    "SidebarHeader",
    "SidebarItem",
    "SidebarSection",
    "SidebarToggleIcon",
    "sidebarItemVariants",
  ],
  skeleton: ["Skeleton", "skeletonVariants"],
  sonner: ["Toaster"],
  spinner: ["Spinner"],
  stat: ["Stat", "StatGroup"],
  switch: ["Switch"],
  table: [
    "Table",
    "TableHeader",
    "TableBody",
    "TableFooter",
    "TableHead",
    "TableRow",
    "TableCell",
    "TableCaption",
    "tableVariants",
  ],
  tabs: ["Tabs", "TabsList", "TabsTrigger", "TabsContent", "tabsListVariants"],
  textarea: ["Textarea"],
  toggle: ["Toggle", "toggleVariants"],
  "toggle-group": ["ToggleGroup", "ToggleGroupItem"],
  tooltip: ["Tooltip", "TooltipProvider"],
}

const colours = [
  "brand",
  "brand-foreground",
  "brand-soft",
  "brand-strong",
  "lime",
  "ink-deep",
  "moss",
  "amber",
  "persimmon",
  "sky",
  "mosaic-grey-1",
  "mosaic-grey-2",
  "mosaic-grey-3",
  ...["ok", "progress", "warn", "fail", "idle"].flatMap((s) => [s, `${s}-soft`, `${s}-strong`]),
  "chrome",
  "subtle",
  "border-strong",
  "border-popover",
  "rule",
  "plane",
  "surface",
  "canvas",
  "canvas-dot",
  "hover",
  "selected",
  "press",
  "background",
  "foreground",
  "card",
  "card-foreground",
  "popover",
  "popover-foreground",
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "muted",
  "muted-foreground",
  "accent",
  "accent-foreground",
  "destructive",
  "border",
  "input",
  "ring",
  ...[1, 2, 3, 4, 5].map((n) => `chart-${n}`),
  "sidebar",
  "sidebar-foreground",
  "sidebar-primary",
  "sidebar-primary-foreground",
  "sidebar-accent",
  "sidebar-accent-foreground",
  "sidebar-border",
  "sidebar-ring",
]

const utilities = [
  "type-title",
  "type-heading",
  "type-body",
  "type-meta",
  "type-micro",
  "type-nano",
  "type-figure",
  "type-mono",
  "hairline-ring",
  "slide",
  "enter-from-right",
  "bg-dots",
  "bg-hatch",
  "scrollbar-none",
  "brand-logo",
  "brand-mark",
  "sidebar-icon-bar",
]

describe("exported names", () => {
  for (const [name, names] of Object.entries(exports)) {
    test(`components/${name} exports ${names.join(", ")}`, async () => {
      const module = (await import(`./components/${name}.tsx`)) as Record<string, unknown>
      for (const exported of names) expect(module[exported]).toBeDefined()
    })
  }

  test("every colour is a variable and a Tailwind colour", () => {
    const tokens = read("src/tokens.css")
    for (const colour of colours) {
      expect(tokens).toMatch(new RegExp(`\\n\\s*--${colour}:`))
      expect(tokens).toContain(`--color-${colour}: var(--${colour});`)
    }
    for (const name of ["--ease-emphasized", "--shadow-xs", "--shadow-md", "--shadow-xl"])
      expect(tokens).toContain(`${name}:`)
  })

  test("every utility is defined", () => {
    const css = read("src/utilities.css")
    for (const utility of utilities) expect(css).toContain(`@utility ${utility} {`)
  })
})

describe("variants", () => {
  // Server-rendered pages load these modules without React.
  test("import only class-variance-authority and each other", () => {
    for (const file of new Bun.Glob("*.ts").scanSync(resolve(import.meta.dirname, "variants"))) {
      const imports = [...read(`src/variants/${file}`).matchAll(/from "([^"]+)"/g)].map((m) => m[1])
      for (const name of imports) expect(name).toMatch(/^(class-variance-authority|\.\/[a-z-]+)$/)
    }
  })
})
