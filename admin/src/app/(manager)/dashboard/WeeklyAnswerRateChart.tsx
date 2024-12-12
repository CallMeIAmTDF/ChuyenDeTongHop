"use client";

import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetWeeklyAnswerRateQuery } from "@/queries/useStatistics";

const chartConfig = {
  incorrect: {
    label: "Incorrect",
    color: "hsl(var(--chart-1))",
  },
  correct: {
    label: "Correct",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function WeeklyAnswerRateChart() {
  let chartData: any[] | undefined = undefined;
  let totalVisitors = 0;

  const { data } = useGetWeeklyAnswerRateQuery();

  if (data?.payload.data) {
    chartData = [
      {
        correct: data?.payload.data.correct,
        incorrect: data?.payload.data.incorrect,
      },
    ];

    totalVisitors = data?.payload.data.correct + data?.payload.data.incorrect;
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Chart of correct and incorrect answers</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Number Answers
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="correct"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-correct)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="incorrect"
              fill="var(--color-incorrect)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this week <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total number answers for this week
        </div>
      </CardFooter>
    </Card>
  );
}
