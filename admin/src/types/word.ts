// types/word.ts

export type WordResponse = {
  id: number;
  word: string;
  pronun: string;
  entype: string;
  vietype: string;
  voice: string;
  photo: string;
  meaning: string;
  endesc: string;
  viedesc: string;
  topicId: number;
  topicName: string;
  levelId: number;
};

export type WordCreateRequest = {
  word: string;
  pronun: string;
  entype: string;
  vietype: string;
  voice: string;
  photo: string;
  meaning: string;
  endesc: string;
  viedesc: string;
  topicId: number;
};

export type WordEditRequest = {
  id: number;
  word: string;
  pronun: string;
  entype: string;
  vietype: string;
  voice: string;
  photo: string;
  meaning: string;
  endesc: string;
  viedesc: string;
  topicId: number;
};
