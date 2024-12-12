import statisticsApiRequest from "@/apiRequests/statistics";
import {
  keepPreviousData,
  useQuery,
} from "@tanstack/react-query";

export const useGetWeeklyAnswerByLevelQuery = () => {
  return useQuery({
    queryKey: ["statistics", "weeklyAnswerByLevel"],
    queryFn: () => statisticsApiRequest.sGetWeeklyAnswerByLevel(),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
};


export const useGetWeeklyAnswerRateQuery = () => {
  return useQuery({
    queryKey: ["statistics", "weeklyAnswerRate"],
    queryFn: () => statisticsApiRequest.sGetWeeklyAnswerRate(),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
};

export const useGetWeeklyPVPLeaderboardQuery = () => {
  return useQuery({
    queryKey: ["statistics", "weeklyPVPLeaderboard"],
    queryFn: () => statisticsApiRequest.sGetWeeklyPVPLeaderboard(),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
};

export const useGetPvpRankingReportQuery = () => {
  return useQuery({
    queryKey: ["statistics", "pvpRankingReport"],
    queryFn: () => statisticsApiRequest.sGetPvpRankingReport(),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000,
  });
};