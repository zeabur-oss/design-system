import { cva } from "class-variance-authority"

export const sidebarItemVariants = cva(
  "group/item box-border flex h-8 w-full min-w-0 shrink-0 items-center gap-x-2 rounded-lg border border-transparent px-2 text-left type-body font-medium text-secondary transition-colors duration-150 select-none hover:text-main data-ancestor:text-main data-current:rounded-md data-current:text-nav-current data-popup-open:text-main [&_svg]:shrink-0",
  {
    variants: {
      tone: {
        default: "data-current:nav-active",
        // `relative` paints the row over the tree rail, so the current pill hides the rail around
        // the bar.
        child:
          "relative grid grid-cols-tree pr-2 pl-tree-indent data-current:nav-active-sub [&_[data-slot=sidebar-item-icon]]:size-3 [&_[data-slot=sidebar-item-icon]_svg]:size-3",
        quiet: "text-tertiary hover:text-secondary data-current:nav-active",
      },
    },
    defaultVariants: {
      tone: "default",
    },
  },
)
