import { cva } from "class-variance-authority"

export const tableVariants = cva("w-full caption-bottom text-sm", {
  variants: {
    variant: {
      default: "",
      ruled: "[&_tbody_td]:px-6 [&_tbody_td]:py-4 [&_th]:px-6 [&_th]:py-3 [&_thead]:bg-table-head",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})
