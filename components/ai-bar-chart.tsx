"use client"

import * as React from "react"
import { BarChart } from "@/components/ui/bar-chart"

type AiBarChartProps = {
  data: any[]
}

export function AiBarChart({ data }: AiBarChartProps) {
  const [config, setConfig] = React.useState<any>(null)
  const [dataKey, setDataKey] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (data && data.length > 0) {
      const firstItem = data[0]
      const keys = Object.keys(firstItem)
      const key = keys.find((k) => k !== "name")
      
      if (key) {
        setDataKey(key)
        setConfig({
          [key]: {
            label: key.charAt(0).toUpperCase() + key.slice(1),
            color: "hsl(var(--primary))",
          },
        })
      }
    }
  }, [data])

  if (!data || data.length === 0 || !config || !dataKey) {
    return (
      <div className="text-sm text-muted-foreground">
        Data chart tidak valid.
      </div>
    )
  }

  return (
    <div className="w-full h-64 mt-4">
      <BarChart
        data={data}
        config={config}
        className="w-full"
        withLegend={false}
      />
    </div>
  )
    }
