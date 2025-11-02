"use client"

import * as React from "react"
import {
  Bar,
  BarChart as BarChartPrimitive,
  CartesianGrid,
  LabelList,
  Legend,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const BarChart = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof BarChartPrimitive> & {
    config: ChartConfig
    data: any[]
    layout?: "horizontal" | "vertical"
    withActive?: boolean
    withLegend?: boolean
    withTooltip?: boolean
    withXAxis?: boolean
    withYAxis?: boolean
    withGrid?: boolean
  }
>(
  (
    {
      data,
      config,
      className,
      layout = "vertical",
      withActive = true,
      withLegend = true,
      withTooltip = true,
      withXAxis = true,
      withYAxis = true,
      withGrid = true,
      ...props
    },
    ref
  ) => {
    const [activeChart, setActiveChart] = React.useState<string>()

    const dataKeys = React.useMemo(() => {
      const allKeys = data.reduce((acc, curr) => {
        return new Set([...acc, ...Object.keys(curr)])
      }, new Set<string>())

      return Array.from(allKeys).filter(
        (key) => key !== "name" && config[key]
      ) as string[]
    }, [data, config])

    return (
      <ChartContainer
        ref={ref}
        config={config}
        className={cn("h-full w-full", className)}
        onMouseLeave={() => setActiveChart(undefined)}
        {...props}
      >
        <ChartStyle id={props.id ?? "chart"} config={config} />
        <BarChartPrimitive
          data={data}
          layout={layout}
          {...(layout === "vertical"
            ? {
                barGap: "2px",
                barCategoryGap: "16px",
              }
            : {
                barGap: 4,
                barSize: 10,
              })}
          {...props}
        >
          {withGrid && (
            <CartesianGrid
              vertical={layout === "vertical"}
              horizontal={layout === "horizontal"}
            />
          )}
          {withYAxis && (
            <YAxis
              dataKey={layout === "vertical" ? undefined : "name"}
              type={layout === "vertical" ? "number" : "category"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
          )}
          {withXAxis && (
            <XAxis
              dataKey={layout === "vertical" ? "name" : undefined}
              type={layout === "vertical" ? "category" : "number"}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
          )}
          {withTooltip && (
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  {...(layout === "vertical"
                    ? {
                        labelKey: "name",
                      }
                    : {
                        labelKey: "name",
                      })}
                />
              }
            />
          )}
          {withLegend && (
            <ChartLegend
              content={<ChartLegendContent />}
              onMouseEnter={(props) => {
                setActiveChart(props.dataKey)
              }}
              onMouseLeave={() => {
                setActiveChart(undefined)
              }}
            />
          )}
          {dataKeys.map((key) => {
            const chartConfig = config[key]

            return (
              <Bar
                key={key}
                dataKey={key}
                name={chartConfig.label}
                fill={chartConfig.color}
                activeBar={
                  withActive ? (
                    <Rectangle
                      fillOpacity={activeChart === key ? 1 : 0.6}
                      radius={layout === "vertical" ? [4, 4, 0, 0] : [0, 4, 4, 0]}
                    />
                  ) : undefined
                }
              >
                {!!chartConfig.labelList && (
                  <LabelList
                    dataKey={key}
                    position={
                      layout === "vertical"
                        ? chartConfig.labelList.position ?? "top"
                        : "right"
                    }
                    offset={chartConfig.labelList.offset ?? 4}
                    className="fill-foreground text-sm"
                  />
                )}
              </Bar>
            )
          })}
        </BarChartPrimitive>
      </ChartContainer>
    )
  }
)
BarChart.displayName = "BarChart"

export { BarChart }
