import type { Meta, StoryObj } from "@storybook/react-vite"
import InfoIcon from "~icons/ph/info"
import LightbulbIcon from "~icons/ph/lightbulb"
import WarningIcon from "~icons/ph/warning"
import CubeIcon from "~icons/ph/cube"
import KeyIcon from "~icons/ph/key"
import PlusIcon from "~icons/ph/plus"
import { toast } from "sonner"

import { Alert, AlertDescription, AlertTitle } from "../src/components/alert"
import { Badge } from "../src/components/badge"
import { Banner, BannerDescription, BannerTitle } from "../src/components/banner"
import { Button } from "../src/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../src/components/empty"
import { Illustration, type IllustrationKind } from "../src/components/illustration"
import { Meter, MeterStack, meterPartTone } from "../src/components/meter"
import { SegmentedBar } from "../src/components/segmented-bar"
import { Skeleton } from "../src/components/skeleton"
import { Toaster } from "../src/components/sonner"
import { LoadingDots, Spinner } from "../src/components/spinner"

const meta = {
  title: "Components/Feedback",
  parameters: { controls: { disable: true } },
} satisfies Meta

export default meta
type Story = StoryObj<typeof meta>

export const Badges: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      {(
        [
          "default",
          "secondary",
          "outline",
          "ghost",
          "destructive",
          "ok",
          "progress",
          "warn",
          "fail",
          "idle",
          "link",
        ] as const
      ).map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
      <Badge size="sm">sm</Badge>
      <Badge size="lg" variant="ok">
        Running
      </Badge>
    </div>
  ),
}

export const Alerts: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      <Alert>
        <InfoIcon aria-hidden="true" />
        <AlertTitle>Default</AlertTitle>
        <AlertDescription>A neutral note about the page.</AlertDescription>
      </Alert>
      <Alert variant="info">
        <InfoIcon aria-hidden="true" />
        <AlertTitle>Info</AlertTitle>
        <AlertDescription>Your plan renews on the first of the month.</AlertDescription>
      </Alert>
      <Alert variant="warn">
        <WarningIcon aria-hidden="true" />
        <AlertTitle>Warn</AlertTitle>
        <AlertDescription>The volume is almost full.</AlertDescription>
      </Alert>
      <Alert variant="destructive">
        <WarningIcon aria-hidden="true" />
        <AlertTitle>Destructive</AlertTitle>
        <AlertDescription>The deployment failed.</AlertDescription>
      </Alert>
      <Alert variant="problem">
        <WarningIcon aria-hidden="true" />
        <AlertTitle>Problem</AlertTitle>
        <AlertDescription>The image could not be pulled: unauthorized.</AlertDescription>
      </Alert>
    </div>
  ),
}

export const Banners: Story = {
  render: () => (
    <div className="flex max-w-xl flex-col gap-3">
      <Banner>
        <InfoIcon aria-hidden="true" />
        <BannerTitle>Default</BannerTitle>
        <BannerDescription>A violet note for something new.</BannerDescription>
      </Banner>
      <Banner variant="tips">
        <LightbulbIcon aria-hidden="true" />
        <BannerDescription>Tips: press ⌘K to search.</BannerDescription>
      </Banner>
      <Banner variant="warn">
        <WarningIcon aria-hidden="true" />
        <BannerDescription>This will delete every volume.</BannerDescription>
      </Banner>
      <Banner variant="notice">
        <InfoIcon aria-hidden="true" />
        <BannerDescription>Maintenance on Sunday.</BannerDescription>
      </Banner>
    </div>
  ),
}

const kinds: IllustrationKind[] = [
  "empty",
  "no-results",
  "not-found",
  "error",
  "forbidden",
  "loading",
  "done",
]

export const Illustrations: Story = {
  render: () => (
    <div className="flex flex-wrap gap-6">
      {kinds.map((kind) => (
        <div key={kind} className="flex flex-col items-center gap-2">
          <Illustration kind={kind} />
          <span className="type-mono text-secondary">{kind}</span>
        </div>
      ))}
    </div>
  ),
}

export const EmptyStates: Story = {
  render: () => (
    <div className="grid max-w-3xl gap-4 md:grid-cols-2">
      <Empty variant="outline">
        <EmptyHeader>
          <EmptyMedia>
            <Illustration kind="empty" />
          </EmptyMedia>
          <EmptyTitle>No projects yet</EmptyTitle>
          <EmptyDescription>Create a project to deploy your first service.</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>Create project</Button>
        </EmptyContent>
      </Empty>
      <Empty variant="outline" size="sm">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CubeIcon aria-hidden="true" />
          </EmptyMedia>
          <EmptyTitle>No services</EmptyTitle>
          <EmptyDescription>Deploy from Git, an image or a template.</EmptyDescription>
        </EmptyHeader>
      </Empty>
      <Empty variant="outline" size="inline" className="md:col-span-2">
        <EmptyMedia variant="glyph">
          <KeyIcon aria-hidden="true" />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>No environment variables yet</EmptyTitle>
          <EmptyDescription>
            Variables pass settings, such as a database address, to the app when it starts.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            <PlusIcon aria-hidden="true" data-icon="inline-start" />
            Add variable
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  ),
}

export const Loading: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <Spinner />
        <LoadingDots size="md" />
        <LoadingDots size="lg" tone="brand" />
      </div>
      <div className="flex max-w-sm flex-col gap-2">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton variant="card" className="h-24" />
        <Skeleton delay="none" className="h-4 w-2/3" />
      </div>
    </div>
  ),
}

export const Meters: Story = {
  render: () => (
    <div className="flex max-w-sm flex-col gap-4">
      <Meter value={0.42} label="42% of the limit" />
      <Meter value={0.78} tone="warn" mark={0.5} />
      <Meter value={0.95} tone="over" />
      <Meter value={0.3} tone="muted" size="sm" />
      <Meter value={0.3} unbounded />
      <MeterStack parts={[5, 3, 2, 1]} />
      <div className="flex gap-3 type-meta">
        {["data", "logs", "cache", "tmp"].map((name, i) => (
          <span key={name} className="flex items-center gap-1.5">
            <span className={`size-2 rounded-full ${meterPartTone(i)}`} />
            {name}
          </span>
        ))}
      </div>
      <SegmentedBar value={0.35} label="CPU 35%" />
      <SegmentedBar value={0.75} />
      <SegmentedBar value={0.9} />
      <SegmentedBar
        value={0}
        segments={40}
        parts={[
          { value: 0.3, color: "var(--usage-normal)" },
          { value: 0.2, color: "var(--chart-1)" },
          { value: 0.1, color: "var(--usage-warning)" },
        ]}
      />
    </div>
  ),
}

export const Toasts: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Toaster theme="system" />
      <Button variant="secondary" onClick={() => toast.success("Copied to clipboard")}>
        Success
      </Button>
      <Button variant="secondary" onClick={() => toast.error("Could not deploy")}>
        Error
      </Button>
      <Button variant="secondary" onClick={() => toast.warning("Almost out of credit")}>
        Warning
      </Button>
      <Button variant="secondary" onClick={() => toast.info("A new version is out")}>
        Info
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast.promise(new Promise((done) => setTimeout(done, 2000)), {
            loading: "Deploying…",
            success: "Deployed",
          })
        }
      >
        Loading
      </Button>
    </div>
  ),
}
