import { AnswerByLevelChart } from "@/app/(manager)/dashboard/AnswerByLevelChart";
import { Report } from "@/app/(manager)/dashboard/Report";
import { WeeklyAnswerRateChart } from "@/app/(manager)/dashboard/WeeklyAnswerRateChart";
import { WeeklyPVPLeaderChart } from "@/app/(manager)/dashboard/WeeklyPVPLeaderChart";

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex gap-x-4">
        <div className="w-[500px]">
          <AnswerByLevelChart />
        </div>
        <div className="flex-1 h-full">
          <WeeklyPVPLeaderChart />
        </div>
      </div>
      <div className="flex gap-x-4">
        <div className="w-[500px]">
          <WeeklyAnswerRateChart />
        </div>
        <div className="flex-1 h-[350px] ">
          <Report />
        </div>
      </div>
    </div>
  );
}
