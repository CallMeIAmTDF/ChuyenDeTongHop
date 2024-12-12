import { PvpRankingReportResponse, TopUser, WeeklyAnswerByLevelResponse, WeeklyAnswerRateResponse } from "@/types/statistics";
import http from "@/utils/api";

const statisticsApiRequest = {
  sGetWeeklyAnswerByLevel: () =>
    http.get<IBackendRes<WeeklyAnswerByLevelResponse[]>>(`statistics/weeklyAnswerByLevel`),

  sGetWeeklyAnswerRate: () =>
    http.get<IBackendRes<WeeklyAnswerRateResponse>>(`statistics/weeklyAnswerRate`),


  sGetWeeklyPVPLeaderboard: () =>
    http.get<IBackendRes<TopUser[]>>(`statistics/weeklyPVPLeaderboard`),

  sGetPvpRankingReport: () =>
    http.get<IBackendRes<PvpRankingReportResponse[]>>(`statistics/pvpRankingReport`),

  sDownloadReport: (fileName: string) =>
    http.get(`statistics/downloadReport/${fileName}`),

};

export default statisticsApiRequest;
