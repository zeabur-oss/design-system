import { cva } from "class-variance-authority"

export const tabsListVariants = cva(
  "group/tabs-list relative inline-flex w-fit items-center gap-0.5 overflow-x-auto overflow-y-hidden rounded-md border border-segmented-border bg-segmented-track p-0.5 text-secondary scrollbar-none group-data-horizontal/tabs:h-control-md group-data-horizontal/tabs:scroll-fade-x tabs-vertical:h-fit tabs-vertical:flex-col tabs-vertical:items-stretch tabs-vertical:gap-1 tabs-vertical:overflow-visible tabs-vertical:rounded-none tabs-vertical:border-0 tabs-vertical:bg-transparent tabs-vertical:p-0",
)
