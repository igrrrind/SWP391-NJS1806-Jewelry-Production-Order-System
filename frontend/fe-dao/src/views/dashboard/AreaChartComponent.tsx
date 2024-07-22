"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import React from "react"

const chartConfig: ChartConfig = {
  total: {
    label: "Total",
    color: "hsl(var(--chart-2))",
  }
}

// Utility function to convert month number to month name
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const convertMonthNumberToName = (month: number) => {
  return monthNames[month - 1];
};


const formatYAxisValue = (value: number) => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`; // e.g., 1.2M
  } else {
    return ""
  }
};

interface DataPoint {
  month: number;
  total: number;
}

interface AreaChartComponentProps {
  data: DataPoint[];
}

export function AreaChartComponent({ data }: AreaChartComponentProps) {
  // Convert month numbers to month names
  const chartData = data.map(item => ({
    ...item,
    month: convertMonthNumberToName(item.month),
  }));

  return (
    <div className="w-full h-[400px]">
      <div className="w-full h-full">
      <ChartContainer config={chartConfig} style={{ width: '100%', height: '100%' }}>
        <AreaChart
          data={chartData}
          margin={{
            left: 12,
            right: 12,
            top: 20,
            bottom: 20
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)} // Show abbreviated month names
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={formatYAxisValue}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
            labelClassName="w-40"
          />
          <Area

            dataKey="total"
            type="step"
            fill="var(--color-total)"
            fillOpacity={0.4}
            stroke="var(--color-total)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
      </div>
    </div>
  )
}


