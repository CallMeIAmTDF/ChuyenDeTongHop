"use client";


import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetWeeklyPVPLeaderboardQuery } from "@/queries/useStatistics";


export function WeeklyPVPLeaderChart() {
  const { data } = useGetWeeklyPVPLeaderboardQuery();

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Ranking of users with the highest scores</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        {data?.payload.data && (
          <ScrollArea className="h-[300px] w-full rounded-md border">
            <div className="p-4">
              <div className="flex justify-between items-center p-2 text-base font-medium">
                <div className="w-[30px]"></div>
                <div className=" flex-1 ml-2">Name</div>
                <span className="ml-6">Point</span>
              </div>
              {data.payload.data.map((tag, index) => (
                <div className="flex justify-between items-center p-2">
                  <div className="w-[30px]">{index + 1}</div>
                  <div key={tag.name} className="text-base flex-1 ml-4">
                    {tag.name}
                  </div>
                  <span className="text-red-500 text-base font-bold">
                    {tag.point}
                  </span>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
