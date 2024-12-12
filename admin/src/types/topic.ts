// types/topic.ts

export type TopicResponse = {
  id: number;
  name: string;
  levelId: number;
  levelName: string;
  numWords: number;
};

export type TopicCreateRequest = {
  name: string;
  levelId: number;
};

export type TopicEditRequest = {
  id: number;
  name: string;
  levelId: number;
};
