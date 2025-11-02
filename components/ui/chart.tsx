"use client"

import * as React from "react"
import {
  Label,
  Pie,
  PieChart as PieChartPrimitive,
  Sector,
  Cell,
  Bar,
  BarChart as BarChartPrimitive,
  Area,
  AreaChart as AreaChartPrimitive,
  Line,
  LineChart as LineChartPrimitive,
  Treemap as TreemapPrimitive,
  RadialBar,
  RadialBarChart as RadialBarChartPrimitive,
  Scatter,
  ScatterChart as ScatterChartPrimitive,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts"

import { cn } from "@/lib/utils"

export type ChartConfig = Record<
  string,
  {
    label: React.ReactNode
    color: string
    icon?: React.ComponentType
    labelList?: {
      position?: "top" | "bottom" | "left" | "right" | "center"
      offset?: number
    }
  }
>

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div"> & {
    config: ChartConfig
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>
  }
>(({ id, className, children, config, ...props }, ref) => {
  const chartId = React.useId()
  const [activeChart, setActiveChart] = React.useState<string>()
  const Component = children.type

  return (
    <div
      data-chart={Component.displayName}
      ref={ref}
      id={id ?? chartId}
      className={cn(
        "aspect-video w-full [&_.recharts-cartesian-grid-vertical_line]:stroke-border/50 [&_.recharts-cartesian-grid_line]:stroke-border/50 [&_.recharts-label_text]:fill-foreground [&_.recharts-legend-item_text]:fill-foreground [&_.recharts-polar-grid_line]:stroke-border/50 [&_.recharts-radial-bar-background_sector]:fill-muted [&_.recharts-rectangle]:fill-foreground [&_.recharts-reference-line_line]:stroke-border [&_.recharts-sector_path]:stroke-border/50 [&_.recharts-surface]:overflow-visible [&_.recharts-text]:fill-foreground [&_.recharts-tooltip-cursor]:fill-muted/50 [&_.recharts-tooltip-wrapper]:z-50 [&_.recharts-wrapper]:outline-none",
        className
      )}
      {...props}
    >
      <ResponsiveContainer width="100%" height="100%">
        {React.cloneElement(children, {
          ...children.props,
          config,
          onMouseLeave: (e: any) => {
            setActiveChart(undefined)
            children.props?.onMouseLeave?.(e)
          },
        })}
      </ResponsiveContainer>
    </div>
  )
})
ChartContainer.displayName = "Chart"

const ChartTooltip = Tooltip

const ChartTooltipContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Tooltip>["content"]
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "z-50 overflow-hidden rounded-lg border bg-background px-3 py-1.5 text-sm shadow-xl animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = Legend

const ChartLegendContent = React.forwardRef<
  HTMLTableElement,
  React.ComponentProps<"table">
>(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full text-sm [&_td]:py-0.5", className)}
    {...props}
  />
))
ChartLegendContent.displayName = "ChartLegendContent"

const ChartStyle = ({
  id,
  config,
}: {
  id: string
  config: ChartConfig
}) => {
  const [isMounted, setIsMounted] = React.useState(false)

  React.useLayoutEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: `
[data-chart] {
  --chart-primary: var(--color-primary);
  --chart-secondary: var(--color-secondary);
}

${Object.entries(config)
  .map(
    ([key, chartConfig]) => `
[data-chart="${key}"] {
  ${Object.entries(chartConfig.theme)
    .map(
      ([prefix, colorConfig]) => `
    --color-${prefix}: ${colorConfig.hsl};
  `
    )
    .join("\n")}
}
`
  )
  .join("\n")}
    `,
      }}
    />
  )
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  Label,
  Pie,
  PieChartPrimitive,
  Sector,
  Cell,
  Bar,
  BarChartPrimitive,
  Area,
  AreaChartPrimitive,
  Line,
  LineChartPrimitive,
  TreemapPrimitive,
  RadialBar,
  RadialBarChartPrimitive,
  Scatter,
  ScatterChartPrimitive,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  }
