"use client";

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"
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

import { useGetWeeklyAnswerByLevelQuery } from "@/queries/useStatistics";

const chartConfig = {
  totalAnswers: {
    label: "Total Answers",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function AnswerByLevelChart() {
  let chartData: any[]  = [];

  const { data } = useGetWeeklyAnswerByLevelQuery();

  if (data?.payload.data) {
    data?.payload.data.map(level => {
      const levelName = level.level_name.match(/\[(.*?)\]/)
      chartData.push({ name: levelName?.[1] ?? "", number: level.total_answers })
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chart of the number of answers for each level</CardTitle>
        <CardDescription>This week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              left: -20,
            }}
          >
            <XAxis type="number" dataKey="number" hide />
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="number" fill="var(--color-totalAnswers)" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this name <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 names
        </div>
      </CardFooter>
    </Card>
  )
}
