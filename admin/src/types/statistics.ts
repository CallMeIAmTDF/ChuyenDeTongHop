// types/level.ts

export type WeeklyAnswerByLevelResponse = {
  level_name: string;
  total_answers: number;
};

export type PvpRankingReportResponse = {
  fileName: string;
  lastModified: string;
  fileSize: number;
};

export type TopUser = {
  name: string;
  image: string;
  point: number;
};

export type WeeklyAnswerRateResponse = {
  correct: number;
  incorrect: number;
};