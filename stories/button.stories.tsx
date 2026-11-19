import type { Meta, StoryObj } from "@storybook/react-vite"
import PlusIcon from "~icons/ph/plus"
import TrashIcon from "~icons/ph/trash"

import { Button } from "../src/components/button"
import { buttonVariantStyles } from "../src/variants/button"

const variants = Object.keys(buttonVariantStyles) as (keyof typeof buttonVariantStyles)[]
const sizes = ["xs", "sm", "default", "lg"] as const

const meta = {
  title: "Components/Button",
  component: Button,
  args: { children: "Deploy" },
  argTypes: {
    variant: { control: "select", options: variants },
    size: {
      control: "select",
      options: [...sizes, "icon", "icon-xs", "icon-sm", "icon-lg"],
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap items-center gap-2">
      {variants.map((variant) => (
        <Button key={variant} {...args} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  ),
}

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-3">
      {(["default", "secondary"] as const).map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-2">
          {sizes.map((size) => (
            <Button key={size} {...args} variant={variant} size={size}>
              <PlusIcon data-icon="inline-start" aria-hidden="true" />
              {size}
            </Button>
          ))}
          <Button variant={variant} size="icon-xs" aria-label="Add">
            <PlusIcon aria-hidden="true" />
          </Button>
          <Button variant={variant} size="icon-sm" aria-label="Add">
            <PlusIcon aria-hidden="true" />
          </Button>
          <Button variant={variant} size="icon" aria-label="Add">
            <PlusIcon aria-hidden="true" />
          </Button>
          <Button variant={variant} size="icon-lg" aria-label="Add">
            <PlusIcon aria-hidden="true" />
          </Button>
        </div>
      ))}
    </div>
  ),
}

export const States: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Button loading>Deploying</Button>
      <Button variant="secondary" loading>
        Saving
      </Button>
      <Button disabled>Disabled</Button>
      <Button variant="destructive">
        <TrashIcon aria-hidden="true" />
        Delete
      </Button>
    </div>
  ),
}

// Each row takes the quiet variant. The solid one is kept for the final confirm.
export const RowActions: Story = {
  render: () => (
    <ul className="flex w-96 flex-col divide-y divide-v2-border rounded-lg border border-v2-border">
      {["MacBook Pro", "iPhone"].map((name) => (
        <li key={name} className="flex items-center justify-between gap-3 px-4 py-3">
          <span className="text-sm text-main">{name}</span>
          <Button variant="secondary-destructive" size="sm">
            Remove
          </Button>
        </li>
      ))}
      <li className="flex items-center justify-between gap-3 px-4 py-3">
        <span className="text-sm text-main">YubiKey</span>
        <span className="flex gap-2">
          <Button variant="secondary" size="sm">
            Cancel
          </Button>
          <Button variant="destructive" size="sm">
            Remove
          </Button>
        </span>
      </li>
    </ul>
  ),
}
